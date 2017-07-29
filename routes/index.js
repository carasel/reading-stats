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
    let allBooksParams = goodreadsParams;
    allBooksParams["per_page"] = 100;
    allBooksParams["page"] = 1;
    let options = {
        uri : `https://www.goodreads.com/review/list/${req.params.user}.xml`,
        qs : allBooksParams
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
