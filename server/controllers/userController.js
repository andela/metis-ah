import { config } from 'dotenv';
import models from '../models';
import generateToken from '../helpers/generateToken';
import mailer from '../helpers/utils/mailer';
import msg from '../helpers/utils/eMsgs';

config();

const { verifiedMessage, successSignupMessage } = msg;
const { Users, Followings } = models;

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
        password: req.body.password
      }
    })
      .spread((user, created) => {
        if (!created) {
          return res.status(400).jsend.fail({ message: 'email already exist!' });
        }
        const token = generateToken(7200, { id: user.id, isVerified: user.isVerified });

        // THIS FUNCTION SEND AN EMAIL TO USER FOR VERIFICATION OF ACCOUNT
        mailer.onUserRegistration(user.username, user.email, token);
        return res.status(201).jsend.success({
          userId: user.id,
          username: user.username,
          message: successSignupMessage,
          token
        });
      })
      .catch(() => res.status(500).jsend.error({ message: 'Signup was not successful. Please try again' }));
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
        const token = generateToken(7200, { id: user.id, isVerified: user.isVerified });
        if (!user.isVerified) {
          mailer.onUserRegistration(user.username, user.email, token);
          return res.status(400).jsend.error({
            message: 'You have not verified your account yet! An Email is sent to you for account verification'
          });
        }

        return res.status(200).jsend.success({
          userId: user.id,
          username: user.username,
          message: 'user is signed in successfully',
          token
        });
      });
  },

  /**
	 * @description This functionality verifies a user's account
	 * @param  {object} req	The request object
	 * @param  {object} res The response object
	 * @returns {object} json response
	 */
  verify: (req, res) => {
    // CREATE A TOKEN
    const token = generateToken(7200, { id: req.currentUser.id, isVerified: true });

    let userEmail;
    Users
      .findById(req.currentUser.id)
      .then((user) => {
        userEmail = user.email;
        if (user.isVerified) {
          return res.status(401).jsend.error({
            message: 'Your account is already been verified',
          });
        }
        user
          .update({
            isVerified: true
          })
          .then(() => {
            const verifiedMsg = {
              email: userEmail,
              subject: 'Email successfully verified',
              message: verifiedMessage
            };

            // SENDS EMAIL TO USER ON SUCCESSFUL CONFIRMATION
            mailer.emailHelperfunc(verifiedMsg);
            return res.status(200).jsend.success({
              message: 'Your account is verified successfully',
              token
            });
          })
          .catch(() => res.status(500).jsend.error({ message: 'Oops something went wrong. Please try again' }));
      });
  },

  allUsers: (req, res) => {
    Users
      .findAll({
        attributes: ['id', 'username', 'email', 'bio', 'image', 'premium', 'isVerified', 'interests', 'createdAt', 'updatedAt']
      })
      .then(users => res.status(200).jsend.success({
        message: 'Success!',
        users,
        count: users.length
      }))
      .catch(() => res.status(500).jsend.error({ message: 'Login was not successful. Please try again' }));
  },
  /**
    * @description Method to follow a user
    * @param  {object} req The request
    * @param  {object} res The response
    * @returns {object} json response
    */
  follow: (req, res) => {
    Users
      .findById(req.params.userId)
      .then((user) => {
        // check if user exist
        if (!user) {
          return res.status(404).jsend.error({
            message: 'No such user exist',
          });
        }
        // check if follower is same followed
        if (req.currentUser.id === user.id) {
          return res.status(400).jsend.error({ message: 'you cannot follow yourself' });
        }

        // find or create a following relationship
        Followings
          .findOrCreate({
            where: {
              followed: user.id,
              follower: req.currentUser.id
            }
          })
          .spread((_following, created) => {
            // check if relationship exist
            if (!created) {
              return res.status(400).jsend.fail({ message: `You are already following ${user.username}` });
            }
            res.status(200).jsend.success({ message: `you are now following ${user.username}` });
          })
          .catch(() => res.status(500).jsend.error({ message: 'You could not follow user at this time . Please try again' }));
      })
      .catch(() => res.status(500).jsend.error({ message: 'You could not follow user at this time . Please try again' }));
  },
  /**
   * @description Method to unfollow a user
  * @param  {object} req The request
   * @param  {object} res The response
   * @returns {object} json response
   */
  unfollow: (req, res) => {
    Users
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(401).jsend.error({
            message: 'No such user exist',
          });
        }
        // check if follower is same followed
        if (req.currentUser.id === user.id) {
          return res.status(400).jsend.fail({ message: 'you cannot unfollow yourself' });
        }
        Followings
          .findOne({
            where: {
              followed: user.id,
              follower: req.currentUser.id
            }
          })
          .then((follow) => {
            if (!follow) {
              return res.status(401).jsend.error({
                message: `you are not following ${user.username}`,
              });
            }

            follow
              .destroy()
              .then(() => res.status(200).jsend.success({
                message: `you are no longer following ${user.username}`
              }))
              .catch(() => res.status(500).jsend.error({ message: 'You could not unfollow user at this time . Please try again' }));
          })
          .catch(() => res.status(500).jsend.error({ message: 'You could not unfollow user at this time . Please try again' }));
      })
      .catch(() => res.status(500).jsend.error({ message: 'You could not unfollow user at this time . Please try again' }));
  },

  /**
    * @description Method to follow a user
    * @param  {object} req The request
    * @param  {object} res The response
    * @returns {object} json response
    */
  following: (req, res) => {
    Users
      .findOne({ where: { id: req.currentUser.id }, include: ['followed', 'follower'] })
      .then((user) => {
        const { followed, follower } = user;
        return res.status(200).jsend.success({ followed, follower });
      })
      .catch(() => res.status(500).jsend.error({ message: 'we could not get you details at this time . Please try again' }));
  }
};

export default userController;
