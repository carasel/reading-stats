"use strict";

const express = require("express")
    , router = express.Router()
    , validator = require("validator")
    , goodreadsIngester = require("../logic/goodreads-ingester");

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/ingest", (req, res) => {
    const userId = req.query.user;
    if (validator.isNumeric(userId)) {
        goodreadsIngester.ingestBooks(req.query.user)
            .then(books => {
                res.status(200).send("Your books have been ingested from Goodreads!");
            })
            .catch(error => {
                console.error(`Error ingesting book reviews: ${error}`);
                res.status(500).send("Error ingesting book reviews");
            });
    } else {
        const errorMessage = `Error: Expected numeric user ID, received: ${userId}`;
        console.error(errorMessage);
        res.render("index", { errors : [ { message : errorMessage } ] });
    }
});

module.exports = router;
