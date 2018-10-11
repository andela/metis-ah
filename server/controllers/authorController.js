import GetAuthorsOfTheWeekHelpers from '../helpers/GetAuthorsOfTheWeekHelpers';

const {
  getArticlesAndLikesCountForTheWeek, getAuthors
} = GetAuthorsOfTheWeekHelpers;

const authorController = async (req, res) => {
  try {
    // Get results from the database
    const result = await getArticlesAndLikesCountForTheWeek();
    const authors = getAuthors(result); // Get atmost 4 authors

    return res.status(200).jsend.success({ authors });
  } catch (error) {
    return res.status(500).jsend.error(
      'There was an error processing your request'
    );
  }
};

export default authorController;
