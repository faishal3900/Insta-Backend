const express=require("express")
const Post =require("../models/post")
const LoginReq = require("../middleware/LoginReq")
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
        photo: pic,
        postedBy: req.user,
      })
     post.save()
        .then(()=>{
              res.status(201).json({
            msg: "posted created successfully!!",
        });
    })
              
        
});



module.exports = router