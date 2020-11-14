import axios from 'axios';
import { GET_SELLER, ADD_SELLER, DELETE_SELLER, SELLERS_LOADING, GET_ERRORS } from './types';

export const getSeller = () => dispatch =>{
    dispatch(setSellersLoading());
    axios
        .get('/api/seller/viewAll')
        .then(res => 
            dispatch({
                type: GET_SELLER,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_SELLER,
                payload: {}
            })
        );
};

export const addSeller = (sellerData,history) => (dispatch) =>{
    axios
        .post('/api/seller', sellerData)
        .then(res => 
            dispatch({
                type: ADD_SELLER,
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

export const deleteSeller = (id) => (dispatch) =>{
    axios
        .delete(`/api/seller/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_SELLER,
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


export const setSellersLoading = () =>{
    return {
        type: SELLERS_LOADING
    };
};