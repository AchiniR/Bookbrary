const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');

//Validation
const validateProfileInput = require('../../validation/profile');

//Load Profile model
const Profile = require('./../../models/Profile');
// Load User Model
const User = require('../../models/User');
const Item = require('../../models/Item');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname  );
  }
});

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  // fileFilter: fileFilter
});


// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/view',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);


//@rout POST api/profile
//@desc post new Book Ad
//@access private
router.post('/', upload.single('profilePic'),
passport.authenticate('jwt', { session: false }),
(req, res) => {
  // const { errors, isValid } = validateProfileInput(req.body);

  // // Check Validation
  // if (!isValid) {
  //   // Return any errors with 400 status
  //   return res.status(400).json(errors);
  // }

  // Get fields
  const ProfileFields = {};
  ProfileFields.user = req.user.id;
  if (req.file.path) ProfileFields.profilePic = req.file.path;
  if (req.body.gender) ProfileFields.gender = req.body.gender;
  if (req.body.phoneNumber) ProfileFields.phoneNumber = req.body.phoneNumber;
  if (req.body.district) ProfileFields.district = req.body.district;

  new Profile(ProfileFields).save().then(profile => res.json(profile));
  
});


// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      Item.deleteMany({user: req.user.id}).then(()=>{
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      })
      
    });
  }
);

module.exports = router;