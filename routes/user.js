const express = require('express');
const router = express.Router();
const {setuser,getuser} = require("../service/auth")


const user = require("../models/user")

router.get('/signin',(req,res)=>{
  res.render('signin')
})
router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.post('/signin',async (req,res)=>{
   try{

       const {email,password} = req.body;
       const token = await user.matchpasswordandgeneratetoken(email,password)
      
       
       return res.cookie("token",token).redirect("/");
   }catch(error){
        return res.render("signin",{
            error:"INCORECT Email or Password",
        });
   }
    
})
router.post('/signup',async (req,res)=>{
  
     const {fullname,email,password} = req.body;
     console.log(req.body)
     
     try {
        await user.create({
            fullname: fullname,
            email: email,
            password: password,
        });
        return res.redirect("/");
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send("An error occurred during signup. Please try again.");
    }
     return res.redirect("/")
      
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('home')
})





module.exports=router