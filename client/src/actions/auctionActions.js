import axios from 'axios';
import { GET_AUCTION, GET_AUCTIONS, DELETE_AUCTION, AUCTION_LOADING, GET_ERRORS,GET_FIRST } from './types';

  // Get all AUCTIONs
export const getItemAuctions = () => dispatch => {
    dispatch(setAuctionLoading());
    axios
      .get('/api/auction/all')
      .then(res =>
        dispatch({
          type: GET_AUCTIONS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_AUCTIONS,
          payload: null
        })
      );
  };

  // Get Item
export const getAuction = id => dispatch => {
  dispatch(setAuctionLoading());
  axios
    .get(`/api/auction/${id}`)
    .then(res =>
      dispatch({
        type: GET_AUCTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_AUCTION,
        payload: null
      })
    );
};

  // Get Item
  export const getFirstBid = id => dispatch => {
    dispatch(setAuctionLoading());
    axios
      .get(`/api/auction/first/${id}`)
      .then(res =>
        dispatch({
          type: GET_FIRST,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_FIRST,
          payload: null
        })
      );
  };

export const addAuction = (aucData, history, id) => (dispatch) =>{
    axios
        .post('/api/auction', aucData)
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

export const deleteBid = (id) => (dispatch) =>{
    axios
      .delete(`/api/auction/${id}`)
      .then(res => 
          dispatch({
              type: DELETE_AUCTION,
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

export const setAuctionLoading = () =>{
    return {
        type: AUCTION_LOADING
    };
};