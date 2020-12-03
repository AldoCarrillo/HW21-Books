const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/ApiRoutes');
const cors = require('cors');

dotenv.config();

//mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('DataBase Connected'));

mongoose
	.connect('mongodb://localhost/GoogleBooks', {
		userCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: false
	})
	.then((db) => console.log('DB is connected'));

app.use(express.json());
app.use(cors());
app.use('/app', routesUrls);

app.listen(4000, () => console.log('Server is Running'));
