const express=require('express')
const router = require('express').Router();
const jwt =require("jsonwebtoken");
router.use(express.json());
router.use(express.urlencoded({extended:true}));


mongoose = require('mongoose')





const UserDATA = require('../model/user')
//login api
router.get('/userlist/',async(req,res)=>{
    let data = await UserDATA.find()
    try {
      
            res.json(data)
        
        
    } catch (error) {
        res.send(error.message)
    }
})
router.post("/login",async (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    console.log('password+++++++++')
    console.log(password)
    console.log(email)
    const user = await UserDATA.findOne({email:email});
    console.log(user)
    if(!user){
        res.json({message:"user not found"})
    }
    try {
        if(user.password ==password){
            jwt.sign({email:email,id:user._id},"ict",{expiresIn:'1d'},(error,token)=>{
                if (error) {
                    res.json({message:"Token not generated"})
                } else {
                    res.json({message:"Login Success",token:token,data:user})
                }
            })
            
        }
        else {
            res.json({message:"Login Failed"})
        }
    }
    catch (error){
        console.log(error)
        
    }
})


router.post('/user',async(req,res)=>{
    try {
        console.log(req.body)
        let item = req.body;
        console.log(req.body.email)
        let email=req.body.email
        if ( UserDATA.findOne({email:email})) {
            res.json({message:"User Already exists,Please try with other email Id"})
        } else {
            console.log('saved')
            const user = await UserDATA(item);
        user.save()  
        res.json({message:"Registered Succesfully"})
        }
        
    } catch (error) {
        console.log(error)
        res.json('error')
    }
})


module.exports = router