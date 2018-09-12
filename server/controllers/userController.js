import bcrypt from 'bcrypt';
import models from '../models';
import generateToken from '../helpers/generateToken';

const { Users } = models;

const userController = {
  /**
   * @description The signup method
   * @param  {object} req The request object
   * @param  {object} res The response object
   * @returns {object} json response
   */
  signUp: (req, res) => {
    Users.findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      }
    })
      .spread((user, created) => {
        if (!created) {
          return res.status(400).jsend.fail({ message: 'email already exist!' });
        }
        const token = generateToken(user.id, 7200);

        return res.status(201).jsend.success({
          userId: user.id,
          username: user.username,
          message: 'user is signed up successfully',
          token
        });
      });
  },
  /**
   * @description The login method
   * @param  {object} req The request object
   * @param  {object} res The response object
   * @returns {object} json response
   */
  login: (req, res) => {
    Users
      .findOne({
        where: { email: req.body.email }
      })
      .then((user) => {
        if (!user) {
          return res.status(401).jsend.error({
            message: 'Invalid credentials supplied',
          });
        }
        if (!Users.checkPassword(req.body.password, user.password)) {
          return res.status(401).jsend.error({
            message: 'Invalid credentials supplied',
          });
        }
        const token = generateToken(user.id, 7200);

        return res.status(200).jsend.success({
          userId: user.id,
          username: user.username,
          message: 'user is signed in successfully',
          token
        });
      });
  }
};

export default userController;
