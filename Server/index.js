require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.CONNECTION_STRING, {
	useNewUrlParser: true,
	dbName: 'ExpenseTrackerDB',
});

app.use(userRouter);

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
