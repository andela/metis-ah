import models from '../models';

const { ReadingStatistics } = models;

const saveStats = (req, articleId) => {
  ReadingStatistics.findOrCreate({
    where: {
      userId: req.currentUser.id,
      articleId,
    },
    defaults: {
      userId: req.currentUser.id,
      articleId
    }
  });
};

export default saveStats;
