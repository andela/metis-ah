import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { Op } from 'sequelize';
import models from '../models';
import generateToken from '../helpers/generateToken';
import mailer from '../helpers/utils/mailer';
import helpers from '../helpers/helpers';
import msg from '../helpers/utils/eMsgs';
import { cloudinaryConfig, uploader } from '../config/cloudinary/cloudinaryConfig';
import { multerUploads, dataUri } from '../config/multer/multerConfig';
import refineAndConcat from '../helpers/refineAndConcat';

config();
const url = process.env.BASE_URL;

const { verifiedMessage, successSignupMessage, msgForPasswordReset } = msg;
const { parsedId } = helpers;
const { refine, concatUnique } = refineAndConcat;
const {
  Users, Followings, Interests, Categories, Articles, Bookmarks, Ratings
} = models;

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
        [Op.or]: [
          { email: req.body.email },
          { username: req.body.username }
        ]
      },
      defaults: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
    })
      .spread((user, created) => {
        // checks if email or username already exists
        if (!created) {
          const duplicateValue = user.email === req.body.email ? 'email' : 'username';
          return res
            .status(400)
            .jsend.fail({ message: `${duplicateValue} already exist!` });
        }
        const token = generateToken(7200, {
          id: user.id,
          isVerified: user.isVerified,
          roleId: user.roleId
        });

        // THIS FUNCTION SEND AN EMAIL TO USER FOR VERIFICATION OF ACCOUNT
        mailer.onUserRegistration(user.username, user.email, req.body.verifyURL, token);
        return res
          .status(201)
          .jsend.success({
            userId: user.id,
            username: user.username,
            message: successSignupMessage,
            token
          });
      })
      .catch(() => {
        res
          .status(500)
          .jsend.fail({
            message: 'Signup was not successful. Please try again'
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
        const token = generateToken(7200, {
          id: user.id,
          isVerified: user.isVerified,
          roleId: user.roleId
        });
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
        password: req.body.password
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
            const token = generateToken('365d', { id: req.currentUser.id, isVerified: true, roleId: user.roleId });
            return res.status(200).jsend.success({
              message: 'Your account is verified successfully',
              id: user.id,
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              roleId: user.roleId,
              image: user.image,
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
      const interests = req.body.interests ? req.body.interests.split(',') : null;
      const updateUser = (image) => {
        const updates = {
          firstname,
          lastname,
          username,
          email,
          bio,
          image,
          interests
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
    Users.findById(userId, {
      include: [
        { model: Articles, as: 'articles' },
        { model: Ratings, as: 'ratings' },
        { model: Bookmarks, as: 'bookmarks' },
        'followed',
        'follower'
      ]
    })
      .then((user) => {
        if (!user || user === undefined) {
          return res.status(404).jsend.fail({
            message: 'No user found'
          });
        }
        delete user.password;
        return res.status(200).jsend.success({
          message: 'User details',
          user
        });
      });
  },
  /**
   * @method usersInterests
   * @description fetches users' interests when logged in
   * @param {Object} req The request object
   * @param {Object} res The the response object
   * @param {Object} next object to call the next middleware
   * @returns {Object} The modified profile details
   */
  usersInterests: async (req, res, next) => {
    const { isAuthenticated, currentUser } = req;
    // skip operation if page or limit is defined or if user is not logged in
    if (req.query.page || req.query.limit || !isAuthenticated) {
      return next();
    }

    try {
      const result = await Users.findById(currentUser.id, {
        include: ['categoryInterests'],
        limit: 10
      });

      // create a new array of object with required properties
      const {
        uniqueCategories, userInterests
      } = refine(result.dataValues.categoryInterests);

      if (userInterests.length === 10) {
        return res.status(200).jsend.success({
          categories: userInterests
        });
      }

      const moreResults = await Categories.findAll({ limit: 10 });

      // add more categories to users interest
      const moreCategories = concatUnique(uniqueCategories, userInterests, moreResults);

      return res.status(200).jsend.success({
        categories: moreCategories
      });
    } catch (error) {
      return next();
    }
  },
  /**
   * @method addInterests
   * @description Allows users to add interests based on available categories
   * @param {Object} req The request object
   * @param {Object} res The the response object
   * @returns {Object} The modified profile details
   */
  addInterests: async (req, res) => {
    const { category } = req.body;
    const userId = req.currentUser.id;

    try {
      const categoryIds = await Categories.findAll({ where: { id: category } });

      // retrieve ids and structure for persisting to the database
      const promises = categoryIds.map(async (item) => {
        const [updated] = await Interests.update(
          { status: 'active' },
          { where: { userId, categoryId: item.dataValues.id, status: 'deleted' } }
        );
        if (updated) {
          return {
            interest: item,
            created: true
          };
        }
        const [userInterest, created] = await Interests.findOrCreate({
          where: { userId, categoryId: item.dataValues.id },
          defaults: { status: 'active' }
        });

        return {
          interest: item,
          created
        };
      });

      const result = await Promise.all(promises);

      // distinguish between newly added and existing interests
      const { added, existing } = result.reduce((acc, item) => {
        if (!item.created) {
          acc.existing.push(item);
        } else {
          acc.added.push(item);
        }
        return acc;
      }, { added: [], existing: [] });

      return res.status(200).jsend.success({
        message: `${added.length} interests were added; ${existing.length} interests already existed`,
        added,
        existing
      });
    } catch (error) {
      return res.status(500).jsend.error({
        message: 'There was a problem adding your interest'
      });
    }
  },
  removeInterests: async (req, res) => {
    const { category } = req.body;
    const userId = req.currentUser.id;

    try {
      const promises = category.map(async (item) => {
        const [result] = await Interests.update(
          { status: 'deleted' },
          { where: { userId, categoryId: item, status: 'active' } }
        );
        return { categoryId: item, status: result };
      });

      const result = await Promise.all(promises);

      // distinguish between removed and interests relationship that do not exist
      const { removed, failed } = result.reduce((acc, item) => {
        if (item.status) {
          item.status = 'removed';
          acc.removed.push(item);
        } else {
          item.status = 'failed';
          acc.failed.push(item);
        }
        return acc;
      }, { removed: [], failed: [] });

      return res.status(200).jsend.success({
        message: `${removed.length} interests were removed; ${failed.length} of the interests were not associated with you`,
        removed,
        failed
      });
    } catch (error) {
      return res.status(500).jsend.error({
        message: 'There was a problem adding your interest'
      });
    }
  }
};

export default userController;
