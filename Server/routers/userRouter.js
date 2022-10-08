const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

// Login page route.
userRouter.post('/login', userController.login);
// Signup page route.
userRouter.post('/signup', userController.signup);

module.exports = userRouter;
