const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateItemInput(data) {
  let errors = {};

  data.bookName = !isEmpty(data.bookName) ? data.bookName : '';
  data.ISBN = !isEmpty(data.ISBN) ? data.ISBN : '';
  data.author = !isEmpty(data.author) ? data.author : '';

  data.condition = !isEmpty(data.condition) ? data.condition : '';
  data.category = !isEmpty(data.category) ? data.category : '';
  data.sellerName = !isEmpty(data.sellerName) ? data.sellerName : '';
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
  data.district = !isEmpty(data.district) ? data.district : '';
  data.location = !isEmpty(data.location) ? data.location : '';

  if (!Validator.isLength(data.phoneNumber, { max: 10 })) {
    errors.name = 'Phone number must be 10 characters';
  }

  if (Validator.isEmpty(data.sellerName)) {
    errors.sellerName = 'Name field is required';
  }

  if (Validator.isEmpty(data.district)) {
    errors.district = 'District field is required';
  }

  if (!Validator.isLength(data.ISBN, { min: 10, max: 13 })) {
    errors.ISBN = 'ISBN needs to between 10 and 13 characters';
  }

  if (Validator.isEmpty(data.bookName)) {
    errors.bookName = 'Book Name is required';
  }

  if (Validator.isEmpty(data.ISBN)) {
    errors.ISBN = 'ISBN field is required';
  }

  if (Validator.isEmpty(data.author)) {
    errors.author = 'Author field is required';
  }

  if (Validator.isEmpty(data.condition)) {
    errors.condition = 'Condition is required';
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'Category field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};