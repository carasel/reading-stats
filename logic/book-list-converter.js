"use strict";

const xmlParser = require("fast-xml-parser");

module.exports = {
    convertToJson: (bookList) => {
        //TODO convert from goodreads book list xml format to json
        if (xmlParser.validate(bookList)) {
            let jsonBooks = (xmlParser.parse(bookList)).GoodreadsResponse.reviews.review;
            console.log(jsonBooks);
            return jsonBooks;
        } else {
            const errorMessage = "Book list XML was invalid";
            console.error(errorMessage);
            throw(new Error(errorMessage));
        }
    }
};