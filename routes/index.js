const express = require('express');
const posts = require("./posts");
const errorHandler = require("../middleware/error");

require("express-async-errors");


module.exports = function (app) {
    app.use(express.json());
    app.use("/api/posts", posts);
    app.use(errorHandler);
}