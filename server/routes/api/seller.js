const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Validation
const validateSellerInput = require('../../validation/seller');

const Seller = require('../../models/Seller');
// Load User Model
const User = require('../../models/User');


//@rout GET api/seller
//@desc Get all sellers
//@access public
router.get('/viewAll', (req,res)=> {
    Seller.find()
        .sort({sellerName:-1})
        .then(seller=> {
            if (!seller) {
                errors.nosellers = 'There are no profiles';
                return res.status(404).json(errors);
              }
        
              res.json(seller);
        })
        .catch(err => res.status(404).json({ seller: 'There are no sellers' }));
});

//@rout POST api/seller
//@desc post new seller
//@access private
router.post('/', 
passport.authenticate('jwt', { session: false }),
(req, res) => {
  const { errors, isValid } = validateSellerInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const SellerFields = {};
  SellerFields.user = req.user.id;
  if (req.body.sellerName) SellerFields.sellerName = req.body.sellerName;
  if (req.body.phoneNumber) SellerFields.phoneNumber = req.body.phoneNumber;
  if (req.body.district) SellerFields.district = req.body.district;
  if (req.body.location) SellerFields.location = req.body.location;

  new Seller(SellerFields).save().then(seller => res.json(seller));

});



module.exports = router;