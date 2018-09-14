import cloudinary from 'cloudinary';
import slug from 'slug';
import uuid from 'uuid-random';
import cloudinaryConfig from '../config/cloudinary/cloudinaryConfig';
import ratingHelpers from '../helpers/ratingHelpers';
import models from '../models';

const { Articles, Ratings } = models;
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
  create: (req, res) => {
    const { files, fields } = req.articleFormData;
    if (files.image) {
      const temporaryPath = files.image.path;
      // INITIALIZES CLOUDINARY LOCAL CONFIGURATIONS
      cloudinaryConfig();
      // SAVES IMAGE TO CLOUDINARY
      cloudinary.v2.uploader.upload(
        temporaryPath, (error, result) => {
          if (error) {
            return res.status(500).jsend.fail({
              message: 'Something went wrong. Please try again.',
              error: error.message,
              formData: fields,
            });
          }
          // VALIDATE
          // SAVE ARTICLE WITH IMAGE
          Articles.create({
            userId: req.currentUser.id,
            title: fields.title,
            slug: `${slug(fields.title)}-${uuid()}`,
            description: fields.description,
            body: fields.body,
            imageUrl: result.url,
          }).then(createdArticle => res.status(201).jsend.success({
            article: createdArticle,
            message: 'Article published successfully'
          })).catch(err => res.status(500).jsend.fail({
            message: 'Something went wrong. Please try again.',
            error: err.message
          }));
        }
      );
    } else {
      // SAVE ARTICLE WITHOUT IMAGE
      Articles.create({
        userId: req.currentUser.id,
        title: fields.title,
        slug: `${slug(fields.title)}-${uuid()}`,
        description: fields.description,
        body: fields.body
      }).then(createdArticle => res.status(201).jsend.success({
        article: createdArticle,
        message: 'Article published successfully'
      })).catch(err => res.status(500).jsend.fail({
        message: 'Something went wrong. Please try again.',
        error: err.message
      }));
    }
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
