"use strict";

const express = require("express")
    , router = express.Router();

router.get("/topAuthors", (req, res) => {
    res.render("stats");
});

router.get("/highestRatedBooks", (req, res) => {
    res.render("stats");
});

module.exports = router;