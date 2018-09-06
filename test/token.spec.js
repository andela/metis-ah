import jwt from 'jsonwebtoken';
import Cryptr from 'cryptr';
import { config } from 'dotenv';

config();
const secret = process.env.SECRET;
const cryptr = new Cryptr(secret);
const token = jwt.sign(
  {
    id: 1,
    isVerified: true
  },
  secret,
  { expiresIn: 7200 },
);

const hashToken = cryptr.encrypt(token);


export default hashToken;
