import { Op } from 'sequelize';


const statsParamsValidations = (req, res, next) => {
  const { q } = req.query;
  const week = 7 * 24 * 60 * 60 * 1000;
  const month = 30 * 24 * 60 * 60 * 1000;


  switch (q) {
    case 'week':
      req.statsQuery = {
        userId: req.currentUser.id,
        createdAt: { [Op.between]: [new Date(new Date() - week), new Date()] },
      };
      next();
      break;
    case 'month':
      req.statsQuery = {
        userId: req.currentUser.id,
        createdAt: { [Op.between]: [new Date(new Date() - month), new Date()] },
      };
      next();
      break;
    case 'all':
      req.statsQuery = {
        userId: req.currentUser.id
      };
      next();
      break;
    case undefined:
      req.statsQuery = {
        userId: req.currentUser.id
      };
      next();
      break;
    default:
      return res.status('400').jsend.fail({
        message: 'Invalid Query value. Expects q to equal (week|month|all)'
      });
  }
};

export default statsParamsValidations;
