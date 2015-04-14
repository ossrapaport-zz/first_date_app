var express = require("express"),
    models  = require("../models");

var User     = models.users,
    Interest = models.interests,
    Date     = models.dates,
    Result   = models.results;

var resultRouter = express.Router();

resultRouter.get("/", function(req, res) {
  Result
  .findAll()
  .then(function(results) {
    res.send(results);
  });
});

resultRouter.get("/:id", function(req, res) {
  Result
  .findOne(req.params.id)
  .then(function(result) {
    res.send(result);
  });
});

resultRouter.delete("/:id", function(req, res) {
  Result
  .findOne(req.params.id)
  .then(function(result) {
    result
    .destroy()
    .then(function() {
      res.send(result);
    });
  });
});

module.exports = resultRouter;