import { Op } from 'sequelize';
import validator from 'validator';
import models from '../models';
import search from '../helpers/search';

const { escape } = validator;
const { getIds, searcher } = search;
const {
  Articles, Users, Tags, Categories, ArticlesTags
} = models;

const searchController = (req, res) => {
  const {
    keyword, author, tag, page
  } = req.query;

  const currentPage = /^[0-9]+$/.test(page) ? page : 1;
  const limit = 10;
  const offset = 10 * (currentPage - 1);
  const order = [['updatedAt', 'DESC']];

  const searchOptions = {
    limit, offset, order
  };

  // Include details from other models
  const include = [
    { model: Users, attributes: ['id', 'firstname', 'lastname', 'image'] },
    { model: Categories, as: 'category', attributes: ['name'] }
  ];

  if (keyword) {
    const queryOptions = {
      where: {
        [Op.or]: {
          title: { [Op.iLike]: `%${escape(keyword)}%` },
          body: { [Op.iLike]: `%${escape(keyword)}%` },
          description: { [Op.iLike]: `%${escape(keyword)}%` }
        }
      },
      include,
      ...searchOptions
    };
    return searcher(res, Articles, queryOptions, currentPage, 'keyword', escape(keyword));
  }

  if (tag) {
    const where = {
      name: {
        [Op.iLike]: `%${escape(tag)}%`
      }
    };

    // returns the list of ids of tags matching the query
    return getIds(Tags, where)
      .then((tagIds) => {
        const queryOptions = {
          where: { tagId: { [Op.in]: tagIds } },
          include: [{
            model: Articles,
            include
          }],
          ...searchOptions
        };
        return searcher(res, ArticlesTags, queryOptions, currentPage, 'tag', escape(tag));
      });
  }

  if (author) {
    const where = {
      [Op.or]: {
        username: { [Op.iLike]: `%${escape(author)}%` },
        firstname: { [Op.iLike]: `%${escape(author)}%` },
        lastname: { [Op.iLike]: `%${escape(author)}%` }
      }
    };

    // returns the list of ids of authors matching the query
    return getIds(Users, where)
      .then((authorIds) => {
        const queryOptions = {
          where: {
            userId: { [Op.in]: authorIds }
          },
          include,
          ...searchOptions
        };
        return searcher(res, Articles, queryOptions, currentPage, 'author', escape(author));
      });
  }

  return res.status(400).jsend.fail({
    message: 'Request not understood. You can search with either a keyword, author or tag'
  });
};

export default searchController;
