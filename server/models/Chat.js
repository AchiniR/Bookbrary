const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ChatSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    itemOwner:{
      type: Schema.Types.ObjectId,
        ref: 'users'
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: 'item'
    },
    message: {
      type: String,
      required: true
    },
    
    date: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = Chat = mongoose.model('chat', ChatSchema);