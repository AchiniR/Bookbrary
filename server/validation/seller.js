const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSellerInput(data) {
  let errors = {};

  data.sellerName = !isEmpty(data.sellerName) ? data.sellerName : '';
  // data.email = !isEmpty(data.email) ? data.email : '';
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
  data.district = !isEmpty(data.district) ? data.district : '';
  data.location = !isEmpty(data.location) ? data.location : '';

  if (!Validator.isLength(data.phoneNumber, { max: 10 })) {
    errors.name = 'Phone number must be 10 characters';
  }

  if (Validator.isEmpty(data.sellerName)) {
    errors.sellerName = 'Name field is required';
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  }
  
  if (Validator.isEmpty(data.district)) {
    errors.district = 'District field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
