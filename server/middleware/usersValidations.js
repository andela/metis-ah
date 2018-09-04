import helper from '../helpers/helpers';

const usersValidations = {
  /** @description This method helps validate a user signups
   * @param  {object} req The request object
   * @param  {object} res The response object
   * @param  {object} next the next middleware
	 * @returns {object} undefined
   */
  validateSignUp: (req, res, next) => {
    let status = 'success';
    let messages = [];

    // Check the passed body for required properties
    const { valid, invalidMessages } = helper
      .checkProps(req.body, 'firstname', 'lastname', 'email', 'password');

    if (!valid) {
      return res.status(400)
        .json({
          status: 'fail',
          messages: invalidMessages
        });
    }

    // Validate the email address provided
    if (!helper.validEmail(req.body.email)) {
      status = 'fail';
      messages.push('Invalid email provided');
    }


    // Validate the password provided
    if (!helper.validPassword(req.body.password).valid) {
      status = 'fail';
      messages = messages.concat(helper.validPassword(req.body.password).invalidMessages);
    }

    // validate the firstname;
    if (!helper.validString(req.body.firstname)) {
      status = 'fail';
      messages.push('Firstname cannot be an empty string');
    }

    // validate the lastname
    if (!helper.validString(req.body.lastname)) {
      status = 'fail';
      messages.push('Lastname cannot be an empty string');
    }

    if (status === 'fail') {
      return res.status(400)
        .json({
          status,
          messages
        });
    }
    return next();
  }
};

export default usersValidations;
