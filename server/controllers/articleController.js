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

import notify from '../helpers/notify';

const { gte } = Op;
const {
  Cases,
  Articles,
  Ratings,
  ArticleLikes,
  Tags,
  Categories,
  Bookmarks,
  SocialShares,
  Users,
  Comments
} = models;

const {
  multiEventNotifications,
  multiNotifications,
} = notify;

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
    let imageUrl = 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1540379606/article-default-image.jpg';
    const user = await Users.findOne({
      where: {
        id: req.currentUser.id
      },
      attributes: ['id', 'firstname', 'lastname', 'username']
    });

    if (!(user.firstname && user.lastname)) {
      return res.status(403).jsend.fail({
        message: 'Hi there, We are so sorry to get in your way this time. As much as we appreciate your willingness to share your ideas on our platform, we equally care about how you are identified here. Therefore, we would like you to update your Firstname and Lastname before publishing an article'
      });
    }

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
      categoryId: parseInt(fields.categoryId, 10),
      imageUrl
    }).then((createdArticle) => {
      // checks if tags exist
      const tags = !fields.tags || fields.tags === ''
        ? []
        : typeof fields.tags === 'string'
          ? fields.tags.replace(/\s+/g, '').split(',')
          : fields.tags;

      tagManager.createTag(res, tags, Tags, createdArticle);
      multiNotifications(res, req, createdArticle);
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
   * @description this function likes, dislikes and resetReaction an article
   * @param  {Object} req the request object
   * @param  {Object} res the response object
   * @returns {Object} json response
   */
  like: (req, res) => {
    // Check the params passed by user to determine what function to be performed
    const liked = req.params.reactionType === 'like';
    const disliked = req.params.reactionType === 'dislike';
    // message to be sent to user depending on function performed
    const message = liked || disliked ? `you ${req.params.reactionType}d the article`
      : 'you have removed the article';
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
          data.liked = liked;
          data.disliked = disliked;
          data.save().catch(err => res.status(500).jsend.error({
            message: 'Request could not be processed',
            error: err.message
          }));
        }
        multiEventNotifications(
          res,
          req,
          Number(req.params.articleId),
          `${req.params.reactionType}d the article: `
        );
        return res.status(200).jsend.success({ data, message });
      }).catch(() => res.status(401).jsend.fail({
        message: 'Article not found'
      }));
  },
  /**
   * @description allows users to check if they've already like an article before
   * @param  {Object} req the request object
   * @param  {Object} res the response object
   * @returns {Object} json response
   */
  getUserReaction: (req, res) => {
    ArticleLikes
      .find({
        where: {
          userId: req.currentUser.id,
          articleId: Number(req.params.articleId)
        }
      }).then((userReaction) => {
        if (!userReaction) {
          return res.status(404).jsend.fail({});
        }
        return res.status(200).jsend.success({
          userReaction
        });
      }).catch(err => res.status(500).jsend.error({
        message: err
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
  /**
   * @description Rate an article and adjust records
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @returns {object} Undefined
   */
  getSingleArticle: async (req, res) => {
    const articleId = Number(req.params.articleId);

    try {
      const article = await Articles.findOne({
        where: {
          id: articleId
        },
        include: [{
          model: Users,
          attributes: ['id', 'image', 'username'],
        }, {
          model: Tags,
          as: 'tags',
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        },
        {
          model: ArticleLikes,
          as: 'articleLikes',
          attributes: ['id', 'liked', 'disliked']
        },
        {
          model: Categories,
          as: 'category',
          attributes: ['name']
        },
        {
          model: Comments,
          as: 'comments',
          attributes: ['id']
        }]
      });

      if (!article) {
        return res.status(404).jsend.fail({
          message: 'Article not found'
        });
      }

      const likes = article.articleLikes.filter(like => like.liked === true).length;
      const dislikes = article.articleLikes.filter(like => like.disliked === true).length;

      const articleData = {
        id: article.id,
        slug: article.slug,
        title: article.title,
        body: article.body,
        description: article.description,
        imageUrl: article.imageUrl,
        rating: article.rating,
        createdDate: article.createdAt,
        updatedDate: article.updatedAt
      };

      const metadata = {
        author: {
          id: article.User.id,
          username: article.User.username,
          imageUrl: article.User.image
        },
        tags: article.tags,
        likes,
        dislikes,
        commentCounts: article.comments.length,
        category: article.category
      };


      return res.status(200).jsend.success({
        message: 'Operation successful',
        articleData,
        metadata
      });
    } catch (error) {
      res.status(500).jsend.fail({
        message: 'Oop!, Something went wrong. Please try again',
        error: error.message
      });
    }
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
  /**
  * @desc share article method
  * @param  {object} req Http Request object
  * @param  {object} res Http Response object
  * @returns {object} httpResponse object
  */
  shareArticle: (req, res) => {
    Articles.findById(Number(req.params.articleId))
      .then((article) => {
        if (!article) {
          return res.status(404).jsend.fail({
            message: 'Article not found',
          });
        }
        SocialShares.create({
          userId: Number(req.currentUser.id),
          articleId: Number(req.params.articleId),
          authorId: article.userId,
          sharedPlatform: req.body.sharedPlatform,
        }).then((socialShare) => {
          res.status(200).jsend.success({
            message: 'Article has been shared',
            socialShare,
          });
        });
      }).catch(err => res.status(500).jsend.error({
        message: 'Request could not be processed',
        error: err.message
      }));
  }
};

export default articlesController;
