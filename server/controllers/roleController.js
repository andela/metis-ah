import models from '../models';

const { Roles, Permissions } = models;

const roleController = {
  getRoles: (req, res) => {
    Roles.findAll({
      include: [{
        model: Permissions,
        as: 'permissions',
        attributes: ['permission']
      }]
    }).then(roles => res.status(200).jsend.success({
      roles
    })).catch(() => res.status(500).jsend.error('server side error'));
  },

  postRoles: (req, res) => {
    Roles.findOrCreate({
      where: {
        role: req.body.role
      },
      defaults: {
        role: req.body.role,
      }
    }).then((role) => {
      
    })
  }
};

export default roleController;
