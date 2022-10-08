const express = require('express');
const router = express.Router();

// Login page route.
router.get('/', function (req, res) {
	res.send('Wiki home page');
});

// Signup page route.
router.get('/signup', function (req, res) {
	res.send('About this wiki');
});
