const express = require("express");
const mongoose = require("mongoose");
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport');
require('dotenv').config();
require('./api/middleware/passport')(passport);

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

//Connect flash
app.use(flash());

//db config
const db = process.env.DB_CONNECTION;

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false)

// Register handlebars view engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
// Use handlebars view engine
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

// Routes
app.use('/users', require('./api/routes/users'));
app.use('/auth', require('./api/routes/auth'));
app.use('/teams', require('./api/routes/teams'));
app.use('/tasks', require('./api/routes/tasks'));
app.use('/home', require('./api/routes/home'));

app.get('/', (req, res) => {
  res.render('index');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
