import axios from 'axios';
import { GET_CHAT, GET_CHATS, DELETE_CHAT, CHAT_LOADING, GET_ERRORS } from './types';

  // Get all chats
export const getUserChats = () => dispatch => {
    dispatch(setChatLoading());
    axios
      .get('/api/chat/all')
      .then(res =>
        dispatch({
          type: GET_CHATS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_CHATS,
          payload: null
        })
      );
  };

  // Get Item
export const getChat = id => dispatch => {
  dispatch(setChatLoading());
  axios
    .get(`/api/chat/${id}`)
    .then(res =>
      dispatch({
        type: GET_CHAT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CHAT,
        payload: null
      })
    );
};

export const addChat = (chatData, history,id) => (dispatch) =>{
    axios
        .post('/api/chat', chatData)
        .then(res => 
            history.push(`/items/${id}`)
            // dispatch({
            //     type: GET_CHAT,
            //     payload: res.data
            // })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const deleteMsg = (id) => (dispatch) =>{
    axios
      .delete(`/api/chat/${id}`)
      .then(res => 
          dispatch({
              type: DELETE_CHAT,
              payload: id
          })
      )
      .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
};

export const setChatLoading = () =>{
    return {
        type: CHAT_LOADING
    };
};