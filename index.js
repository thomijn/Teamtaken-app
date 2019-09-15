const express = require("express");
const mongoose = require("mongoose");
const app = express();
const exphbs = require('express-handlebars');
require('dotenv').config();

//bodyparser
app.use(express.json());

//db config
const db = process.env.DB_CONNECTION

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Register handlebars view engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
// Use handlebars view engine
app.set('view engine', 'hbs');

// Routes
app.use('/users', require('./api/routes/users'));
app.use('/auth', require('./api/routes/auth'));
app.use('/teams', require('./api/routes/teams'));
app.use('/tasks', require('./api/routes/tasks'));

app.get('/', (req, res) => {
  res.render('index');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
