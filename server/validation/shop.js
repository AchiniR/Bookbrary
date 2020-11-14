const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateShopInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.opening_Hours = !isEmpty(data.opening_Hours) ? data.opening_Hours : '';

  data.address = !isEmpty(data.address) ? data.address : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'description field is required';
  }

  if (Validator.isEmpty(data.opening_Hours)) {
    errors.opening_Hours = 'opening_Hours field is required';
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = 'address is required';
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'phone field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }


  if (Validator.isEmpty(data.email)) {
    errors.email = 'email field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};