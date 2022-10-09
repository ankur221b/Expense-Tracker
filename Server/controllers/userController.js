const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.signup = async (req, res) => {
	const { username, email, password } = req.body;
	const userFromDB = await User.findOne({ email }).exec();
	if (userFromDB != null) {
		return res.status(200).json({
			success: false,
			message: 'Email already exist',
		});
	}
	const user = await User.create({
		username,
		email,
		password,
	});

	const token = await user.getJwtToken();
	const options = {
		expires: Date.now() + process.env.COOKIE_TOKEN * 24 * 60 * 60 * 1000,
		httpOnly: true,
	};

	await user.save();
	user.password = undefined;
	res.status(200).cookie('token', token, options).json({
		success: true,
		token,
		user,
	});
};

exports.login = async (req, res) => {
	const { email, password } = req.body;

	const userFromDB = await User.findOne({ email }).exec();

	if (userFromDB == null) {
		return res.status(200).json({
			success: false,
			message: 'Incorrect credentials',
		});
	}

	const user = await User.create(userFromDB);
	const isValid = await user.IsValidatedPassword(password);

	if (isValid) {
		console.log(`user validated`);
		return res.status(200).json({
			success: true,
			username: user.username,
			email: user.email,
		});
	} else {
		console.log(`user not validated`);
		return res.status(200).json({
			success: false,
			message: 'Incorrect credentials',
		});
	}
};

const checkuserAlreadyExist = async (user) => {
	const response = await User.findOne({ email: user.email }).exec();
	return response != null;
};
