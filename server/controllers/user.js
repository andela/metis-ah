const users = {
  /**
	 * @description The signup method
	 * @param  {object} req	The request object
	 * @param  {object} res The response object
	 * @returns {object} json response
	 */
  signUp: (req, res) => res.status(400)
    .json({
      message: 'everything is ok, good to go'
    })
};

export default users;
