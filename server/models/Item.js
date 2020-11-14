const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for Book ad
const ItemSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    bookName: { 
        type: String, 
        required: 
        true 
    },

    price: { 
        type: Number
    },

    ISBN:{ type: String, required: true },

    author: { type: String, required: true },

    condition: { type: String, required: true, enum: ['New','Good', 'Acceptable'] },

    description: { type: String },

    category: { 
        type: String, 
        required: true 
    },

    image: { type: String},

    sellerName:{ 
        type: String,
        required: false
    },
    phoneNumber:{ 
        type: String,
        required: true
    },
    district:{ 
        type: String,
        required: true
    },
    favs: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
        }
      ],
    
    date: { type: Date, default: Date.now }

});

module.exports = Item = mongoose.model('items', ItemSchema);