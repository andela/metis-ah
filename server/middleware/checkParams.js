const checkParams = {
  /**
 * @description This method validates the params passed in by user for likeType
 * @param  {object} req The request object
 * @param  {object} res The response object
 * @param {function} next Calls the next middleware
 * @returns  {object} undefined
 */
  likeType: (req, res, next) => {
    const validParams = ['like', 'unlike', 'dislike'];
    if (!validParams.includes(req.params.likeType.toLowerCase())) {
      return res.status(401).jsend.fail({
        message: 'Invalid likeType... likeType has to be - like, dislike or unlike'
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
