import helpers from '../helpers/helpers';

const { checkProps } = helpers;
const validPermissions = [
  'write',
  'read',
  'like',
  'rate',
  'report',
  'comment',
  'view report',
  'bookmark',
  'follow',
  'view cases',
  'view all users'
];

const roleValidator = {
  /**
   * @description Add a new role to the database
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param {object} next The next middleware
   * @returns {object} The HTTP response object
   */
  validateAdmin: (req, res, next) => {
    if (req.currentUser.roleId !== 1) {
      return res.status(401).jsend.fail({
        message: 'Only an admin can access this resource'
      });
    }

    return next();
  },

  /**
   * @description Checks that the sent object has the required properties
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param {object} next The next middleware
   * @returns {object} The HTTP response object
   */
  checkPostProperties: (req, res, next) => {
    const { valid, invalidMessages } = checkProps(req.body, 'role', 'permissions');
    if (!valid) {
      return res.status(400).jsend.fail({
        messages: invalidMessages
      });
    }

    return next();
  },

  /**
   * @description Checks that the sent object has the required properties
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param {object} next The next middleware
   * @returns {object} The HTTP response object
   */
  checkPutProperties: (req, res, next) => {
    const { valid, invalidMessages } = checkProps(req.body, 'role', 'removePermissions', 'addPermissions');
    if (!valid) {
      return res.status(400).jsend.fail({
        messages: invalidMessages
      });
    }

    return next();
  },

  /**
   * @description Checks the permissions to ensure they are valid
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param {object} next The next middleware
   * @returns {object} The HTTP response object
   */
  validatePostPermissions: (req, res, next) => {
    const invalidPermissions = req.body.permissions
      .filter(element => !validPermissions.includes(element));

    if (invalidPermissions.length > 0) {
      return res.status(400).jsend.fail({
        message: `The following permissions are invalid ${invalidPermissions}`
      });
    }

    return next();
  },

  /**
   * @description Checks the permissions to ensure they are valid
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param {object} next The next middleware
   * @returns {object} The HTTP response object
   */
  validatePutPermissions: (req, res, next) => {
    const invalidPermissions = req.body.addPermissions
      .filter(element => !validPermissions.includes(element));

    req.body.removePermissions.forEach((element) => {
      if (!validPermissions.includes(element)) {
        invalidPermissions.push(element);
      }
    });

    if (invalidPermissions.length > 0) {
      return res.status(400).jsend.fail({
        message: `The following permissions are invalid ${invalidPermissions}`
      });
    }

    return next();
  }
};

export default roleValidator;
