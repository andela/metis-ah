import Formidable from 'formidable';
import cloudinary from 'cloudinary';
import slug from 'slug';
import uuid from 'uuid-random';
import { cloudinaryConfig } from '../config/cloudinary/cloudinaryConfig';
import models from '../models/index';

const { Articles } = models;
/**
 * @desc This a controller class that handles
 * containing functions that handles action relating to Articles
 */
class ArticleController {
  /**
   * @desc saves an article to the database
   * @param  {object} req http request object
   * @param  {object} res http response object
   * @returns {res} http response
   */
  static create(req, res) {
    const form = new Formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).jsend.fail({
          message: 'Something, went wrong. please try again'
        });
      } else if (files.path) {
        const temporaryPath = files.image.path;
        cloudinaryConfig();
        // SAVES IMAGE TO CLOUDINARY
        cloudinary.v2.uploader.upload(
          temporaryPath, (error, result) => {
            if (error) {
              res.status(500).jsend.fail({
                message: 'Something, went wrong. please try again',
                formData: fields,
              });
            } else {
              // VALIDATE
            // SAVE ARTICLE WITH IMAGE
              Articles.create({
                title: fields.title,
                slug: `${slug(fields.title)}-${uuid()}`,
                description: fields.description,
                body: fields.body,
                imageUrl: result.url,
              }).then((createdArticle) => {
                res.status(200).jsend.success({
                  article: createdArticle,
                  message: 'Article published successfully',
                });
              }).catch((err) => {
                res.status(500).jsend.fail({
                  message: 'Something, went wrong. please try again',
                  error: err.message,
                });
              });
            }
          }
        );
      } else {
        // SAVE ARTICLE WITHOUT IMAGE
        Articles.create({
          title: fields.title,
          slug: `${slug(fields.title)}-${uuid()}`,
          description: fields.description,
          body: fields.body,
        }).then((createdArticle) => {
          res.status(200).jsend.success({
            article: createdArticle,
            message: 'Article published successfully',
          });
        }).catch((error) => {
          res.status(500).jsend.fail({
            message: 'Something, went wrong. please try again',
            error: error.message,
          });
        });
      }
    });
  }
}

export default ArticleController;
