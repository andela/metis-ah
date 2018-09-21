import validator from 'validator';
import models from '../models/index';
import commentHelpers from '../helpers/commentHelpers';

const { escape } = validator;
const {
  Comments, Replies, CommentHistory, ReplyHistory
} = models;
const { commenter, updater } = commentHelpers;

const commentsController = {
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
      return commenter(res, Replies, ReplyHistory, userComment, 'Reply');
    }

    userComment.articleId = escape(articleId);
    return commenter(res, Comments, CommentHistory, userComment, 'Comment');
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
