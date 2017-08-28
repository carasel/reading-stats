"use strict";

const xmlParser = require("fast-xml-parser");

module.exports = {
    convertToJson: (bookList) => {
        if (xmlParser.validate(bookList)) {
            const options = {
                attrPrefix : "",
                textNodeName : "#text",
                ignoreNonTextNodeAttr : false,
                ignoreTextNodeAttr : false,
                ignoreNameSpace : false,
                textNodeConversion : true
            };
            return xmlParser.parse(bookList, options).GoodreadsResponse.reviews;
        } else {
            const errorMessage = "Book list XML was invalid";
            console.error(errorMessage);
            throw(new Error(errorMessage));
        }
    }
};