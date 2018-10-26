import helpers from '../helpers/helpers';

const {
  checkProps,
  validEmail,
  validPassword,
  validString,
  validUsername
} = helpers;

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
    const {
      valid, invalidMessages
    } = checkProps(req.body, 'username', 'email', 'password');

    if (!valid) {
      return res.status(400)
        .jsend.fail({
          messages: invalidMessages
        });
    }

    // Validate the email address provided
    if (!validEmail(req.body.email)) {
      status = 'fail';
      messages.push('Invalid email provided');
    }

    // Validate the password provided
    if (!validPassword(req.body.password).valid) {
      status = 'fail';
      messages = messages
        .concat(validPassword(req.body.password).invalidMessages);
    }

    // validate the firstName;
    if (!validString(req.body.username)) {
      status = 'fail';
      messages.push('username cannot be an empty string');
    }

    if (validUsername(req.body.username)) {
      status = 'fail';
      messages.push('username cannot contain spaces');
    }

    if (status === 'fail') {
      return res.status(400)
        .jsend.fail({
          messages
        });
    }
    return next();
  },

  /**
   * @description This method helps validate a user on login
   * @param  {object} req The request object
   * @param  {object} res The response object
   * @param  {object} next the next middleware
   * @returns {object} undefined
   */
  validateLogin: (req, res, next) => {
    // Check the passed body for required properties
    const { valid, invalidMessages } = helpers
      .checkProps(req.body, 'email', 'password');

    if (!valid) {
      return res.status(400).jsend.fail({
        messages: invalidMessages
      });
    }
    return next();
  },
  // Validate password on reset
  validateNewPassword: (req, res, next) => {
    let status = 'success';
    let messages = [];

    const { valid, invalidMessages } = checkProps(req.body, 'password');

    if (!valid) {
      return res.status(400)
        .jsend.fail({
          messages: invalidMessages
        });
    }

    if (!validPassword(req.body.password).valid) {
      status = 'fail';
      messages = messages.concat(validPassword(req.body.password).invalidMessages);
    }

    if (status === 'fail') {
      return res.status(400)
        .jsend.fail({
          messages
        });
    }
    return next();
  },
  /**
   * @description This method helps validate body of an add interest request
   * @param  {object} req The request object
   * @param  {object} res The response object
   * @param  {object} next the next middleware
   * @returns {object} undefined
   */
  validInterest: (req, res, next) => {
    // Check that body contains category property
    const { valid, invalidMessages } = checkProps(req.body, 'category');

    if (!valid) {
      return res.status(400).jsend.fail({
        messages: invalidMessages
      });
    }

    const { category } = req.body;

    // Check if category is an array
    if (category.constructor.name !== 'Array') {
      return res.status(400).jsend.fail({
        messages: 'Interests must be an array of category ids'
      });
    }

    // Check if category array is empty
    if (category.length === 0) {
      return res.status(400).jsend.fail({
        messages: 'Category ids array is empty'
      });
    }

    // Check that category array contains only integers
    const isValid = category.every(id => /^[0-9]+$/.test(id));

    if (!isValid) {
      return res.status(400).jsend.fail({
        messages: 'Interests array elements must be integers'
      });
    }

    return next();
  }
};

export default usersValidations;
