import GetAuthorsOfTheWeekHelpers from '../helpers/GetAuthorsOfTheWeekHelpers';
import models from '../models';
import helpers from '../helpers/helpers';

const { parsedId } = helpers;
const { Articles } = models;

const {
  getArticlesAndLikesCountForTheWeek, getAuthors
} = GetAuthorsOfTheWeekHelpers;

const authorController = async (req, res) => {
  try {
    // Get results from the database
    const result = await getArticlesAndLikesCountForTheWeek();
    const authors = getAuthors(result); // Get atmost 4 authors

    return res.status(200).jsend.success({ authors });
  } catch (error) {
    return res.status(500).jsend.error(
      'There was an error processing your request'
    );
  }
};

export default authorController;

/**
 * @method getArticlesByAuthorsId
 * @description fetch all users's articles
 * @param {*} req
 * @param {*} res
 * @returns {Object} the a list of articles that the user has created
 */
export const getArticlesByAuthorsId = (req, res) => {
  const authorId = parsedId(req.params.authorId);
  if (!(Number.isInteger(authorId))) {
    return res.status(400).jsend.error({
      message: 'Invalid user details'
    });
  }
  Articles.findAll({
    where: {
      userId: authorId
    }
  })
    .then(articles => ((articles.length > 0)
      ? res.status(200).jsend.success({
        message: 'All articles',
        articles
      })
      : res.status(200).jsend.success({
        message: 'You do not have any article',
        articles: []
      })))
    .catch(err => res.status(500).jsend.error({
      message: err
    }));
};
