const express=require("express")
const Post =require("../models/post")
const LoginReq = require("../middleware/loginReq")
const router=express.Router()

router.post('/createPost', LoginReq, (req, res)=>{
      const { title, body, pic } = req.body;

      if(!title || !body || !pic){
         return res.status(422).json({
            errorMsg: "Please fill all the details",
        });
      }
      const post = new Post({
        title,
        body,
        photos: pic,
        postedBy: req.user,
        userName: req.user.name,
        pic: req.user.pic,
      })
     post.save()
        .then(()=>{
              res.status(201).json({
            msg: "posted created successfully!!",
        });
    })
              
        
});

router.get('/allpost', LoginReq,(req,res)=>{
  Post.find().then((posts)=>{
    return res.status(200).json({posts});
  });
});

router.get('/mypost',LoginReq,(req,res)=>{
Post.find({postedBy:req.user._id}).then((posts)=>{
  return res.status(200).json({posts})
})
});

router.put("/like", LoginReq, (req, res) => {
  const { postId } = req.body;
  const userId = req.user._id;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const hasLiked = post.likes.includes(userId);
      const updateQuery = hasLiked
        ? { $pull: { likes: userId } }        // Unlike
        : { $addToSet: { likes: userId } };  // Like (avoiding duplicates)

      Post.findByIdAndUpdate(postId, updateQuery, { new: true })
        .then((updatedPost) => {
          res.json({
            message: hasLiked ? "Post unliked" : "Post liked",
            data: updatedPost,
          });
        })
        .catch((err) => {
          console.error(err.message);
          res.status(500).json({ error: "Error updating like status" });
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ error: "Error fetching post" });
    });
});

router.put('/comment',LoginReq,(req,res)=>{
  const postComment ={
    text: req.body.text,
    postedBy: req.user._id,
    userName: req.user.name,
    pic: req.user.pic,
   
  };
   Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comment: postComment },
    },
    {
      new: true,
    }
  ).then((comment) => {
    // console.log(comment);
    return  res.json({comment})

  });
});

router.delete("/deletepost/:postId",LoginReq,  (req, res)=>{

  // console.log('ID received:', req.params.id);
    Post.findOne({_id: req.params.postId})
     .then((post)=>{
        // console.log(post)
        if(post.postedBy._id.toString() === req.user._id.toString()){
          post.deleteOne()
            .then(()=> {
              return res.status(200).json({post})
            })
            .catch(err=> console.log(err))
        }
      })
});





module.exports = router