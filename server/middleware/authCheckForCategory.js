import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Cryptr from 'cryptr';

dotenv.config();

const secret = process.env.SECRET;
const cryptr = new Cryptr(secret);

/**
 * @param  {object} req
 * @param  {object} res
 * @param  {object} next
 * @returns {object} undefined
 */
const authCheckForCategory = (req, res, next) => {
  const token = req.headers.authorization || req.params.token;
  if (!token) {
    req.isAuthenticated = false;
    return next();
  }
  // decrypt token with cryptr
  try {
    const unHashToken = cryptr.decrypt(token);

    // verify token with jwt
    jwt.verify(unHashToken, secret, (err, decoded) => {
      req.currentUser = decoded;
      req.isAuthenticated = true;
      return next();
    });
  } catch (error) {
    req.isAuthenticated = false;
    return next();
  }
};
export default authCheckForCategory;
