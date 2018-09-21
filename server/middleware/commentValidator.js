import helpers from '../helpers/helpers';
import models from '../models';

const { checkProps, validString } = helpers;
const { Comments, Replies } = models;
/**
 * @desc An Object literal containing middleware methods for validating comment inputs from users
 */
const commentValidator = {
  /**
   * @param  {object} req Http Request object
   * @param  {object} res Http Response object
   * @param  {function} next Calls the next middleware
   * @returns  {object} undefined
   */
  validateComments: (req, res, next) => {
    const { content } = req.body;
    const { valid, invalidMessages } = checkProps(req.body, 'content');

    // Check that passed body for required properties and not empty
    if (!valid) {
      return res.status(400).jsend.fail({
        messages: invalidMessages
      });
    }

    // Check that content is a string
    if (typeof content !== 'string') {
      return res.status(400).jsend.fail('Comment must be a string');
    }
    return next();
  },
  /**
   * @description This method helps validates the like object
   * @param  {object} req The request object
   * @param  {object} res The response object
   * @param  {object} next the next middleware
   * @returns {object} undefined
   */
  validateLikeObject: (req, res, next) => {
    let status = 'success';
    const messages = [];
    const numberRegex = /^[0-9]+$/;

    // Check the passed body for required properties
    const { valid, invalidMessages } = checkProps(req.body, 'id', 'type');

    if (!valid) {
      return res.status(400).jsend.fail({
        messages: invalidMessages
      });
    }

    // Validates the id provided
    if (!numberRegex.test(req.body.id)) {
      status = 'fail';
      messages.push('Invalid id');
    }
    // Validate the type provided
    if (!['comment', 'reply'].includes(req.body.type)) {
      status = 'fail';
      messages.push('Type must be either "comment" or "reply"');
    }

    if (status === 'fail') {
      return res.status(400).jsend.fail({ messages });
    }
    return next();
  },
  authorizeCommentUpdate: (req, res, next) => {
    const { commentId, replyId } = req.params;
    const type = replyId ? 'reply' : 'comment';
    const { id } = req.currentUser;

    const reqId = replyId || commentId;
    const model = replyId ? Replies : Comments;

    return model.findById(reqId)
      .then((comment) => {
        if (!comment) {
          return res.status(404).jsend.fail({
            message: `${type} does not exist`
          });
        }

        if (parseInt(id, 10) !== comment.dataValues.userId) {
          return res.status(401).jsend.fail({
            message: `You cannot update this ${type}`
          });
        }
        return next();
      })
      .catch(error => res.status(500).jsend.error({
        message: 'There was a problem processing your request',
        error
      }));
  }
};

export default commentValidator;
