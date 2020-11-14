const express = require('express');
const router = express.Router();
const passport = require('passport');

//Validation
const validateShopInput = require('../../validation/shop');

//Load Item model
const Shop = require('./../../models/Shop');
// Load User Model
const User = require('../../models/User');



// // @route   GET api/shop/:id
// // @desc    Get shop by id
// // @access  Public
// router.get('/:id', (req, res) => {
//   Shop.findById(req.params.id)
//     .then(shop => res.json(shop))
//     .catch(err =>
//       res.status(404).json({ noshopfound: 'No shop found with that ID' })
//     );
// });

// @route   GET api/shop/view
// @desc    Get current users profile
// @access  Private
router.get(
  '/myshop',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    
    Shop.findOne({user: req.user.id})
      .then(shop => {
        if (!shop) {
          return res.status(404).json({noshopfound: 'There is no shop for this user req.user.id'});
        }
        res.json(shop);
      })
      .catch(err => res.status(404).json(err));
  } 
);

//@rout POST api/shop
//@desc post new Book Ad
//@access private
router.post('/', 
passport.authenticate('jwt', { session: false }),
(req, res) => {
  const { errors, isValid } = validateShopInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const ShopFields = {};
  ShopFields.user = req.user.id; 
  if (req.body.title) ShopFields.title = req.body.title;
  if (req.body.description) ShopFields.description = req.body.description;
  if (req.body.opening_Hours) ShopFields.opening_Hours = req.body.opening_Hours;
  if (req.body.address) ShopFields.address = req.body.address;
  if (req.body.phone) ShopFields.phone = req.body.phone;
  if (req.body.email) ShopFields.email = req.body.email;

  new Shop(ShopFields).save().then(shop => res.json(shop));
  
});

//@rout POST api/shop
//@desc post new Book Ad
//@access private
router.post('/update/:id', (req, res) => {
  Shop.findById(req.params.id )
  .then(shop=>{
    if(!shop){
      return res.status(404).json(errors);
    }
    else{
      shop.title = req.body.title;
      shop.description = req.body.description;
      shop.opening_Hours = req.body.opening_Hours;
      shop.address = req.body.address;
      shop.phone = req.body.phone;
      shop.email = req.body.email;
    }
    shop.save().then(shop => res.json(shop));
  }).catch(err=>{
    return res.status(404).json(err);
  });
});

module.exports = router;