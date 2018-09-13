import models from '../models';
import helpers from '../helpers/helpers';

const {
  Cases
} = models;
const { getIntArray } = helpers;

const caseController = {
  /**
   * @description Gets all the cases on an article
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @returns {object} The HTTP response object
   */
  getCases: (req, res) => {
    let searched = {};

    // Check if a query parameter was passed and parse it into an array
    if (req.query.a) {
      const articles = getIntArray(req.query.a);
      searched = {
        articleId: articles
      };
    }

    Cases.findAll({
      where: searched
    }).then((cases) => {
      if (cases.length === 0) {
        return res.status(200).jsend.success({
          cases,
          message: 'There are no cases'
        });
      }

      return res.status(200).jsend.success({
        cases
      });
    }).catch(() => res.status(500).jsend.error('Oops, something has gone wrong'));
  }
};

export default caseController;
