const express = require('express');
const router = express.Router();
const passport = require('passport');

//Validation
const validateReviewInput = require('../../validation/review');

//Load Review model
const Review = require('./../../models/Review');
//Load Item model
const Item = require('./../../models/Item');
// Load User Model
const User = require('../../models/User');

//@rout GET api/review
//@desc Get all review
//@access public
router.get('/', (req,res)=> {
    Review.find()
        .sort({date:-1})
        .then(review=> res.json(review))
        .catch(err => res.status(404).json({ review: 'There are no reviews' }));
});

// @route   GET api/review/:id
// @desc    Get review by id
// @access  Public
router.get('/:id', (req, res) => {
    Review.find({item: req.params.id})
      .then(review => res.json(review))
      .catch(err =>
        res.status(404).json({ noreviewfound: 'No review found with that ID' })
      );
  });

//@rout POST api/review
//@desc post new review
//@access public
router.post('/:id', 
(req, res) => {
  const { errors, isValid } = validateReviewInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const ReviewFields = {};
  ReviewFields.item = req.params.id; 
  if (req.body.name) ReviewFields.name = req.body.name;
  if (req.body.text) ReviewFields.text = req.body.text;
  if (req.body.ratings) ReviewFields.ratings = req.body.ratings;

  new Review(ReviewFields).save().then(review => res.json(review));
  
});

module.exports = router;