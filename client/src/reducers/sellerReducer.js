import {
    GET_SELLER, ADD_SELLER, DELETE_SELLER, SELLERS_LOADING
  } from '../actions/types';
  
  const initialState = {
    seller: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_SELLER:
        return {
          ...state,
          seller: action.payload,
          loading: false
        };
      case DELETE_SELLER:
        return {
          ...state,
          seller: state.seller.filter(seller => seller._id !== action.payload)
        };
      case ADD_SELLER:
        return {
          ...state,
          seller: [action.payload, ...state.seller]
        };
      case SELLERS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  