
import slug from 'slug';
import uuid from 'uuid-random';
import ratingHelpers from '../helpers/ratingHelpers';
import models from '../models';
import { dataUri } from '../config/multer/multerConfig';
import imageUpload from '../helpers/imageUpload';

const { Cases, Articles, Ratings, ArticleLikes } = models;
const { analyseRatings } = ratingHelpers;

/**
 * @desc This a controller object literal that handles
 * containing functions that handles action relating to Articles
 */
const articlesController = {
  /**
   * @desc saves an article to the database
   * @param  {object} req http request object
   * @param  {object} res http response object
   * @returns {res} http response object
   */
  create: async (req, res) => {
    const fields = req.body;
    let imageUrl = null;
    // check for image exists in the request body
    if (req.file) {
      const file = dataUri(req);
      // SAVES IMAGE TO CLOUDINARY
      imageUrl = await imageUpload(file, res, fields);
      imageUrl = imageUrl.url;
    }
    // SAVE ARTICLE
    Articles.create({
      userId: req.currentUser.id,
      title: fields.title,
      slug: `${slug(fields.title)}-${uuid()}`,
      description: fields.description,
      body: fields.body,
      imageUrl
    }).then(createdArticle => res.status(201).jsend.success({
      article: createdArticle,
      message: 'Article published successfully'
    })).catch(err => res.status(500).jsend.fail({
      message: 'Something, went wrong. please try again',
      error: err.message
    }));
  },
  /**
   * @description this function likes, dislikes and unlike an article
   * @param  {Object} req the request object
   * @param  {Object} res the response object
   * @returns {Object} json response
   */
  like: (req, res) => {
    // Check the params passed by user to determine what function to be performed
    const like = req.params.likeType === 'like';
    const dislike = req.params.likeType === 'dislike';
    // message to be sent to user depending on function performed
    const message = like || dislike ? `you ${req.params.likeType}d the article`
      : 'you unliked the article';
    ArticleLikes
      .findOrCreate({
        where: {
          userId: req.currentUser.id,
          articleId: Number(req.params.articleId)
        },
        defaults: {
          like,
          dislike
        }
      })
      .spread((data, created) => {
        if (!created) {
          data.like = like;
          data.dislike = dislike;
          data.save().catch(err => res.status(500).jsend.error({
            message: 'Request could not be processed',
            error: err.message
          }));
        }
        return res.status(200).jsend.success({ data, message });
      }).catch(() => res.status(401).jsend.fail({
        message: 'Article not found'
      }));
  },

  /**
   * @description Reports a defaulting article
   * @param  {object} req The request object
   * @param  {object} res The response object
   * @return {object} The response object
   */
  reportArticle: (req, res) => {
    Cases.findOrCreate({
      where: {
        userId: req.currentUser.id,
        articleId: req.params.articleId
      },
      defaults: {
        userId: req.currentUser.id,
        articleId: req.params.articleId,
        violation: req.body.violation,
        description: req.body.description || ''
      }
    }).spread((user, created) => {
      if (!created) {
        return res.status(409).jsend.fail({
          message: 'You have reported this article already'
        });
      }

      return res.status(201).jsend.success({
        message: 'This case has been recorded and will be reviewed'
      });
    });
  },

  /**
   * @description Rate an article and adjust records
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @returns {object} Undefined
   */
  rateArticle: (req, res) => {
    // Find or create a rating by current user on specified article
    Ratings.findOrCreate({
      where: {
        articleId: req.params.articleId,
        userId: req.currentUser.id
      },
      defaults: {
        articleId: req.params.articleId,
        userId: req.currentUser.id,
        rating: req.body.rating
      }
    }).spread((record, created) => {
      // If rating already exists, edit it
      if (!created) {
        record.rating = req.body.rating;
        record.save().then(() => {
          analyseRatings(req, res);
        })
          .catch((err) => {
            res.status(500).jsend.error({
              message: err
            });
          });
      } else {
        // Get all ratings on specified article
        analyseRatings(req, res);
      }
    });
  }
};

export default articlesController;
