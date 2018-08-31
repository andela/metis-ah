import validator from 'validator';

const helpers = {
  /**
   * @description This method helps validate passwords.
   * @param  {string} password The password you are trying to validate
   * @returns {object} Contains valid (bool) and message (string)
   */
  validPassword: (password) => {
    // Check that length is greater or equal to 8
    if (password.length < 8) {
      return {
        valid: false,
        message: 'Password should be more than 8 characters'
      };
    }

    // Check that at least one character is upper or lowercase
    if (/[A-Z][a-z]/.test(password)) {
      return {
        valid: true,
        message: 'Password is valid'
      }
    }

    return {
      valid: false,
      message: 'Password must include at least one uppercase and lowercase character'
    };
  },

  /**
   * @description This method validates checks if the string passed is a valid email.
   * @param  {string} email The email address to be validated
   * @returns {object} TODO
   */
  validEmail: (email) => {
		if (!validator.isEmail(email)) {
			return {
				valid: false,
				message: 'Invalid email address'
			}
		}

		return {
			valid: true,
			message: 'Email is valid'
		}
  }
};

export default helpers;
