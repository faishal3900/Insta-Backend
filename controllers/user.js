const express=require("express")
const User = require("../models/auth")
const Post= require("../models/post")
const LoginReq = require("../middleware/loginReq")
const router=express.Router()


router.get('/alluser', LoginReq,(req,res)=>{
  User.find().then((user)=>{
    return res.status(200).json({user});
    
  });
});


router.get('/profile/:id', (req, res) => {
  let userData;  // User ko store karne ke liye variable  
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      userData = user;  // User data store karo
      return Post.find({ postedBy: req.params.id });  // Next .then() ko pass karo
    })
    .then((posts) => {
      res.json({
        user: userData,  // Dono data bhejo
        posts: posts
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
});

router.put('/follow', LoginReq, (req, res) => {
   
  if (req.user._id.toString() === req.body.followId) {
    return res.status(400).json({ error: "You cannot follow or unfollow yourself." });
  }

  User.findById(req.user._id)
    .then(data => {
      const isFollowing = data.following.includes(req.body.followId);
      
      const updateTargetUser = isFollowing 
        ? { $pull: { followers: req.user._id } } 
        : { $addToSet: { followers: req.user._id } };
      
      const updateCurrentUser = isFollowing 
        ? { $pull: { following: req.body.followId } } 
        : { $addToSet: { following: req.body.followId } };

      return User.findByIdAndUpdate(
        req.body.followId,
        updateTargetUser,
        { new: true }
      ).then(() => {
      
        return User.findByIdAndUpdate(
          req.user._id,
          updateCurrentUser,
          { new: true }
        );
      });
    })
    .then(updatedUser => res.json(updatedUser))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});



module.exports = router