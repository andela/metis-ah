import helper from '../helpers/helpers';

const middlewares = {
  /** @description This method helps validate a user signups
   * @param  {object} req The request object
   * @param  {object} res The response object
   * @param  {object} next the next middleware
	 * @returns {object} undefined
   */
  validateSignUp: (req, res, next) => {
    let status = 'success';
    let message = '';

    // Validate the email address provided
    if (!helper.validEmail(req.body.email).valid) {
      status = 'fail';
      message += 'Invalid email provided\n';
    }

    // Validate the password provided
    if (!helper.validPassword(req.body.password).valid) {
      status = 'fail';
      message += `${helper.validPassword(req.body.password).message}\n`;
    }

    // validate the firstname;
    if (!helper.validString(req.body.firstname).valid) {
      status = 'fail';
      message += 'Firstname cannot be an empty string';
    }

    // validate the lastname
    if (!helper.validString(req.body.lastname).valid) {
      status = 'fail';
      message += 'Lastname cannot be an empty string';
    }

    if (status === 'fail') {
      res.status(400)
        .json({
          status,
          message
        });
    } else {
      next();
    }
  }
};

export default middlewares;
