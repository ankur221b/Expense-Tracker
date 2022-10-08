const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

exports.signup = async (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);
	const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);

	const user = new User({
		username: username,
		email: email,
		password: hashedPassword,
		token,
	});

	const userAlreadyExist = await checkuserAlreadyExist(user);

	if (userAlreadyExist) {
		res.send('user already exist');
	} else {
		user.save()
			.then((e) => {
				res.send('ok');
			})
			.catch((error) => {
				res.send('error occured');
			});
	}
};

exports.login = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const user = {
		email: email,
	};

	const response = await User.findOne(user).exec();
	if (response == null) {
		return res.send('user does not exist');
	}
	const isValid = bcrypt.compareSync(password, response.password);
	if (isValid) {
		return res.json({
			isValid: isValid,
			username: response.username,
			email: response.email,
		});
	} else {
		return res.json({
			isValid: isValid,
		});
	}
};

const checkuserAlreadyExist = async (user) => {
	const response = await User.findOne({ email: user.email }).exec();
	return response != null;
};
