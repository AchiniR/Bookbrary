const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateReviewInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.text = !isEmpty(data.text) ? data.text : '';
  data.ratings = !isEmpty(data.ratings) ? data.ratings : '';


  if (Validator.isEmpty(data.text)) {
    errors.text = 'text field is required';
  }

  if (Validator.isEmpty(data.ratings)) {
    errors.ratings = 'ratings field is required';
  }

  if(data.ratings > 5.0){
    errors.ratings = 'rating value should be less than 5';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};