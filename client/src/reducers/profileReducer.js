import {
    EDIT_PROFILE,
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    CREATE_PROFILE
  } from '../actions/types';
  
  const initialState = {
    profile: null,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case PROFILE_LOADING:
        return {
          ...state,
          loading: true
        };
      case EDIT_PROFILE:
        return {
          ...state,
          profile: [action.payload, ...state.profile]
        };
      case GET_PROFILE:
        return {
          ...state,
          profile: action.payload,
          loading: false
        };
      case CLEAR_CURRENT_PROFILE:
        return {
          ...state,
          profile: null
        };
        case CREATE_PROFILE:
        return {
          ...state,
          profile: action.payload, 
          loading: false
        };
      default:
        return state;
    }
  }
  