"use strict";

require("dotenv").config();
const express = require("express")
    , path = require("path")
    , morgan = require("morgan")
    , cookieParser = require("cookie-parser")
    , bodyParser = require("body-parser")
    , sassMiddleware = require("node-sass-middleware")
    , helmet = require("helmet");

const index = require("./routes/index")
    , statsRouter = require("./routes/stats-router");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/stats/", statsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
