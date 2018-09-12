import helpers from '../helpers/helpers';

const { checkProps } = helpers;

const reportValidation = {
  /**
   * @description Validate the violation type passed
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param  {object} next The next middleware
   * @returns {object} The response object or the next middleware
   */
  validateViolation: (req, res, next) => {
    const violations = [
      'Discrimination',
      'Sexual Content',
      'Offensive Language',
      'Plagiarism'
    ];

    // Check if violation specified is allowed
    const found = violations.find(element => element === req.body.violation);

    if (!found) {
      return res.status(400).jsend.fail({
        message: 'Invalid violation. Violation can be [\'Discrimination\', \'Plagiarism\', \'Sexual Content\', \'Offensive Language\']'
      });
    }

    return next();
  },

  /**
   * @description Validate the objects passed in the body
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param  {object} next The next middleware
   * @returns {object} The HTTP response object or the next middleware
   */
  validateRequestObject: (req, res, next) => {
    const { valid, invalidMessages } = checkProps(req.body, 'violation', 'description');

    if (!valid) {
      return res.status(400).jsend.fail({
        messages: invalidMessages
      });
    }

    return next();
  }
};

export default reportValidation;
