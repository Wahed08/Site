const jwt = require('jsonwebtoken');
const HttpError = require('../model/http-error');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, 'amar_code_mile_na_kno');
    req.userId = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!!', 401);
    return next(error);
  }
};
