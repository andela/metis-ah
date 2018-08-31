import helper from '../helpers/helpers';

const users = {
	signUp: (req, res) => {
		// Validate the email address provided
		if (!helper.validEmail(req.body.email).valid) {
			return res.status(400)
			.json({
				status: 'fail',
				message: 'Invalid email provided'
			});
		}

		// Validate the password provided
		if (!helper.validPassword(req.body.password).valid) {
			return res.status(400)
			.json({
				status: 'fail',
				message: helper.validPassword(req.body.password).message
			});
		}
	}
};

export default users;
