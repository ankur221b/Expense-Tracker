const mongoose = require('mongoose');
const connectWithDB = () => {
	mongoose
		.connect(process.env.CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: process.env.DB_NAME,
		})
		.then(console.log('DB GOT CONNECTED'))
		.catch((error) => {
			console.log('DB CONNECTION ISSUES');
			console.log(error);
			process.exit(1);
		});
};

module.exports = connectWithDB;
