import generateToken from '../helpers/generateToken';

const authController = {
  /**
   * @description This methods handles successful authentication
   * @param  {object} req The request object
   * @param  {object} res The response object
   * @returns {object} The response object
   */
  returnUser: (req, res) => {
    const token = generateToken(7200, { id: req.user.id, isVerified: true });
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
  returnError: (req, res) => res.status(401).jsend.fail({
    message: 'User could not be authenticated'
  })
};

export default authController;
