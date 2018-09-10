import models from '../models';
import errorHelpers from '../helpers/errorHelpers';
import helpers from '../helpers/helpers';

const { Articles } = models;
const { notFound } = errorHelpers;
const { checkProps } = helpers;

const ratingValidation = {
  /**
   * @description Handel's user cannot rate own article
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param  {function} next The next middleware
   * @returns {object} The next middleware or response object
   */
  validateUser: (req, res, next) => {
    Articles.findOne({
      where: {
        id: req.params.articleID,
        userId: req.currentUser
      }
    }).then((article) => {
      if (article) {
        return res.status(401).jsend.fail({
          message: 'User cannot rate his own article'
        });
      }

      return next();
    });
  },

  /**
   * @description Handel's articleID validation
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param  {function} next The next middleware
   * @returns {object} The next middleware or response object
   */
  validArticleId: (req, res, next) => {
    Articles.findOne({
      where: {
        id: req.params.articleID
      }
    }).then((record) => {
      if (!record) {
        return notFound(req, res, 'Article');
      }
      return next();
    }).catch(() => notFound(req, res, 'Article'));
  },

  /**
   * @description Handel's rating validation
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param  {function} next The next middleware
   * @returns {object} The next middleware or response object
   */
  validateRating: (req, res, next) => {
    if (typeof Number(req.body.rating) !== 'number') {
      return res.status(400).jsend.fail({
        message: 'Rating must be a number.'
      });
    }

    if (req.body.rating > 5 || req.body.rating < 1) {
      return res.status(400).jsend.fail({
        message: 'Rating out of range. (Accepted range: 1 - 5.)'
      });
    }

    return next();
  },

  /**
   * @description Handel's request object validation
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param  {function} next The next middleware
   * @returns {object} The next middleware or response object
   */
  validateObject: (req, res, next) => {
    const { valid, invalidMessages } = checkProps(req.body, 'rating');
    if (!valid) {
      return res.status(400).jsend.fail({
        messages: invalidMessages
      });
    }

    return next();
  }
};

export default ratingValidation;
