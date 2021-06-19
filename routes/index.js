// const apiRouter = require('express').Router();
const express = require("express");
const apiRouter = express.Router();

const linksRouter = require('./links');

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/hello", (req, res, next) => {
  res.send({
    message: "Hello Visitor!",
  });
});

apiRouter.use("/links", linksRouter);

module.exports = apiRouter;
