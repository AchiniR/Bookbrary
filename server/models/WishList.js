const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishListSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    
    posts:{ 
        type: Schema.Types.ObjectId,
        ref: 'items',
        required: true
    }
});

module.exports = WishList = mongoose.model('wishList', WishListSchema);