const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/ApiRoutes');
const cors = require('cors');
const PORT = process.env.PORT || 4000;
dotenv.config();

mongoose
	.connect(process.env.MONGODB_URI || 'mongodb://localhost/GoogleBooks', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then((db) => console.log('DB is connected'));

app.use(express.json());
app.use(cors());
app.use('/app', routesUrls);

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "./client/index.html"));
//   });

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
