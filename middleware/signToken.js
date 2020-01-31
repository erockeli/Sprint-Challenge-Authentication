const jwt = require('jsonwebtoken');
const secret = require('../secrets/secrets');

module.exports = function signToken(user) {
	const payload = {
		username: user.username
	};

	const options = {
		expiresIn: '1hr'
	};

	return jwt.sign(payload, secret.jwtSecret, options);
};