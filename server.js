const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/ApiRoutes');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
dotenv.config();
//|| 'mongodb://localhost/GoogleBooks'
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then((db) => console.log('DB is connected'));

app.use(express.json());
app.use(cors());
app.use('/app', routesUrls);

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
