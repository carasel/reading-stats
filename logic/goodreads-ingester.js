"use strict";

const request = require("request-promise-native")
    , fs = require("fs-extra")
    , bookListConverter = require("./../logic/book-list-converter");

const goodreadsParams = {
    "v" : "2",
    "key" : process.env.GOODREADS_KEY
};

const ingestBooks = function(user) {
    return getBooks(user)
        .then((books) => {
            saveBooks(user, books)
        });
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

const saveBooks = function(user, books) {
    const file = `./data/${user}.json`;

    return fs.writeJson(file, books)
        .then(() => {
            return Promise.resolve(books);
        })
        .catch((error) => {
            console.error(`Error saving books: + ${error}`);
            return Promise.reject(error);
        });
};

module.exports = {
    ingestBooks: ingestBooks
};