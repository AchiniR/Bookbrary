const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const items = require('./routes/api/items');
const profile = require('./routes/api/profile');
const shop = require('./routes/api/shop');
const chat = require('./routes/api/chat');
const review = require('./routes/api/review');
const posts = require('./routes/api/posts');
const auction = require('./routes/api/auction');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;
 
// Connect to MongoDB
mongoose
    .connect(db, { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true ,
        useFindAndModify: false
    })
    .then(()=> console.log('MongoDB Connected..'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

app.use('/uploads', express.static('uploads'));

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/items', items);
app.use('/api/profile', profile);
app.use('/api/shop', shop);
app.use('/api/chat', chat);
app.use('/api/review', review);
app.use('/api/posts', posts);
app.use('/api/auction', auction);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
