const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: String,
    },
    availability: {
        type: String,
    },
	rating:{
		type: String,
	}
});


const Book = mongoose.model('Book', bookSchema);
module.exports = Book;