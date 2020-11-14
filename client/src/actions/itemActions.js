import axios from 'axios';
import { GET_ITEM, CHEAP_ITEMS, NEW_ITEMS, GET_ITEMS,  DELETE_ITEM, ITEMS_LOADING, GET_ERRORS,  SEARCH_ITEMS } from './types';


// Get Item
export const getItem = id => dispatch => {
    dispatch(setItemsLoading());
    axios
      .get(`/api/items/${id}`)
      .then(res =>
        dispatch({
          type: GET_ITEM,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ITEM,
          payload: null
        })
      );
  };

  export const searchByName = (value) => dispatch => {
    dispatch(setItemsLoading());
    axios
      .get(`/api/items/searchByName/${value}`)
      .then(res =>
        dispatch({
          type: SEARCH_ITEMS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: SEARCH_ITEMS,
          payload: null
        })
      );
  };

  export const getnewArrivals = () => dispatch => {
    dispatch(setItemsLoading());
    axios
      .get('api/items/new/arrival')
      .then(res =>
        dispatch({
          type: NEW_ITEMS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: NEW_ITEMS,
          payload: null
        })
      );
  };

  export const getcheapItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
      .get('api/items/price/under/500')
      .then(res =>
        dispatch({
          type: CHEAP_ITEMS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: CHEAP_ITEMS,
          payload: null
        })
      );
  };

export const addItem = (itemData, history) => (dispatch) =>{
    axios
        .post('/api/items', itemData)
        .then(res => history.push('/')
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const deleteItem = (id) => (dispatch) =>{
  if (window.confirm('Do you want to delete the post? This can NOT be undone!')) {
    axios
        .delete(`/api/items/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
          );
  }
};

// Get all items
export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
      .get('/api/items')
      .then(res =>
        dispatch({
          type: GET_ITEMS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ITEMS,
          payload: null
        })
      );
  };

// Add to favorite
export const addToFav = id => dispatch => {
  axios
    .post(`/api/items/fav/${id}`)
    .then(res => dispatch(getItems()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
 


export const setItemsLoading = () =>{
    return {
        type: ITEMS_LOADING
    };
};