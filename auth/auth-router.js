const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');
const signToken = require('../middleware/signToken');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;

	Users.add(user)
		.then(saved => {
			res.status(201).json(saved);
		})
		.catch(err => {
			console.log('Error registering new user.', err);
			res.status(500).json({ error: 'Error registering new user.' });
		});
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				// sign token
				const token = signToken(user);

				// send token
				res.status(200).json({
					token,
					message: `Well, howdy do ${user.username}!`
				});
			} else {
				res
					.status(401)
					.json({ message: 'The jokes on you, you shall not pass!' });
			}
		})
		.catch(err => {
			console.log('Error with login', err);
			res.status(500).json({ error: 'Error with login' });
		});
});

module.exports = router;
