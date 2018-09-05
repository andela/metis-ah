import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Cryptr from 'cryptr';

dotenv.config();
const secret = process.env.SECRET;
const cryptr = new Cryptr(secret);
/**
 * @description This function generates and encrypts JWT token
 * @param  {integer} id
 * @param  {integer} time
 * @returns {string} encrypted JWT token
 */
const generateToken = (id, time) => {
  const rawToken = jwt.sign({ id }, secret, { expiresIn: time });
  return cryptr.encrypt(rawToken);
};

export default generateToken;
