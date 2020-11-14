import axios from 'axios';
import { GET_REVIEWS, GET_REVIEW, ADD_REVIEW, REVIEW_LOADING, GET_ERRORS} from './types';

// Get Item
export const getReview = id => dispatch => {
    dispatch(setReviewsLoading());
    axios
      .get(`/api/review/${id}`)
      .then(res =>
        dispatch({
          type: GET_REVIEW,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_REVIEW,
          payload: null
        })
      );
  };

  export const getReviews = ()=> dispatch => {
    dispatch(setReviewsLoading());
    axios
      .get('/api/review')
      .then(res =>
        dispatch({
          type: GET_REVIEWS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_REVIEWS,
          payload: null
        })
      );
  };

  export const addReview = (reviewData, id) => (dispatch) =>{
  
    axios
        .post(`/api/review/${id}`, reviewData)
        .then(res => 
            dispatch({
                type: ADD_REVIEW,
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

export const setReviewsLoading = () =>{
    return {
        type: REVIEW_LOADING
    };
};