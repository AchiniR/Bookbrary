import {
    GET_ITEM,
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING,
    EDIT_ITEM,
    SEARCH_ITEMS,
    NEW_ITEMS,
    CHEAP_ITEMS
  } from '../actions/types';
  
  const initialState = {
    items: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_ITEM:
        return {
          ...state,
          items: action.payload,
          loading: false
        };
      case GET_ITEMS:
        return {
          ...state,
          items: action.payload,
          loading: false
        };
        case SEARCH_ITEMS:
        return {
          ...state,
          items: action.payload,
          loading: false
        };
        case NEW_ITEMS:
        return {
          ...state,
          items: action.payload,
          loading: false
        };
        case CHEAP_ITEMS:
        return {
          ...state,
          items: action.payload,
          loading: false
        };
      case DELETE_ITEM:
        return {
          ...state,
          items: state.items.filter(item => item._id !== action.payload)
        };
      case ADD_ITEM:
        return {
          ...state,
          items: [action.payload, ...state.items]
        };
        case EDIT_ITEM:
          return {
            ...state,
            shop: action.payload,
            loading: false
          }; 
      case ITEMS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  