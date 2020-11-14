const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const sharp =  require('sharp');
const imager = require('multer-imager');

//Validation
const validateItemInput = require('../../validation/item');

//Load Item model
const Item = require('./../../models/Item');
// Load User Model
const User = require('../../models/User');

// const storage = imager({
//     dirname: './uploads/',
//     bucket: 'bookImage',
//     accessKeyId: 'aws-key-id',
//     secretAccessKey: 'aws-key',
//     region: 'us-east-1',
//     filename: function(req, file, cb) {
//       cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname  );
//     },                                    
//     gm: {                                 
//       width: 330,                         
//       height: 500,
//     },
//     s3 : {                               
//       Metadata: {                        
//         'customkey': 'data'              
//       }
//     }
// });

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname  );
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 0.5
  },
  fileFilter: fileFilter
});


//@rout GET api/items
//@desc Get all items
//@access public
router.get('/', (req,res)=> {
    Item.find()
        .sort({date:-1})
        .then(items=> res.json(items))
        .catch(err => res.status(404).json({ items: 'There are no items' }));
});

// @route   GET api/items/:id
// @desc    Get item by id
// @access  Public
router.get('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(items => res.json(items))
    .catch(err =>
      res.status(404).json({ noitemfound: 'No item found with that ID' })
    );
});

//@rout POST api/item
//@desc post new Book Ad
//@access private
router.post('/', upload.single('image'),
passport.authenticate('jwt', { session: false }),
(req, res) => {
   const { errors, isValid } = validateItemInput(req.body);

   // Check Validation
   if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const ItemFields = {};
  ItemFields.user = req.user.id;
  if (req.body.bookName) ItemFields.bookName = req.body.bookName;
  if (req.body.price) ItemFields.price = req.body.price;
  if (req.body.ISBN) ItemFields.ISBN = req.body.ISBN;
  if (req.body.author) ItemFields.author = req.body.author;
  
  if (req.body.condition) ItemFields.condition = req.body.condition;
  if (req.body.description) ItemFields.description = req.body.description;
  if (req.body.category) ItemFields.category = req.body.category;
  if (req.body.sellerName) ItemFields.sellerName = req.body.sellerName;
  if (req.body.phoneNumber) ItemFields.phoneNumber = req.body.phoneNumber;
  if (req.body.district) ItemFields.district = req.body.district;
  


  Item.findOne({ ISBN: req.body.ISBN }).then(item => {
    if (item) {
      // Update
      Item.findOneAndUpdate(
        {_id: item._id},
        { $set: ItemFields },
        { new: true }
      ).then(item => res.json(item));
    } else {
      // Create
      if (req.file.path) ItemFields.image = req.file.path;
      new Item(ItemFields).save().then(item => res.json(item));
      
    }
  });
  
});

// @route   DELETE api/items/:id
// @desc    Delete item
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Item.findByIdAndDelete(req.params.id).then(() => 
        res.json({ success: true })
    );
  }
);

// @route   POST api/items/fav/:id
// @desc    add to fav
// @access  Private
router.post(
  '/fav/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Item.findById(req.params.id)
        .then(item => {
          if (
            item.favs.filter(fav => fav.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyfavd: 'User already favd this item' });
          }

          // Add user id to favs array
          item.favs.unshift({ user: req.user.id });

          item.save().then(item => res.json(item));
        })
        .catch(err => res.status(404).json({ itemnotfound: 'No item found' }));
    });
  }
);



// @route   GET api/items/searchByName/:value
// @desc    Get item by value
// @access  Public
router.get('/searchByName/:value', (req, res) => {
  const val = req.params.value;
  

  Item.find({ $or: [
    {bookName: {"$regex": val, "$options": "i"} },
    {author: {"$regex": val, "$options": "i"}},
    {ISBN: {"$regex": val, "$options": "i"}},
    {district: {"$regex": val, "$options": "i"}}
  ]})
    .then(items => res.json(items))
    .catch(err =>
      res.status(404).json({ noitemfound: 'No item found with that value' })
    );
});

// @route   GET api/items/newArrivals
// @desc    Get new items
// @access  Public
router.get('/new/arrival', (req, res) => {
  Item.find()
        .sort({date:-1})
        .limit(4)
        .then(items=> res.json(items))
        .catch(err => res.status(404).json({ nonewitemfound: 'There are no new arrivals' }));
});

// @route   GET api/items/under500
// @desc    Get items under 500
// @access  Public
router.get('/price/under/500', (req, res) => {
  Item.find({price: {$lt: 500}})
        .sort({date:-1})
        .then(items=> res.json(items))
        .catch(err => res.status(404).json({ nounderitemfound: 'There are no under 500' }));
});


module.exports = router;