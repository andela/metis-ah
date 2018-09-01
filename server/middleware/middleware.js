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

    // Check the passed body for required properties
    const { valid, invalidMessage } = helper.checkProps(req.body, 'firstname', 'lastname', 'email', 'password');

    if (!valid) {
      res.status(400)
        .json({
          status: 'fail',
          message: invalidMessage
        });

      return;
    }

    // Validate the email address provided
    if (!helper.validEmail(req.body.email)) {
      status = 'fail';
      message += 'Invalid email provided\n';
    }


    // Validate the password provided
    if (!helper.validPassword(req.body.password).valid) {
      status = 'fail';
      message += `${helper.validPassword(req.body.password).message}\n`;
    }

    // validate the firstname;
    if (!helper.validString(req.body.firstname)) {
      status = 'fail';
      message += 'Firstname cannot be an empty string\n';
    }

    // validate the lastname
    if (!helper.validString(req.body.lastname)) {
      status = 'fail';
      message += 'Lastname cannot be an empty string\n';
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
