const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title:{ 
        type: String,
        required: true
    },
    description:{ 
        type: String,
        required: true
    },
    opening_Hours:{ 
        type: String,
        required: true
    },
    address:{ 
        type: String,
        required: true
    },
    phone:{ 
        type: String,
        required: true
    },
    email:{ 
        type: String,
    },
    backCoverIm:{ 
        type: String
    },
    profilePic:{ 
        type: String
    }

});

module.exports = Shop = mongoose.model('shop', ShopSchema)