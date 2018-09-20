import models from '../models';

const { Users } = models;
/**
 * @description This method calculates the read of an article
 * @param  {integer} userId The id of the user getting the article
 * @param  {object} article The article object
 * @returns {string} read time of an article
 */
const readTime = async (userId, article) => {
  // Number of words in the article
  const { noOfWords } = article.dataValues;
  const user = await Users.findOne({ where: { id: userId } });
  // number of words user can read per minute
  const { wordsPerMinute } = user.dataValues;
  const time = Math.ceil(noOfWords / wordsPerMinute);
  return `${time} min read`;
};

export default readTime;
