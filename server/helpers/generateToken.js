import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Cryptr from 'cryptr';

dotenv.config();
const secret = process.env.SECRET;
const cryptr = new Cryptr(secret);
/**
 * @description This function generates and encrypts JWT token
 * @param  {integer} time
 * @param  {Array} args
 * @returns {string} encrypted JWT token
 */
const generateToken = (time, { ...args }) => {
  const rawToken = jwt.sign({ ...args }, secret, { expiresIn: time });
  return cryptr.encrypt(rawToken);
};
export default generateToken;
