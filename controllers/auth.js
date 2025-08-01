const express = require("express")
const router = express.Router()
const User = require("../models/auth")
const bcrypt = require("bcrypt")
const { SECRETKEY } = require("../key")
const jwt = require("jsonwebtoken")


router.post("/singup", (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(422).json({ msg: "please add all the fields" })
    } else {
        User.findOne({ email: email })
            .then(savedUser => {
                if (savedUser) {
                    return res.status(422).json({ mgs: "User already existt" })
                } else {
                    bcrypt.hash(password, 12)
                        .then(hashedPassword => {
                            // console.log(hashedPassword);
                            const Usernew = new User({
                                name,
                                email,
                                password: hashedPassword
                            })
                            Usernew.save()
                            res.status(200).json({ msg: "User add successfully" })
                        })
                }

            })
    }


})


router.post("/singin", (req,res)=>{
    const {email, password}=req.body
    
    if(!email||!password){
        res.status(422).json({msg:"pls fil all details"})
    }
    User.findOne({email:email})
    .then(dbUser=>{
        // console.log(dbUser);
        if(!dbUser){
            res.status(422).json({msg:"user not exist for this detail"})
        }
        bcrypt.compare(password,dbUser.password)
        .then(()=>{
            const token= jwt.sign({id:dbUser._id}, SECRETKEY )
            
            res.status(201).json({msg:"login successfully",token,dbUser })
        });
    });

});

module.exports = router