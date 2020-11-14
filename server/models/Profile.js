const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for Book ad
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    profilePic: { type: String, required: true },

    gender:{ 
        type: String,
        required: true,
        enum: ['Male','Female']
    },

    phoneNumber:{ 
        type: String,
        required: true
    },

    district:{ 
        type: String,
        required: true
    },
    

    date: { type: Date, default: Date.now }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);