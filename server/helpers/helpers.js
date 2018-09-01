import validator from 'validator';

const helpers = {
  /**
   * @description This method helps validate passwords.
   * @param  {string} password The password you are trying to validate
   * @returns {object} Contains valid (bool) and message (string)
   */
  validPassword: (password) => {
    // Check that length is greater or equal to 8
    if (password.trim().length < 8) {
      return {
        valid: false,
        message: 'Password should be more than 8 characters'
      };
    }

    // Check that at least one character is upper or lowercase
    if (/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      return {
        valid: true,
        message: 'Password is valid'
      };
    }

    return {
      valid: false,
      message: 'Password must include at least one uppercase and lowercase character'
    };
  },

  /**
   * @description This method checks if the string passed is a valid email.
   * @param  {string} email The email address to be validated
   * @returns {boolean} A boolean representing if the email is valid or not
   */
  validEmail: (email) => {
    if (!validator.isEmail(email.trim())) {
      return false;
    }

    return true;
  },

  /**
   * @description This method checks if the string passed is a valid.
   * @param  {string} bar The string to be checked
   * @returns {boolean} A boolean representing if the string is valid or not
   */
  validString: (bar) => {
    if (bar.trim().length === 0) {
      return false;
    }

    return true;
  },

  /**
   * @description This method checks if an object contains a number of properties
   * @param  {object} obj The object to be searched
   * @param  {array} params The list of properties to be searched for
   * @returns {object} An object that contains a valid (bool) and invalidMessage (string) property
   */
  checkProps: (obj, ...params) => {
    let valid = true;
    let invalidMessage = '';

    for (let i = 0; i < params.length; i += 1) {
      if (!obj[params[i]]) {
        valid = false;
        invalidMessage += `Please provide ${params[i]}\n`;
      }
    }

    return {
      valid,
      invalidMessage
    };
  }
};

export default helpers;
