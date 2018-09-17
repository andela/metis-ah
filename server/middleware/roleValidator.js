const roleValidator = {
  validateAdmin: (req, res, next) => {
    if (req.currentUser.roleId !== 1) {
      return res.status(401).jsend.fail({
        message: 'Only an admin can access this resource'
      });
    }

    return next();
  },
};

export default roleValidator;
