import models from '../models/index';

const { ReadingStatistics } = models;

const saveStats = (req, articleId) => {
  const userId = req.currentUser.id;

  ReadingStatistics.findOrCreate({
    where: {
      articleId,
      userId
    },
    defaults: {
      articleId,
      userId
    }
  }).spread(() => true);
};

export default saveStats;
