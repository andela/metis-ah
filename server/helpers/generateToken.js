import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Cryptr from 'cryptr';

dotenv.config();
const secret = process.env.SECRET;
const cryptr = new Cryptr(secret);
/**
 * @description This function generates and encrypts JWT token
 * @param  {integer} time
 * @param  {object} payload
 * @returns {string} encrypted JWT token
 */
const generateToken = (time, payload) => {
  const rawToken = jwt.sign(payload, secret, { expiresIn: time });
  return cryptr.encrypt(rawToken);
};
export default generateToken;
