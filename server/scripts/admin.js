import dotenv from 'dotenv';
import model from '../models';

dotenv.config();

const { Users } = model;

Users.findOrCreate({
  where: {
    email: process.env.ADMIN_EMAIL
  },
  defaults: {
    username: 'Admin',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    isVerified: true,
    roleId: 1
  }
}).then(() => {
  process.exit(0);
}).catch(() => {
  process.exit(1);
});
