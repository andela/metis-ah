import helpers from '../helpers/helpers';
import models from '../models';

const { Highlights } = models;
const { parsedId } = helpers;

const highlightController = {
  /**
   * @method create
   * @description Allows users to highlight an article
   * @param {Object} req - The request object
   * @param {Object} res -  The response object
   * @return {Object} The result from hightlight the article
   */
  create: (req, res) => {
    const { highlightedText, comment, color } = req.body;
    const authorId = parsedId(req.params.authorId);
    const articleId = parsedId(req.params.articleId);
    Highlights.findOrCreate({
      where: {
        highlightedText,
        userId: req.currentUser.id,
        articleId,
        comment,
        color,
        authorId
      }
    })
      .spread((highlight, created) => (!(created) ? res.status(400).jsend.fail({ message: `You have already commented on ${highlightedText}` })
        : res.status(201).jsend.success({
          highlight,
          message: 'Your comment has been saved'
        })))
      .catch(err => res.status(500).jsend.fail({
        message: 'Something went wrong, please try again',
        error: err.message
      }));
  },

  /**
   * @method fetchAll
   * @description All an author to view all highlight on an article
   * @param {Object} req - The request object
   * @param {Object} res -  The response object
   * @returns {Object} All highlights on the article
   */
  fetchAll: (req, res) => {
    const authorId = req.currentUser.id;
    const articleId = parsedId(req.params.articleId);
    Highlights.findAll({
      where: {
        authorId,
        articleId
      }
    }).then(highlights => res.status(200).jsend.success({
      message: 'Highlighted text',
      highlights
    }))
      .catch(err => res.status(500).jsend.fail({
        message: 'Something went wrong, please try again',
        error: err.message
      }));
  },

  /**
   * @method fetchReaderHighlight
   * @description Allows logged in users to view their highlights on an article
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object}  The highlights of the user
   */
  fetchReaderHighlight: (req, res) => {
    const articleId = parsedId(req.params.articleId);
    Highlights.findAll({
      where: {
        userId: req.currentUser.id,
        articleId
      }
    }).then(highlights => res.status(200).jsend.success({
      message: 'Highlighted text',
      highlights
    }))
      .catch(err => res.status(500).jsend.fail({
        message: 'Something went wrong, please try again',
        error: err.message
      }));
  },
  /**
   * @method update
   * @description Allows users to update the comment they've created
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object}  The update highlight of the user
   */
  update: (req, res) => {
    const { comment, color } = req.body;
    const articleId = parsedId(req.params.articleId);
    Highlights.update({ comment, color }, {
      where: {
        userId: req.currentUser.id,
        articleId
      },
    }).then((highlight) => {
      if (highlight) {
        return res.status(200).jsend.success({
          message: 'Your highlight has been updated successfully',
          highlight
        });
      }
    }).catch(err => res.status(500).jsend.fail({
      message: 'Something went wrong, please try again',
      error: err.message
    }));
  },

  /**
   * @method Delete
   * @description Allows users to remove an highlight they've created
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object}  deleted success message
   */
  delete: (req, res) => {
    const authorId = parsedId(req.params.authorId);
    const articleId = parsedId(req.params.articleId);
    Highlights.destroy({
      where: {
        userId: req.currentUser.id || authorId,
        articleId
      }
    }).then(() => res.status(200).jsend.success({
      message: 'Your highlight have been deleted'
    })).catch(err => res.status(500).jsend.fail({
      message: 'Something went wrong, please try again',
      error: err.message
    }));
  }
};

export default highlightController;
