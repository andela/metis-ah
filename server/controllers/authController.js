import generateToken from '../helpers/generateToken';

const authController = {
  /**
   * @description This methods handles successful authentication
   * @param  {object} req The request object
   * @param  {object} res The response object
   * @returns {object} The response object
   */
  returnUser: (req, res) => {
    const token = generateToken(req.user.id, 7200);
    req.user.token = token;

    if (req.user.created) {
      return res.status(201).jsend.success(req.user);
    }
    return res.status(200).jsend.success(req.user);
  },

  /**
   * @description This method handles authentication failures
   * @param  {object} req The request object
   * @param  {object} res The response object
   * @returns {object} The response object
   */
  returnError: (req, res) => res.status(400).jsend.fail({
    message: 'User could not be authenticated'
  })
};

export default authController;
