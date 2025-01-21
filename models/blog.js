const mongoose = require('mongoose');

const blogschema = new mongoose.Schema({

    title:{
        type:"string",
        required:"true",
    },
    body:{
        type:"string",
        required:"true",
    },
   coverimageurl:{
    type:"string",
    required:"false",
   },
   createdby:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
   },

});

const blog = mongoose.model('blog',blogschema);

module.exports = blog;
