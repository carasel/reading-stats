"use strict";

const xmlParser = require("fast-xml-parser");

module.exports = {
    convertToJson: (bookList) => {
        if (xmlParser.validate(bookList)) {
            return xmlParser.parse(bookList).GoodreadsResponse.reviews.review;
        } else {
            const errorMessage = "Book list XML was invalid";
            console.error(errorMessage);
            throw(new Error(errorMessage));
        }
    }
};