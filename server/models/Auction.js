const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AuctionSchema = new Schema({
    user: {
      type: String,
      required: true
    },

    item: {
      type: Schema.Types.ObjectId,
      ref: 'item'
    },
    
    value: {
      type: Number,
    },
    
    status: {
      type: String,
      required: true
    },

    maxValue: {
      type: Number,
    },

    date: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = Auction = mongoose.model('auction', AuctionSchema);