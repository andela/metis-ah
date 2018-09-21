import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import models from '../models';
import generateToken from '../helpers/generateToken';
import mailer from '../helpers/utils/mailer';
import helpers from '../helpers/helpers';
import msg from '../helpers/utils/eMsgs';
import { cloudinaryConfig, uploader } from '../config/cloudinary/cloudinaryConfig';
import { multerUploads, dataUri } from '../config/multer/multerConfig';

config();
const url = process.env.BASE_URL;

const { verifiedMessage, successSignupMessage, msgForPasswordReset } = msg;
const { parsedId } = helpers;
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
      }).catch(() => {
        res.status(500).jsend.fail({ message: 'Signup was not successful. Please try again' });
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
      }).catch(() => {
        res.status(500).jsend.fail({ message: 'Login was not successful. Please try again' });
      });
  },
  /**
   * @description This is the method that generates the password reset email
   * @param  {object} req The request object
   * @param  {object} res The response object
   * @returns {object} json response
   */
  resetPassword: (req, res) => {
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
        // generate token
        const token = generateToken(600, { id: user.id, updatedAt: user.updatedAt });

        mailer.sender({
          to: user.email,
          subject: 'Password reset',
          message: msgForPasswordReset(user.username, url, token)
        });
        return res.status(200).jsend.success({
          message: 'Password reset link has been sent to your email',
        });
      }).catch(() => {
        res.status(500).jsend.fail({ message: 'Request could not be processed. Please try again' });
      });
  },
  /**
   * @description This is method that resets the users password
   * @param  {object} req The request object
   * @param  {object} res The response object
   * @returns {object} json response
   */
  reset: (req, res) => {
    Users.findOne({
      where: { id: req.currentUser.id }
    }).then((user) => {
      if (!helpers.compareDate(req.currentUser.updatedAt, user.updatedAt)) {
        return res.status(401).jsend.error({ message: 'Verification link not valid' });
      }
      Users.update({
        password: bcrypt.hashSync(req.body.password, 8)
      }, {
        where: { id: req.currentUser.id }
      }).then(() => res.status(200).jsend.success({
        message: 'Password reset successful',
      })).catch(() => {
        res.status(500).jsend.fail({ message: 'Request could not be completed. Please try again' });
      });
    }).catch(() => {
      res.status(500).jsend.fail({ message: 'Request could not be completed. Please try again' });
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
  },
  /**
   * @method updateProfile
   * @description Allows users to edit their profile
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} The modified profile details
   */
  updateProfile: (req, res) => {
    multerUploads(req, res, () => {
      const { id } = req.currentUser;
      const {
        firstname, lastname, username, email, bio,
      } = req.body;
      const interest = req.body.interest ? req.body.interest.split(',') : null;
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
          },
          returning: true,
          plain: true
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
      return res.status(404).jsend.error({
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
