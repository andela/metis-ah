import models from '../models';

const { Roles } = models;

const roleController = {
  /**
   * @description Get all roles from the database
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @returns {object} The HTTP response object
   */
  getRoles: (req, res) => {
    Roles.findAll().then(roles => res.status(200).jsend.success({
      roles
    })).catch(() => res.status(500).jsend.error('server side error'));
  },

  /**
   * @description Add a new role to the database
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @returns {object} The HTTP response object
   */
  postRoles: (req, res) => {
    Roles.findOrCreate({
      where: {
        role: req.body.role
      },
      defaults: {
        role: req.body.role,
        permissions: req.body.permissions
      }
    }).spread((role, created) => {
      if (!created) {
        return res.status(409).jsend.fail({
          message: 'Role already exists',
          role: role.dataValues
        });
      }

      return res.status(201).jsend.success({
        message: 'New role created',
        role: role.dataValues
      });
    }).catch();
  },

  /**
   * @description Add a new role to the database
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @returns {object} The HTTP response object
   */
  putRole: (req, res) => {
    Roles.findOne({
      where: {
        role: req.body.role
      }
    }).then((role) => {
      if (!role) {
        return res.status(404).jsend.fail({
          message: 'Role not found'
        });
      }

      let newPermissions = [];
      // Add and remove permissions as requested
      if (role.dataValues) {
        newPermissions = role.dataValues.permissions
          .filter(ele => !req.body.removePermissions.includes(ele));
        role.permissions = newPermissions;

        req.body.addPermissions.forEach((element) => {
          role.permissions.push(element);
        });
      }

      role.save();

      return res.status(200).jsend.success({
        message: 'Role successfully edited',
        role: role.dataValues
      });
    });
  },
};

export default roleController;
