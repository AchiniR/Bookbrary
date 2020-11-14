import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer'
import itemReducer from './itemReducer';
import sellerReducer from './sellerReducer';
import postReducer from './postReducer';
import profileReducer from './profileReducer';
import shopReducer from './shopReducer';
import chatReducer from './chatReducer';
import reviewReducer from './reviewReducer';
import auctionReducer from './auctionReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  item: itemReducer,
  seller: sellerReducer,
  post: postReducer,
  profile: profileReducer,
  shop: shopReducer,
  chat: chatReducer,
  review: reviewReducer,
  auction: auctionReducer
});
