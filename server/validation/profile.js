const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
  data.district = !isEmpty(data.district) ? data.district : '';

  if (!Validator.isLength(data.phoneNumber, { max: 10 })) {
    errors.name = 'Phone number must be 10 characters';
  }

  if (Validator.isEmpty(data.district)) {
    errors.district = 'District field is required';
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = 'Gender field is required';
  }

  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = 'phoneNumber field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};