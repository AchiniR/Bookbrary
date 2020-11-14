import { GET_CHAT,GET_CHATS,  ADD_CHAT, DELETE_CHAT, CHAT_LOADING, UPDATE_CHAT } from '../actions/types';
  
  const initialState = {
    chats: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_CHAT:
        return {
          ...state,
          chats: action.payload,
          loading: false
        };
        case GET_CHATS:
        return {
          ...state,
          chats: action.payload,
          loading: false
        };
      case DELETE_CHAT:
        return {
          ...state,
          chats: state.chats.filter(chat => chat._id !== action.payload)
        };
      case ADD_CHAT:
        return {
          ...state,
          chats: [action.payload, ...state.chat],
          loading: false
        };
        case UPDATE_CHAT:
        return {
          ...state,
          chats: action.payload,
          loading: false
        };
      case CHAT_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  