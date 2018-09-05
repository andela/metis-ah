import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Cryptr from 'cryptr';

dotenv.config();
const secret = process.env.SECRET;
const cryptr = new Cryptr(secret);

/** This function is a middleware that
 * decrypts and verifies tokens
 * @description JWT token verification middleware
 * @param  {object} req The request object
 * @param  {object} res The response object
 * @param  {object} next
 * @param  {string} secret
 * @returns {object} req.currentUser
 */
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      auth: false,
      message: 'No token provided',
    });
  }
  // decrypt token with cryptr
  const unHashToken = cryptr.decrypt(token);

  // verify token with jwt
  jwt.verify(unHashToken, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        auth: false,
        message: 'Failed to authenticate token! Valid token required',
      });
    }
    req.currentUser = decoded.id;
    next();
  });
};

export default auth;
