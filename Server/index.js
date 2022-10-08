const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 4000;
const app = express();
const secretKey = 'ThisisSecretKey';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
	.connect(
		'mongodb+srv://ankur:ankur@dbcluster.0yu0mwc.mongodb.net/?retryWrites=true&w=majority',
		{ useNewUrlParser: true, dbName: 'ExpenseTrackerDB' }
	)
	.then((con) => {});

const newUserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
	},
});

const User = mongoose.model('User', newUserSchema);

app.use('/signup', async (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);
	const token = jwt.sign({ email }, secretKey);

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
});

app.use('/login', async (req, res) => {
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
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

const checkuserAlreadyExist = async (user) => {
	const response = await User.findOne({ email: user.email }).exec();
	return response != null;
};
