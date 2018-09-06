import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import Cryptr from 'cryptr';
import model from '../models/index';
import mailer from '../helpers/utils/mailer';
import msg from '../helpers/utils/eMsgs';

config();
const secret = process.env.SECRET;

const { Users } = model;
const { verifiedMessage } = msg;
const cryptr = new Cryptr(secret);

const users = {
  /**
	 * @description The signup method
	 * @param  {object} req	The request object
	 * @param  {object} res The response object
	 * @returns {object} json response
	 */
  signUp: (req, res) => {
    Users
      .Create({
        // CREATE USER ACCOUNT GOES HERE
      })
      .then((user) => {
        const token = 'CREATE A TOKEN';

        // YOUR TOKEN IS ENCRYPTED
        const tokenhash = cryptr.encrypt(token);

        // THIS FUNCTION SEND AN EMAIL TO USER FOR VERIFICATION OF ACCOUNT
        mailer.onUserRegistration(/* user.username */ /* user.email */ tokenhash);
      });
  },

  /**
	 * @description This functionality verifies a user's account
	 * @param  {object} req	The request object
	 * @param  {object} res The response object
	 * @returns {object} json response
	 */
  verify: (req, res) => {
    // CREATE A TOKEN
    const token = jwt.sign(
      {
        id: req.currentUser.id,
        isVerified: true
      },
      secret,
      { expiresIn: 7200 },
    );

    // SECURE TOKEN BY ENCRYPTING
    const tokenhash = cryptr.encrypt(token);

    let userEmail;
    Users
      .findById(req.currentUser.id)
      .then((user) => {
        userEmail = user.email;
        if (user.isVerified) {
          return res.status(401).jsend.error({
            message: 'Your account is already verified',
          });
        }
        user
          .update({
            isVerified: true
          })
          .then(() => {
            const verifiedMsg = {
              email: userEmail,
              subject: 'Email successfully verified',
              message: verifiedMessage
            };
            // SENDS EMAIL TO USER ON SUCCESSFUL CONFIRMATION
            mailer.emailHelperfunc(verifiedMsg);
            return res.status(200).jsend.success({
              message: 'Your account is verified successfully',
              token: tokenhash
            });
          })
          .catch(err => res.status(400).jsend.error({ message: err.message }));
      })
      .catch(err => res.status(400).jsend.error({ message: err.message }));
  }
};

export default users;
