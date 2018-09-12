import validator from 'validator';
import model from '../models/index';

const { Users } = model;

const helpers = {
  /**
   * @description This method helps validate passwords.
   * @param  {string} password The password you are trying to validate
   * @returns {object} Contains valid (bool) and invalidMessages (array[strings])
   */
  validPassword: (password) => {
    let valid = true;
    const invalidMessages = [];
    // Check that length is greater or equal to 8
    if (password.trim().length < 8) {
      valid = false;
      invalidMessages.push('Password should be more than 8 characters');
    }

    // Check that at least one character is upper or lowercase
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      valid = false;
      invalidMessages.push('Password must include at least one uppercase and lowercase character');
    }

    return {
      valid,
      invalidMessages
    };
  },

  /**
   * @description This method checks if the string passed is a valid email.
   * @param  {string} email The email address to be validated
   * @returns {boolean} A boolean representing if the email is valid or not
   */
  validEmail: email => validator.isEmail(email.trim()),

  /**
   * @description This method checks if the string passed is a valid.
   * @param  {string} bar The string to be checked
   * @returns {boolean} A boolean representing if the string is valid or not
   */
  validString: bar => bar.trim().length > 0,

  /**
   * @description This method checks if an object contains a number of properties
   * @param  {object} obj The object to be searched
   * @param  {array} params The list of properties to be searched for
   * @returns {object} An object that contains a valid (bool) and invalidMessages (array) property
   */
  checkProps: (obj, ...params) => {
    let valid = true;
    const invalidMessages = [];

    params.forEach((property) => {
      if (!obj[property]) {
        valid = false;
        invalidMessages.push(`Please provide ${property}`);
      }
    });

    return {
      valid,
      invalidMessages
    };
  },

  /**
   * @description This is the callback function for google's authentication
   * @param  {string} accessToken The access token passed by google
   * @param  {string} refreshToken The refresh token passed by google
   * @param  {object} profile The returned profile information
   * @param  {function} done The next function
   * @returns {object} undefined
   */
  googlesCallback: (accessToken, refreshToken, profile, done) => {
    Users.findOrCreate({
      where: {
        email: profile.emails[0].value
      },
      defaults: {
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile.emails[0].value,
        username: profile.emails[0].value
      }
    }).spread((user, created) => {
      const {
        id,
        firstname,
        lastname,
        email
      } = user.dataValues;
      return done(null, {
        id,
        firstname,
        lastname,
        email,
        created
      });
    });
  },

  /**
   * @description This is the callback function for facebook's authentication
   * @param  {string} accessToken The access token passed by facebook
   * @param  {string} refreshToken The refresh token passed by facebook
   * @param  {object} profile The returned profile information
   * @param  {function} done The next function
   * @returns {object} undefined
   */
  facebookCallback: (accessToken, refreshToken, profile, done) => {
    Users.findOrCreate({
      where: {
        email: profile.emails[0].value
      },
      defaults: {
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile.emails[0].value,
        username: profile.emails[0].value
      }
    }).spread((user, created) => {
      const {
        id,
        firstname,
        lastname,
        email
      } = user.dataValues;
      return done(null, {
        id,
        firstname,
        lastname,
        email,
        created
      });
    });
  },
  parsedId: id => ((!(/^\d+$/.test(id))) ? NaN : parseInt(id, 10)),
};

export default helpers;
