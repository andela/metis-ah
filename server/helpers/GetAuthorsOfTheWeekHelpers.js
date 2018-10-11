import { fn, col, Op } from 'sequelize';
import models from '../models';

const { Articles, Users, ArticleLikes } = models;

const GetAuthorsOfTheWeekHelpers = {
  getThisWeekSunday: (date) => {
    const today = new Date(date);
    const todaysDay = today.getDay();
    const todaysDate = today.getDate();
    return new Date(today.setDate(todaysDate - todaysDay)).getTime();
  },
  getArticlesAndLikesCountForTheWeek: () => {
    const { getThisWeekSunday } = GetAuthorsOfTheWeekHelpers;
    const today = new Date();

    return Articles.findAll({
      attributes: ['id', 'userId', [fn('count', col('articleLikes.liked')), 'likesCount']],
      include: [
        {
          model: ArticleLikes,
          as: 'articleLikes',
          attributes: []
        },
        {
          model: Users,
          attributes: ['firstname', 'lastname', 'image']
        },
      ],
      where: { createdAt: { [Op.gte]: getThisWeekSunday(today) } },
      group: ['Articles.id', 'User.id'],
      order: [[col('likesCount'), 'DESC']]
    });
  },
  getAuthors: (result) => {
    const authors = [];
    const trackAuthors = []; // array to track unique authors

    const selectAuthors = (eachResult) => {
      if (authors.length === 4) return false;

      const {
        id, likesCount, userId, User: { firstname, lastname, image }
      } = eachResult.dataValues;

      // Check if author of the article has already been selected
      if (trackAuthors.indexOf(userId) === -1) {
        // Add user to userArray
        trackAuthors.push(userId);

        const newResultObject = {
          id, likesCount, userId, firstname, lastname, image
        };

        // Add unique results to newArray
        authors.push(newResultObject);
      }
      return true;
    };

    // Extract first 4 details and push to new array
    result.every(selectAuthors);
    return authors;
  }
};

export default GetAuthorsOfTheWeekHelpers;
