"use strict";

const express = require("express")
    , router = express.Router()
    , statsCalculator = require("./../logic/stats-calculator");

router.get("/topAuthors/:user", (req, res) => {
    const user = req.params.user;
    const books = require(`./../data/${user}.json`);
    const topAuthors = statsCalculator.calculateTopAuthors(books);
    res.render("stats", { user : user, books : books, topAuthors : topAuthors });
});

router.get("/highestRatedBooks", (req, res) => {
    res.render("stats");
});

module.exports = router;