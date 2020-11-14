import { GET_SHOP, ADD_SHOP, DELETE_SHOP, SHOP_LOADING, UPDATE_SHOP } from '../actions/types';
  
  const initialState = {
    shop: null,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_SHOP:
        return {
          ...state,
          shop: action.payload,
          loading: false
        };
      case DELETE_SHOP:
        return {
          ...state,
          shop: null,
          loading: false
        };
      case ADD_SHOP:
        return {
          ...state,
          shop: action.payload,
          loading: false
        };
        case UPDATE_SHOP:
        return {
          ...state,
          shop: action.payload,
          loading: false
        };
      case SHOP_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  