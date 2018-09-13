import models from '../models';

const {
  Cases
} = models;

const caseController = {
  /**
   * @description Gets all the cases on an article
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @returns {object} The HTTP response object
   */
  getCases: (req, res) => {
    Cases.findAll().then((cases) => {
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
