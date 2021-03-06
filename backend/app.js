const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const HttpError = require("./model/http-error");
const fs = require("fs");
require("dotenv").config();

const app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  return next(error);
});

//error middleware
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
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
