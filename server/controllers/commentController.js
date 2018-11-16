import validator from 'validator';
import models from '../models/index';
import commentHelpers from '../helpers/commentHelpers';

const { escape } = validator;
const {
  Comments, Replies, CommentHistory, ReplyHistory, Users
} = models;
const { commenter, updater } = commentHelpers;

const commentsController = {
  getComments: (req, res) => {
    const { articleId } = req.params;
    const queryParams = req.paginationQueryParams;
    // CALCULATE OFFSET
    const offset = ((queryParams.page - 1) * queryParams.limit);
    Comments
      .findAndCountAll({
        where: {
          articleId
        },
        order: [
          ['createdAt', 'DESC']
        ],
        include: [
          {
            model: Users,
            as: 'user',
            attributes: ['id', 'username', 'firstname', 'lastname', 'image'],
          }
        ],
        offset,
        limit: queryParams.limit
      }).then((result) => {
        const totalPages = Math.ceil(result.count / queryParams.limit);

        return res.status(200).jsend.success({
          message: 'Operation Successful',
          comments: result.rows,
          metadata: {
            totalComments: result.count,
            currentPage: queryParams.page,
            limit: queryParams.limit,
            totalPages
          }
        });
      }).catch(error => res.status(500).jsend.fail({
        message: 'Something went wrong, unable to process request',
        error: error.message
      }));
  },
  addComment: (req, res) => {
    const { articleId, commentId } = req.params;
    const { content } = req.body;
    const userId = req.currentUser.id;

    const userComment = {
      content: escape(content.trim()),
      userId
    };

    if (commentId) {
      userComment.commentId = escape(commentId);
      return commenter(res, Replies, ReplyHistory, userComment, 'Reply', req, articleId);
    }

    userComment.articleId = escape(articleId);
    return commenter(res, Comments, CommentHistory, userComment, 'Comment', req, articleId);
  },
  updateComment: (req, res) => {
    const reqData = {
      content: escape(req.body.content),
      commentId: escape(req.params.commentId)
    };

    return updater(res, Comments, CommentHistory, reqData, 'Comment');
  },
  updateReply: (req, res) => {
    const reqData = {
      replyId: escape(req.params.replyId),
      content: escape(req.body.content)
    };

    return updater(res, Replies, ReplyHistory, reqData, 'Reply');
  }
};

export default commentsController;
