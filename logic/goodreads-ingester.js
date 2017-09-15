"use strict";

const request = require("request-promise-native")
    , bookListConverter = require("./../logic/book-list-converter");

const goodreadsParams = {
    "v" : "2",
    "key" : process.env.GOODREADS_KEY
};

const getBooks = function(user, page, allBooks) {
    if(!page) page = 1;
    if(!allBooks) allBooks = [];

    let allBooksParams = goodreadsParams;
    allBooksParams["per_page"] = 100;
    allBooksParams["page"] = page;

    let options = {
        uri : `https://www.goodreads.com/review/list/${user}.xml`,
        qs : allBooksParams
    };

    return request(options)
        .then((response) => {
            const jsonResponse = bookListConverter.convertToJson(response);
            allBooks = allBooks.concat(jsonResponse.review);
            return jsonResponse.end === jsonResponse.total ? Promise.resolve(allBooks) : getBooks(user, ++page, allBooks);
        })
        .catch((error) => {
            console.error(`Error requesting books: + ${error}`);
            return Promise.reject(error);
        });
};

module.exports = {
    getBooks: getBooks
};