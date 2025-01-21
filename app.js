require("dotenv").config();

const express = require("express")
const path = require("path")
const app = express()
const port = process.env.port|| 8000;
const cookieparser = require("cookie-parser")
app.use(cookieparser())
app.use(express.urlencoded({ extended: false }));
const mongoose = require('mongoose')

app.use(express.static(path.resolve('./public')))

const blog = require("./models/blog")

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("mongodb connected"))

app.set("view engine",'ejs')
app.set('views',path.resolve('./views'))

const blogrouter = require('./routes/blog'); 

app.use(express.urlencoded({ extended: false }));
const {restrict}= require("./middleware/auth")

app.get('/',restrict,async(req,res)=>{
      const allblogs = await blog.find({});
     res.render("home",{
          blogs:allblogs,
          user:req.user,
     });
})
app.get('/logout',(req,res)=>{
   return res.clearCookie('token').redirect('/user/signin');
})

// app.use(restrict);

app.use('/blog',restrict,blogrouter);

const userrouter = require('./routes/user');

app.use('/user',userrouter);


app.listen(port,()=>console.log("server started"))