import Formidable from 'formidable';

/**
 * @desc An Object literal containing middleware methods for validating inputs from users
 */
const inputValidator = {
  /**
   * @param  {object} req Http Request object
   * @param  {object} res Http Response object
   * @param  {function} next Calls the next middleware
   */

  validateArticle: (req, res, next) => {
    const articleForm = new Formidable.IncomingForm();

    // SETTING THE MAX FILE SIZE OF AN IMAGE TO 2MB
    articleForm.maxFileSize = 1.3 * 1024 * 1024;
    // PARSING FORM FOR DATA
    articleForm.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).jsend.fail({
          message: 'Something, went wrong. please try again',
          error: err.message
        });
      }
      // REQUIRED FIELDS
      const inputData = {
        title: fields.title,
        description: fields.description,
        body: fields.body
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

      if (isValidData) {
        req.articleFormData = {
          fields,
          files
        };
        next();
      } else {
        return res.status(400).jsend.fail({
          message: 'You submitted Invalid Data!',
          postedData: fields,
          error: fieldErrors,
        });
      }
    });
  }
};

export default inputValidator;
