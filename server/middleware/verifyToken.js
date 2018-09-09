import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

/** This function is a middleware that
 * decrypts and verifies tokens
 * @description JWT token verification middleware
 * @param  {object} req The request object
 * @param  {object} res The response object
 * @param  {object} next
 * @param  {string} secret
 * @returns {object} req.currentUser
 */
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).jsend.error({
      auth: false,
      message: 'No token provided',
    });
  }


  // VERIFY AND DECODE INCOMING TOKEN
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).jsend.error({
        auth: false,
        message: 'Failed to authenticate token! Valid token required',
      });
    }
    req.currentUser = decoded.id;
    next();
  });
};

export default verifyToken;
