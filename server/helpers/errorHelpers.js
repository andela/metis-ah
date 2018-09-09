const errorHelpers = {
  /**
   * @description Handles 404 errors
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param  {string} item The item not found
   * @returns {object} The response object
   */
  notFound: (req, res, item) => res.status(404).jsend.fail({
    message: `${item} not found`
  })
};

export default errorHelpers;
