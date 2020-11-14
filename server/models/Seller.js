const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    
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
    location:{ 
        type: String,
        required: true
    }
});

module.exports = Seller = mongoose.model('seller', SellerSchema)