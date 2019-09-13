const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
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
app.use('/api/items', require('./routes/items'));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
