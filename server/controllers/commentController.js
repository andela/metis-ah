import validator from 'validator';
import models from '../models/index';

const { Users, Comments } = models;

const commentsController = {
  addComment: (req, res) => {
    const { articleId } = req.params;
    const { content } = req.body;
    const userId = req.currentUser.id;

    const userComment = {
      content: validator.escape(content.trim()),
      articleId: validator.escape(articleId),
      userId
    };

    Comments
      .create(userComment)
      .then(comment => Users.findById(userId, {
        attributes: ['id', 'username', 'firstname', 'lastname', 'createdAt', 'updatedAt']
      })
        .then(user => res.status(201).jsend.success({ user, comment })))
      .catch(error => res.status(500).jsend.error({
        message: 'There was a problem processing your request',
        error
      }));
  }
};

export default commentsController;
