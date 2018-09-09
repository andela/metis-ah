import cloudinary from 'cloudinary';
import slug from 'slug';
import uuid from 'uuid-random';
import cloudinaryConfig from '../config/cloudinary/cloudinaryConfig';
import models from '../models/index';

const { Articles } = models;
/**
 * @desc This a controller object literal that handles
 * containing functions that handles action relating to Articles
 */
const articleController = {
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
              message: 'Something, went wrong. please try again',
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
            message: 'Something, went wrong. please try again',
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
        message: 'Something, went wrong. please try again',
        error: err.message
      }));
    }
  }
};

export default articleController;
import jsend from 'jsend';
import models from '../models';

const articlesController = {
  rateArticle: (req, res) => {
    // Input new record in ratings
    // Calculate average and update articles table
  }
};

export default articlesController;
