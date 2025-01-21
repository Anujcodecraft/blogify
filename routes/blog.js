const express = require('express');
const router = express.Router();
const path =require('path')
const multer = require("multer")

const blog = require("../models/blog")
const comments = require("../models/comments")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`
      cb(null,filename)
    }
  })
  
  const upload = multer({ storage: storage })
router.get('/add-new',(req,res)=>{
    return res.render('addblog',{
        user:req.user,
    })
})
router.post('/',upload.single('coverimage'),async (req,res)=>{
      const {title,body}=req.body
   const blogg = await blog.create({
        body,
        title,
        createdby: req.user._id,
        coverimageurl:`/uploads/${req.file.filename}`

    })
   
    return res.redirect(`/blog/${blogg._id}`);
})

const user = require("../models/user")
router.get("/:id",async (req,res)=>{
  const users = await user.findById(req.params.id);
  const blogs = await blog.findById(req.params.id);
  // console.log(blogs)
  return res.render("blogs",{
    user:req.user,
    blogs,
  })
})





module.exports=router;