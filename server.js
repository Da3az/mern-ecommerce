const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const cors = require("cors");

const User = require('./models/User');
require('dotenv').config();

// Uncomment to seed products to the database
const seedProducts = require('./seeds/products');
 seedProducts();

const publicPath = path.join(__dirname, 'client', 'public');
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI
const app = express();
mongoose.connect(uri,{ useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true});

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(cors())
app.use(express.static(publicPath));
app.use(urlencodedParser);
app.use(expressSession({
  secret: 'sessionSecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/auth', authRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/stripe', stripeRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => console.log('SERVER NOW RUNNING...'));