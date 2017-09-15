"use strict";

const express = require("express")
    , router = express.Router()
    , goodreadsIngester = require("../logic/goodreads-ingester");

router.get("/", (req, res) => {
    res.render("index", { title: "Reading Stats" });
});

router.get("/ingest/:user", (req, res) => {
    goodreadsIngester.getBooks(req.params.user)
        .then(books => {
            res.status(200).send(books);
        })
        .catch(error => {
            console.error(`Error ingesting book reviews: ${error}`);
            res.status(500).send("Error ingesting book reviews");
        });
});

module.exports = router;
