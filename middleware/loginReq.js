const express = require("express")
const jwt = require("jsonwebtoken");
const { SECRETKEY } = require("../key");
const User = require('../models/auth')

module.exports=(req,res,next)=>{

const {authorization} = req.headers;

  if(!authorization){
    return res.status(401).json({
      errormessage: "pehle login karo!!"
    });
  }

const  token = authorization.replace("Bearer ","")     
// console.log(token);
       
    jwt.verify(token,SECRETKEY,(err, paylode) => {
        if(err){
            return res.status(401).json({msg:"Invalid token pls login again"});
        }
            const {id} = paylode
        //  console.log(id);       
         
        User.findById(id)
        .then(savedUser=>{
            // console.log("middeware",savedUser);
            savedUser.password=undefined
            req.user = savedUser
            next();
        })
    }
)  
}