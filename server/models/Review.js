const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    name:{ 
        type: String,
        required: true
    },
    
    item:{ 
        type: Schema.Types.ObjectId,
        ref: 'items',
        required: true
    },

    text:{ 
        type: String,
        required: true
    },

    ratings:{ 
        type: Number,
        required: true
    },

    date: { type: Date, default: Date.now }
});

module.exports = Review = mongoose.model('review', ReviewSchema);