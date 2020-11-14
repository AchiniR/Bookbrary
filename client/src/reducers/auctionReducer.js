import { GET_AUCTION,GET_AUCTIONS, DELETE_AUCTION, AUCTION_LOADING, UPDATE_AUCTION, GET_FIRST } from '../actions/types';
  
  const initialState = {
    auctions: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_AUCTION:
        return {
          ...state,
          auctions: action.payload,
          loading: false
        };
        case GET_AUCTIONS:
        return {
          ...state,
          auctions: action.payload,
          loading: false
        };
        case GET_FIRST:
        return {
          ...state,
          auctions: action.payload,
          loading: false
        };
      case DELETE_AUCTION:
        return {
          ...state,
          auctions: state.auctions.filter(auction => auction._id !== action.payload)
        };
        case UPDATE_AUCTION:
        return {
          ...state,
          auctions: action.payload,
          loading: false
        };
      case AUCTION_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  