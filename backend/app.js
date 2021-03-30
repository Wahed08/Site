const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const HttpError = require('./model/http-error');
require('dotenv').config();

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
    const error = new HttpError(
        'Could not find this route',
        404
    );
    return next(error);
})

//error middleware
app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
  });

//connect to db
const Database_URL = process.env.DB_URL;
mongoose.connect(Database_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(5000))
.then(() => console.log("Database Connected"))
.catch(err => {
    console.log(err);
})
