import models from '../models';

const { Ratings, Articles } = models;

const ratingHelper = {
  /**
 * @description Saves the new average article rating to the database
 * @param  {object} req The HTTP request object
 * @param  {number} sum The sum of all the ratings for the article
 * @param  {number} count The number of ratings
 * @param  {object} res The HTTP response object
 * @returns {object} Error object if any
 */
  editArticleRating: (req, sum, count, res) => {
    Articles.findOne({
      where: {
        id: req.params.articleId
      }
    }).then((article) => {
      article.rating = Math.floor(sum / count);
      article.save().catch(err => res.status(500).jsend.error({
        message: err
      }));
    });
  },

  /**
 * @description Computes the new average rating
 * @param  {Array} ratings An array of rating records
 * @param  {object} req The HTTP request object
 * @param  {object} res The HTTP response object
 * @returns {object} The HTTP response object
 */
  computeNewAverage: (ratings, req, res) => {
    const count = ratings.length;
    let sum = 0;

    // Compute the sum of ratings
    ratings.forEach((element) => {
      sum += element.dataValues.rating;
    });

    // Edit the articles rating column
    ratingHelper.editArticleRating(req, sum, count, res);

    Ratings.findOne({
      where: {
        articleId: req.params.articleId,
        userId: req.currentUser.id
      }
    })
      .then((rating) => {
        if (rating) {
          return res.status(201).jsend.success({
            averageRating: Math.floor(sum / count),
            userRating: rating
          });
        }
      });
  },

  /**
 * @description Analyses the ratings for the article
 * @param  {object} req The HTTP request object
 * @param  {object} res The HTTP response object
 * @returns {object} The HTTP response object
 */
  analyseRatings: (req, res) => {
    Ratings.findAll({
      where: {
        articleId: req.params.articleId
      }
    }).then(ratings => ratingHelper.computeNewAverage(ratings, req, res));
  }
};

export default ratingHelper;
