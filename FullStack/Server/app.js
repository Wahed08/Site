const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//middleware


//routes



//error middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const Database_URL = process.env.DB_URL;
const port = process.env.PORT;

//connect to db
mongoose
  .connect(Database_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(port || process.env.PORT))
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });