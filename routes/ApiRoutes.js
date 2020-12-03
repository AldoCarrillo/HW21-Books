const express = require('express');
const router = express.Router();

const BookModel = require('../models/bookModel');

router.post('/book', async (req, res) => {
	const newBook = new BookModel({
		id: req.body.id,
		title: req.body.title,
		author: req.body.author,
		description: req.body.description,
		picture: req.body.picture,
		link: req.body.link
	});

	newBook
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			res.json(error);
		});
});

router.get('/books', (req, res) => {
	BookModel.find({})
		.then((books) => {
			res.json(books);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});

router.delete('/bookid', (req, res) => {
	console.log(req.query.id);
	//BookModel.remove({ id: req.query.id });

	BookModel.remove(
		{
			id: req.query.id
		},
		function(err) {
			if (err) res.send(err);
			else res.send('Successfully! Employee has been Deleted.');
		}
	);
});

module.exports = router;
