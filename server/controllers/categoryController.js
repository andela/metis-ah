import models from '../models';
import {
  dataUri
} from '../config/multer/multerConfig';
import imageUpload from '../helpers/imageUpload';

const {
  Articles,
  Categories,
  Users
} = models;

const categoryController = {
  allCategory: (req, res) => {
    const queryParams = req.paginationQueryParams;
    const offset = ((queryParams.page - 1) * queryParams.limit);
    Categories
      .findAndCountAll({
        attributes: ['id', 'name', 'poster', 'description'],
        offset,
        limit: queryParams.limit,
      })
      .then((categories) => {
        const totalPages = Math.ceil(categories.count / queryParams.limit);

        res.status(200).jsend.success({
          categories: categories.rows,
          metadata: {
            totalCategories: categories.count,
            currentPage: queryParams.page,
            limit: queryParams.limit,
            totalPages
          }
        });
      })
      .catch(() => res.status(500).jsend.error({
        message: 'Your request cannot be completed at the moment. please try again.'
      }));
  },

  singleCategory: (req, res) => {
    const queryParams = req.paginationQueryParams;
    const offset = ((queryParams.page - 1) * queryParams.limit);

    if (Number.isNaN(Number(req.params.categoryId))) {
      return res.status(400).jsend.fail({
        message: 'Your must use a number as Id. please try again.'
      });
    }
    Categories
      .findById(Number(req.params.categoryId), {
        include: [{
          model: Articles,
          as: 'articles',
          offset,
          limit: queryParams.limit,
          include: [{
            model: Users,
            attributes: ['id', 'firstname', 'lastname', 'image', 'username']
          }]
        },
        {
          attributes: ['id'],
          model: Articles,
          as: 'count'
        }
        ]
      })
      .then((category) => {
        if (!category) {
          return res.status(404).jsend.fail({
            message: `Category with id ${req.params.categoryId} not found`
          });
        }
        const totalPages = Math.ceil(category.count.length / queryParams.limit);

        return res.status(200).jsend.success({
          category: {
            id: category.id,
            name: category.name,
            description: category.description,
            poster: category.poster,
            date: category.createdAt
          },
          articles: category.articles,
          metadata: {
            totalArticles: category.count.length,
            currentPage: queryParams.page,
            limit: queryParams.limit,
            totalPages
          }
        });
      })
      .catch(() => res.status(500).jsend.error({
        message: 'Your request cannot be completed at the moment. please try again.'
      }));
  },

  createCategory: async (req, res) => {
    let poster = null;
    if (req.file) {
      const file = dataUri(req);
      // SAVES IMAGE TO CLOUDINARY
      poster = await imageUpload(file, res, res.body);
      poster = poster.url;
    }

    if (!req.body.name || !req.body.description) {
      return res.status(400).jsend.fail({
        message: 'Category must be created with a name and description'
      });
    }
    Categories
      .findOrCreate({
        where: {
          name: req.body.name
        },
        defaults: {
          poster,
          description: req.body.description
        }
      })
      .spread(category => res.status(200).jsend.success({
        message: 'Successfully added category',
        category
      }))
      .catch(() => res.status(500).jsend.fail({
        message: 'Something, went wrong. please try again '
      }));
  },

  updateCategory: async (req, res) => {
    if (Number.isNaN(Number(req.params.categoryId))) {
      return res.status(400).jsend.fail({
        message: 'Your must use a number as Id. please try again.'
      });
    }

    let poster = null;
    if (!req.body.name || !req.body.description) {
      return res.status(400).jsend.fail({
        message: 'Category must be updated with a name and description'
      });
    }
    if (req.file) {
      const file = dataUri(req);
      // SAVES IMAGE TO CLOUDINARY
      poster = await imageUpload(file, res, res.body);
      poster = poster.url;
    }
    Categories
      .update(
        poster
          ? {
            name: req.body.name,
            description: req.body.description,
            poster
          }
          : {
            name: req.body.name,
            description: req.body.description
          }, {
          where: {
            id: req.params.categoryId
          },
          returning: true
        }
      )
      .then((category) => {
        if (category[0] === 0) {
          return res.status(404).jsend.fail({
            message: 'No category with this Id'
          });
        }
        return res.status(200).jsend.success({
          message: 'successfully updated category',
          category: category[1][0]
        });
      })
      .catch((err) => {
        if (err.message === 'Validation error') {
          return res.status(400).jsend.fail({
            message: `Category with ${req.body.name} already exist`
          });
        }
        return res.status(500).jsend.error({
          message: 'Something, went wrong. please try again '
        });
      });
  },

  deleteCategory: (req, res) => {
    if (Number.isNaN(Number(req.params.categoryId))) {
      return res.status(400).jsend.fail({
        message: 'Your must use a number as Id. please try again.'
      });
    }

    Categories
      .destroy({
        where: {
          id: req.params.categoryId
        }
      })
      .then(() => res.status(202).jsend.success({
        message: 'Category has been deleted'
      }))
      .catch(() => res.status(500).jsend.error({
        message: 'Something, went wrong. please try again '
      }));
  }
};
export default categoryController;
