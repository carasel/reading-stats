const express = require("express")
    , request = require("request-promise-native")
    , router = express.Router();

let allBooksUrl = "https://www.goodreads.com/review/list/1993254.xml";
let allBooksUrlParams = {
    "v" : "2",
    "key" : process.env.GOODREADS_KEY,
    "page" : 1,
    "per_page" : 100
};

router.get("/", (req, res) => {
    res.render("index", { title: "Reading Stats" });
});

router.get("/ingest/:user", (req, res) => {
    const options = {
        uri : allBooksUrl,
        qs : allBooksUrlParams
    };
    request(options)
        .then((books) => {
            console.log(books);
            res.status(200).send(books);
        })
        .catch((error) => {
            console.error(`Error getting books from Goodreads API: ${error}`);
            res.status(500).send("Error getting books from Goodreads API");
        })
});

module.exports = router;
