"use strict";

const express = require("express")
    , request = require("request-promise-native")
    , router = express.Router();

let goodreadsParams = {
    "v" : "2",
    "key" : process.env.GOODREADS_KEY
};

router.get("/", (req, res) => {
    res.render("index", { title: "Reading Stats" });
});

router.get("/ingest/:user", (req, res) => {
    callAllBooks(req.params.user, 1)
        .then(books => {
            res.status(200).send(books);
        })
        .catch(error => {
            console.error(`Error getting books from Goodreads API: ${error}`);
            res.status(500).send("Error getting books from Goodreads API");
        });
});

function callAllBooks(user, page){
    let allBooksParams = goodreadsParams;
    allBooksParams["per_page"] = 100;
    allBooksParams["page"] = page;
    let options = {
        uri : `https://www.goodreads.com/review/list/${req.params.user}.xml`,
        qs : allBooksParams
    };
    let allBooks;
    request(options)
        .then((books) => {
            //TODO check if all books
            if (!gotAllBooks) {
                //TODO add books to all books
                callAllBooks(user, page++)
            } else {
                //TODO return books in promise
            }
        })
        .catch((error) => {
            // TODO return error to calling function
        });
}

module.exports = router;
