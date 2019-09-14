const express = require("express");
const mongoose = require("mongoose");
const app = express();
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

//routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/teams', require('./routes/teams'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
