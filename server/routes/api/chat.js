const express = require('express');
const router = express.Router();
const passport = require('passport');

//Validation
const validateChatInput = require('../../validation/chat');

//Load Chat model
const Chat = require('./../../models/Chat');

// Load User Model
const User = require('../../models/User');
const Item = require('../../models/Item');

//@rout GET api/chat/all
//@desc Get all chat
//@access public
router.get('/all', (req,res)=> {
    Chat.find()
        .sort({date:-1})
        .then(chat=> res.json(chat))
        .catch(err => res.status(404).json({ chat: 'There are no chats' }));
});

//@rout GET api/chat/:id
//@desc Get all chat
//@access public
router.get('/:id', passport.authenticate('jwt', { session: false }),
(req,res)=> {
  Chat.find( {item: req.params.id })
  .sort({date:'asc'})
  .then(items => res.json(items))
  .catch(err =>
    res.status(404).json({ noitemfound: 'No item found with that ID' })
  );
});

//@rout POST api/chat/:item_id
//@desc post new message
//@access private
router.post('/', 
passport.authenticate('jwt', { session: false }),
(req, res) => {
  const { errors, isValid } = validateChatInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Item.findById(req.body.item)
  .then(item => {
    if(!item){
        return res.status(404).json(errors);
      }
      else{
         // Get fields
        const ChatFields = {};
        ChatFields.user = req.user.id; 
        if (req.body.message) ChatFields.message = req.body.message;
        if (req.body.item) ChatFields.item = req.body.item;
        ChatFields.itemOwner = item.user;

        new Chat(ChatFields).save().then(chat => res.json(chat));
      }
  }).catch(err=>{
    return res.status(404).json(err);
  });
  
});

// @route   DELETE api/chat/:id
// @desc    Delete item
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Chat.findByIdAndDelete(req.params.id).then(() => 
        res.json({ success: true })
    );
  }
);


module.exports = router;