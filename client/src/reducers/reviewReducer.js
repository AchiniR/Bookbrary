import { GET_REVIEWS, GET_REVIEW, ADD_REVIEW, DELETE_REVIEW, REVIEW_LOADING } from '../actions/types';
  
  const initialState = {
    review: null,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_REVIEWS:
        return {
          ...state,
          review: action.payload,
          loading: false
        };
        case GET_REVIEW:
        return {
          ...state,
          review: action.payload,
          loading: false
        };
      case DELETE_REVIEW:
        return {
          ...state,
          review: null,
          loading: false
        };
      case ADD_REVIEW:
        return {
          ...state,
          review: action.payload,
          loading: false
        };
      case REVIEW_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  