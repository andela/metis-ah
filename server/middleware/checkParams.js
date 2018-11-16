const checkParams = {
  /**
 * @description This method validates the params passed in by user for reactionType
 * @param  {object} req The request object
 * @param  {object} res The response object
 * @param {function} next Calls the next middleware
 * @returns  {object} undefined
 */
  reactionType: (req, res, next) => {
    const validParams = ['like', 'remove reaction', 'dislike'];
    if (!validParams.includes(req.params.reactionType.toLowerCase())) {
      return res.status(401).jsend.fail({
        message: 'Invalid reactionType... reactionType has to be - like, dislike or resetReaction'
      });
    }
    return next();
  },
  /**
   * @description This method validates the params passed in by user for id
   * @param  {object} req The request object
   * @param  {object} res The response object
   * @param {function} next Calls the next middleware
   * @returns {object} undefined
   */
  id: (req, res, next) => {
    const { articleId, commentId, replyId } = req.params;
    const numberRegex = /^[0-9]+$/;
    // check articleId if it is passed
    if (articleId) {
      if (!numberRegex.test(articleId)) {
        return res.status(400).jsend.fail({ message: 'Invalid articleId' });
      }
    }

    // if commentId is passed
    if (commentId) {
      if (!numberRegex.test(commentId)) {
        return res.status(400).jsend.fail({ message: 'Invalid commentId' });
      }
    }

    // if replyId is passed
    if (replyId) {
      if (!numberRegex.test(replyId)) {
        return res.status(400).jsend.fail({ message: 'Invalid replyId' });
      }
    }
    return next();
  }
};

export default checkParams;
