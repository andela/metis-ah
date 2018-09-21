/**
 * @desc An Object literal containing middleware methods for validating inputs from users
 */
const inputValidator = {
  /**
   * @param  {object} req Http Request object
   * @param  {object} res Http Response object
   * @param  {function} next Calls the next middleware
   * @returns  {object} undefined
   */
  validateArticle: (req, res, next) => {
    // REQUIRED FIELDS
    const inputData = {
      title: req.body.title,
      description: req.body.description,
      body: req.body.body
    };

    const fieldErrors = {};
    let isValidData = true;

    Object.entries(inputData).forEach((field) => {
      const [fieldName, fieldData] = field;
      // CHECKS WHETHER THE REQUIRE FIELDS ARE STRING AND ARE NOT EMPTY
      if (typeof fieldData === 'string') {
        if (fieldData.trim() === '') {
          fieldErrors[fieldName] = `${fieldName} is required`;
          isValidData = false;
        } else {
          return true;
        }
      } else {
        fieldErrors[fieldName] = `${fieldName} is required`;
        isValidData = false;
      }
    });

    if (!isValidData) {
      return res.status(400).jsend.fail({
        message: 'You submitted Invalid Data!',
        postedData: req.body,
        error: fieldErrors,
      });
    }
    return next();
  }
};

export default inputValidator;
