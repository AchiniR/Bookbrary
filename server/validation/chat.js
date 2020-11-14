const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateChatInput(data) {
  let errors = {};

  data.message = !isEmpty(data.message) ? data.message : '';

  if (Validator.isEmpty(data.message)) {
    errors.message = 'message field is required';
  }




  return {
    errors,
    isValid: isEmpty(errors)
  };
};