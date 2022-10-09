const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	token: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

//encrypt password before save
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	const salt = bcrypt.genSaltSync(10);
	this.password = await bcrypt.hashSync(this.password, salt);
});

//validate the password with passed on user password
userSchema.methods.IsValidatedPassword = async function (usersendPassword) {
	return await bcrypt.compare(usersendPassword, this.password);
};

//create and return jwt token
userSchema.methods.getJwtToken = async function () {
	return await jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRY,
	});
};

module.exports = mongoose.model('User', userSchema);
