import axios from 'axios';
import { GET_SHOP, ADD_SHOP, DELETE_SHOP, SHOP_LOADING, UPDATE_SHOP, GET_ERRORS } from './types';


// // Get Shop
// export const getShop = id => dispatch => {
//     dispatch(setShopLoading());
//     axios
//       .get(`/api/shop/${id}`)
//       .then(res =>
//         dispatch({
//           type: GET_SHOP,
//           payload: res.data
//         })
//       )
//       .catch(err =>
//         dispatch({
//           type: GET_SHOP,
//           payload: null
//         })
//       );
//   };

  // Get current shop
export const getCurrentShop = () => (dispatch) => {
    dispatch(setShopLoading());
    axios
      .get('/api/shop/myshop')
      .then(res =>
        dispatch({
          type: GET_SHOP,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_SHOP,
           payload: {}
        })
      );
  };

export const addShop = (shopData) => (dispatch) =>{
    axios
        .post('/api/shop', shopData)
        .then(res => 
            dispatch({
                type: ADD_SHOP,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const updateShop = (shopData,id) => (dispatch) =>{
  axios
      .post(`/api/shop/update/${id}`, shopData)
      .then(res => 
          dispatch({
              type: UPDATE_SHOP,
              payload: res.data
          })
      )
      .catch(err =>
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      );
};

export const deleteShop = (id) => (dispatch) =>{
    axios
        .delete(`/api/shop/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_SHOP,
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



export const setShopLoading = () =>{
    return {
        type: SHOP_LOADING
    };
};

