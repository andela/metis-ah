import models from '../models/index';
import liker from '../helpers/liker';

const { CommentLikes, ReplyLikes } = models;

const likeController = (req, res) => {
  const { id, type } = req.body;
  const userId = req.currentUser.id;

  // If like is meant for comment
  if (type === 'comment') {
    const likeData = { commentId: id, userId };
    return liker(CommentLikes, res, likeData, 'Comment');
  }

  // This executes if like is for a reply comment
  const likeData = { replyId: id, userId };
  return liker(ReplyLikes, res, likeData, 'Reply');
};

export default likeController;
