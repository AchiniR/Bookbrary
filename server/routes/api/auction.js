const express = require('express');
const router = express.Router();
const passport = require('passport');

//Validation
const validateAuctionInput = require('../../validation/auction');

//Load Chat model
const Auction = require('./../../models/Auction');

// Load User Model
const User = require('../../models/User');
const Item = require('../../models/Item');

//@rout GET api/auction/all
//@desc Get all auction
//@access public
router.get('/all', (req,res)=> {
    Auction.find()
        .sort({date:-1})
        .then(auction=> res.json(auction))
        .catch(err => res.status(404).json({ auction: 'There are no auctions' }));
});

//@rout GET api/auction/:id
//@desc Get all auction
//@access public
router.get('/:id', passport.authenticate('jwt', { session: false }),
(req,res)=> {
  Auction.find( {item: req.params.id })
  .sort({date:'asc'})
  .then(auction => res.json(auction))
  .catch(err =>
    res.status(404).json({ noauctionfound: 'No auction found with that Item ID' })
  );
});

//@rout GET api/auction/first/:id
//@desc Get first
//@access public
router.get('/first/:id', passport.authenticate('jwt', { session: false }),
(req,res)=> {
  Auction.find( {item: req.params.id })
  .sort({date:'asc'})
  .limit(1)
  .then(auction => res.json(auction))
  .catch(err =>
    res.status(404).json({ noauctionfound: 'No auction yet' })
  );
});

//@rout POST api/auction
//@desc post new auction
//@access private
router.post('/', 
passport.authenticate('jwt', { session: false }),
(req, res) => {
  const { errors, isValid } = validateAuctionInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const AuctionFields = {};
  AuctionFields.user = req.user.name; 
  if (req.body.value) AuctionFields.value = req.body.value;
  if (req.body.status) AuctionFields.status = req.body.status;
  if (req.body.item) AuctionFields.item = req.body.item;

  Auction.find()
    .sort({date:-1})
    .limit(1)
    .then(auction=> {
      if(auction){
        AuctionFields.maxValue = auction.value;
      }
      else{
        AuctionFields.maxValue =  30;
      }
      new Auction(AuctionFields).save().then(auction => res.json(auction));
    });

});

// @route   DELETE api/auction/:id
// @desc    Delete auction
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Auction.findByIdAndDelete(req.params.id).then(() => 
        res.json({ success: true })
    );
  }
);


module.exports = router;