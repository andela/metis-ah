import { config } from 'dotenv';
import sgMail from '@sendgrid/mail';

config();
const secret = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(secret);

const url = process.env.BASE_URL;

/**
 * Mailer Event Emitter
 * @exports
 * @class Mailer
 */
export default class Mailer {
  /**
   * Email Transporter
   * @method sender
   * @memberof Mailer
   * @param {string} email
   * @param {string} subject
   * @param {string} message
   * @returns {nothing} returns nothing
   */
  static sender({ to, subject, message }) {
    const msg = {
      to,
      from: 'noreply@metis-ah',
      subject,
      html: message,
    };
    return sgMail.send(msg);
  }

  /**
   * Sends Mail on user registration
   * @method onUserRegistration
   * @memberof Mailer
   * @param {string} username
   * @param {string} email user's email
   * @param {string} token user's token
   * @returns {function} sender
   */
  static onUserRegistration(username, email, token) {
    const message = `
    <div>
        <h3>Hi ${username},</h3>
        <p>Welcome to Author's Haven, we extend our gratitude to
            to have you on our platform, But to activate your account please
            click on this link <br /> 
            <br /> <br /> 
            <a href="${url}/api/verify/${token}"
            style="border: 1px solid light-blue; background-color: blue; padding: 10px;
             color: #fff; border-radius:10px; text-decoration: none" > Verify Account
            <a>
        </p>
  </div>`;
    return Mailer.sender({
      to: email,
      subject: 'Verify user\'s account',
      message
    });
  }

  /**
   * Email Sender helper function
   * @method emailHelperfunc
   * @memberof Mailer
   * @param {*} args
   * @returns {function} sender
   */
  static emailHelperfunc(args) {
    const { email, subject, message } = args;
    return Mailer.sender({
      to: email,
      subject,
      message
    });
  }
}
