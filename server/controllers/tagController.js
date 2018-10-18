import {
  Op
} from 'sequelize';
import models from '../models';

const { Articles, Tags } = models;

const tagController = {
  all: (req, res) => {
    Tags
      .findAll()
      .then(tags => res.status(200).jsend.success({ tags }))
      .catch(() => res.status(500).jsend.error({ message: 'Your request cannot be completed at the moment. please try again.' }));
  },

  single: (req, res) => {
    Tags
      .findOne({
        where: { name: { [Op.iLike]: `${req.params.tagName}` } },
        include: [{
          model: Articles,
          as: 'articles',
          attributes: ['id', 'title', 'slug'],
          through: {
            attributes: ['createdAt']
          }
        }]
      })
      .then((tag) => {
        if (!tag) {
          return res.status(404).jsend.fail({ message: `tag with name ${req.params.tagName} not found` });
        }
        return res.status(200).jsend.success({ tag });
      })
      .catch(() => res.status(500).jsend.error({ message: 'Your request cannot be completed at the moment. please try again.' }));
  }
};
export default tagController;
