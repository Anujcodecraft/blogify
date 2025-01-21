const mongoose = require('mongoose');

const commentschema = new mongoose.Schema({

  content:{
    type:"string",
    required:true,
  },
  blogId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"blog",
  },
  createdby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }

});

const comment = mongoose.model('comment',commentschema);

module.exports = comment;