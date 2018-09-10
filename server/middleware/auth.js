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
const auth = (req, res, next) => {
  const token = req.headers.authorization || req.params.token;
  if (!token) {
    return res.status(401).jsend.fail({
      auth: false,
      message: 'No token provided',
    });
  }
  // decrypt token with cryptr
  try {
    const unHashToken = cryptr.decrypt(token);

    // verify token with jwt
    jwt.verify(unHashToken, secret, (err, decoded) => {
      if (err) {
        return res.status(401).jsend.fail({
          auth: false,
          message: 'Failed to authenticate token! Valid token required',
        });
      }
      if (req.headers.authorization && !decoded.isVerified) {
        return res.status(401).jsend.fail({
          auth: false,
          message: 'You dont have access. please verify your account',
        });
      }
      req.currentUser = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).jsend.fail({ auth: false, message: 'Failed to authenticate token! Valid token required' });
  }
};
export default auth;
