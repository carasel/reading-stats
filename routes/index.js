"use strict";

const express = require("express")
    , request = require("request-promise-native")
    , router = express.Router()
    , bookListConverter = require("./../logic/book-list-converter");

let goodreadsParams = {
    "v" : "2",
    "key" : process.env.GOODREADS_KEY
};

router.get("/", (req, res) => {
    res.render("index", { title: "Reading Stats" });
});

router.get("/ingest/:user", (req, res) => {
    getBooks(req.params.user, 1, [])
        .then(books => {
            res.status(200).send(books);
        })
        .catch(error => {
            console.error(`Error ingesting book reviews: ${error}`);
            res.status(500).send("Error ingesting book reviews");
        });
});

function getBooks(user, page, allBooks){
    let allBooksParams = goodreadsParams;
    allBooksParams["per_page"] = 100;
    allBooksParams["page"] = page;
    let options = {
        uri : `https://www.goodreads.com/review/list/${user}.xml`,
        qs : allBooksParams
    };
    return request(options)
        .then((response) => {
            console.log(`Got page ${page} of books`);
            const jsonResponse = bookListConverter.convertToJson(response);
            allBooks = allBooks.concat(jsonResponse.review);
            //TODO there is an error in the json when there are more than 4 pages of books
            return jsonResponse.end === jsonResponse.total ? Promise.resolve(allBooks) : getBooks(user, ++page, allBooks);
        })
        .catch((error) => {
            console.error(`Error requesting books: + ${error}`);
            return Promise.reject(error);
        });
}

module.exports = router;
