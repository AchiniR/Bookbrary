const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAuctionInput(data) {
  let errors = {};

  data.value = !isEmpty(data.value) ? data.value : '';
  data.status = !isEmpty(data.status) ? data.status : '';

  if (Validator.isEmpty(data.status)) {
    errors.status = 'status field is required';
  }


  if (Validator.isEmpty(data.value)) {
    errors.value = 'bid value field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};