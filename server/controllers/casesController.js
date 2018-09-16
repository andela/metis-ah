import models from '../models';
import helpers from '../helpers/helpers';
import errorHelpers from '../helpers/errorHelpers';

const {
  Cases,
  Users,
  Articles
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
      where: searched,
      include: [{
        model: Users,
        attributes: ['id', 'email', 'username', 'image']
      }, {
        model: Articles,
        attributes: ['id', 'title']
      }]
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
  },

  resolveCase: (req, res) => {
    Cases.findById(req.params.caseId).then((record) => {
      if (!record) {
        return errorHelpers.notFound(req, res, 'Case');
      }

      record.resolved = true;
      record.save();
      return res.status(200).jsend.success({
        message: 'Case resolved'
      });
    }).catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the serve'));
  }
};

export default caseController;
