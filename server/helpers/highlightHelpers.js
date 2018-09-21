import helpers from './helpers';


const { parsedId } = helpers;

const highlightValidation = {
  authorId: (req, res, next) => {
    const authorId = parsedId(req.params.authorId);
    if (
      !(Number.isInteger(authorId))
    ) {
      return res.status(400).jsend.fail({
        message: 'Your request is not valid'
      });
    }
    return next();
  },
  articleId: (req, res, next) => {
    const articleId = parsedId(req.params.articleId);
    if (
      !(Number.isInteger(articleId))
    ) {
      return res.status(400).jsend.fail({
        message: 'Your request is not valid'
      });
    }
    return next();
  },
  comment: (req, res, next) => {
    const { comment } = req.body;
    if (
      !comment || comment.trim().length < 1
    ) {
      return res.status(400).jsend.fail({
        message: 'Comment is required'
      });
    }
    return next();
  }
};

export default highlightValidation;
