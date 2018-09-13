import { Op } from 'sequelize';
import slug from 'slug';
import uuid from 'uuid-random';
import ratingHelpers from '../helpers/ratingHelpers';
import helpers from '../helpers/helpers';
import models from '../models';
import { dataUri } from '../config/multer/multerConfig';
import imageUpload from '../helpers/imageUpload';
import tagManager from '../helpers/tagManager';
import getBeginningOfWeek from '../helpers/getBeginningOfWeek';
import GetAuthorsOfTheWeekHelpers from '../helpers/GetAuthorsOfTheWeekHelpers';

const { gte } = Op;
const {
  Cases,
  Articles,
  Ratings,
  ArticleLikes,
  Tags,
  Categories,
  Bookmarks
} = models;
const { analyseRatings } = ratingHelpers;

const {
  getArticlesAndLikesCountForTheWeek, getPopularArticles
} = GetAuthorsOfTheWeekHelpers;

const { parsedId } = helpers;
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
    }).then((createdArticle) => {
      // checks if tags exist
      const tags = !fields.tags || fields.tags === ''
        ? []
        : fields.tags.replace(/\s+/g, '').split(',');

      tagManager.createTag(res, tags, Tags, createdArticle);
      return res.status(201).jsend.success({
        article: createdArticle,
        tags,
        message: 'Article published successfully'
      });
    }).catch(err => res.status(500).jsend.fail({
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
    const liked = req.params.likeType === 'like';
    const disliked = req.params.likeType === 'dislike';
    // message to be sent to user depending on function performed
    const message = liked || disliked ? `you ${req.params.likeType}d the article`
      : 'you unliked the article';
    ArticleLikes
      .findOrCreate({
        where: {
          userId: req.currentUser.id,
          articleId: Number(req.params.articleId)
        },
        defaults: {
          liked,
          disliked
        }
      })
      .spread((data, created) => {
        if (!created) {
          data.like = liked;
          data.dislike = disliked;
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
        // Analyse and recompute average rating on article
        analyseRatings(req, res);
      }
    });
  },
  /**
  * @desc validates article input fields
  * @param  {object} req Http Request object
  * @param  {object} res Http Response object
  * @returns {object} httpResponse object
  */
  getArticles: (req, res) => {
    const queryParams = req.paginationQueryParams;
    // CALCULATE OFFSET
    const offset = ((queryParams.page - 1) * queryParams.limit);
    Articles
      .findAndCountAll({
        offset,
        limit: queryParams.limit
      }).then((result) => {
        const totalPages = Math.ceil(result.count / queryParams.limit);

        return res.status(200).jsend.success({
          message: 'Operation Successful',
          articles: result.rows,
          metadata: {
            totalArticles: result.count,
            currentPage: queryParams.page,
            limit: queryParams.limit,
            totalPages
          }
        });
      });
  },
  /**
  * @desc get Featured Articles
  * @param  {object} req Http Request object
  * @param  {object} res Http Response object
  * @returns {object} httpResponse object
  */
  getFeaturedArticles: (req, res) => {
    const { limit } = req.query;
    const pageLimit = /^[0-9]+$/.test(limit) ? limit : 5;
    const includeOption = [{
      model: Categories,
      as: 'category',
      attributes: ['id', 'name']
    }];

    Articles.findAll({
      include: includeOption,
      where: {
        createdAt: {
          [gte]: getBeginningOfWeek(new Date())
        }
      },
      order: [
        ['rating', 'DESC']
      ],
      limit: pageLimit
    }).then((result) => {
      if (result.length < 5) {
        Articles.findAll({
          include: includeOption,
          order: [
            ['rating', 'DESC'],
            ['createdAt', 'DESC']
          ],
          limit: pageLimit
        }).then(articles => res.status(200).jsend.success({
          messages: 'Operation successful',
          featuredArticles: articles
        }));
      } else {
        return res.status(200).jsend.success({
          messages: 'Operation successful',
          featuredArticles: result
        });
      }
    });
  },
  getPopularArticlesForTheWeek: async (req, res) => {
    try {
      // Get results from the database
      const result = await getArticlesAndLikesCountForTheWeek('popular');
      const articles = getPopularArticles(result); // Get atmost 5 articles

      return res.status(200).jsend.success({ articles });
    } catch (error) {
      return res.status(500).jsend.error(
        'There was an error processing your request'
      );
    }
  },
  /**
   * @method createBookmark
   * @description allows users to book mark an article
   * @param {Object} req the response object
   * @param {Object} res the response object
   * @returns {res} the booked marked articles
   */
  createBookmark: (req, res) => {
    const { title } = req.body;
    const articleId = parsedId(req.params.articleId);
    if (!Number.isInteger(articleId)) {
      return res.status(400).jsend.fail({
        message: 'Article is not valid'
      });
    }
    Bookmarks.findOrCreate({
      where: {
        title,
        userId: req.currentUser.id,
        articleId,
      }
    })
      .spread((bookmark, created) => (!(created)
        ? res.status(400).jsend.fail({ message: 'You have already bookmarked this article' })
        : res.status(201).jsend.success({
          bookmark,
          message: 'Your bookmark has been created successfully'
        })))
      .catch(err => res.status(500).jsend.fail({
        message: 'Something went wrong, please try again',
        error: err.message
      }));
  },

  /**
   * @method fetcBookmark
   * @description allows users to fetch all their bookmarks
   * @param {Object} req the response object
   * @param {Object} res the response object
   * @returns {res} an array of bookmarks
   */
  fetchBookmark: (req, res) => {
    const { id } = req.currentUser;
    Bookmarks.findAll({
      where: {
        userId: id
      }
    })
      .then(bookmarks => ((bookmarks.length === 0)
        ? res.status(404).jsend.fail({
          message: 'You have not bookmarked any article'
        })
        : res.status(200).jsend.success({
          bookmarks
        })));
  },
};

export default articlesController;
