const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('book', BookSchema);
