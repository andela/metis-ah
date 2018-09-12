import { config } from 'dotenv';
import models from '../models';
import generateToken from '../helpers/generateToken';
import mailer from '../helpers/utils/mailer';
import msg from '../helpers/utils/eMsgs';
import { cloudinaryConfig, uploader } from '../config/cloudinary/cloudinaryConfig';
import { multerUploads, dataUri } from '../config/multer/multerConfig';
import helpers from '../helpers/helpers';

config();
const { parsedId } = helpers;
const { Users } = models;
const { verifiedMessage, successSignupMessage } = msg;

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
          });
      });
  },

  allUsers: (req, res) => {
    Users
      .findAll()
      .then(users => res.status(200).jsend.success({
        message: 'Success!',
        users,
        count: users.length
      }));
    },
  /**
   * @method updateProfile
   * @description Allows users to edit their profile
   * @param {Object} req The request object
   * @param {Object} res The the response object
   * @returns {Object} The modified profile details
   */
  updateProfile: (req, res) => {
    multerUploads(req, res, () => {
      const { id } = req.currentUser;
      const {
        firstname, lastname, username, email, bio,
      } = req.body;
      const interest = (req.body.interest) ? req.body.interest.split(',') : null;
      const updateUser = (image) => {
        const updates = {
          firstname,
          lastname,
          username,
          email,
          bio,
          image,
          interest
        };
        if (!req.file) {
          delete updates.image;
        }
        Users.update(updates, {
          where: {
            id
          }
        }).then(user => res.status(200).jsend.success({
          message: 'Your profile has been updated successfully',
          user
        }));
      };
      if (req.file) {
        const file = dataUri(req);
        cloudinaryConfig();
        uploader.upload(
          file.content,
          (result) => {
            const image = result.url;
            return updateUser(image);
          },
        );
      } else {
        updateUser();
      }
    });
  },

  /**
   * @method getUserProfile
   * @description Allows users to view other user's profile
   * @param {Object} req The request object
   * @param {Object} res The the response object
   * @returns {Object} The modified profile details
   */
  getUserProfile: (req, res) => {
    const userId = parsedId(req.params.userId);
    if (!(Number.isInteger(userId))) {
      return res.status(400).jsend.error({
        message: 'Invalid user details'
      });
    }
    Users.findOne({ where: { id: userId } })
      .then((user) => {
        if (!user || user === undefined) {
          res.status(404).jsend.fail({
            message: 'No user found'
          });
        }
        delete user.password;
        res.status(200).jsend.success({
          message: 'User details',
          user
        });
      });
  }
};

export default userController;
