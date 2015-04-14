var express = require("express"),
    models  = require("../models");

var User     = models.users,
    Interest = models.interests,
    Date     = models.dates,
    Result   = models.results;

var interestRouter = express.Router();

interestRouter.get("/", function(req, res) {
  Interest
  .findAll({ 
    include: User 
  })
  .then(function(interests) {
    res.send(interests);
  });
});

interestRouter.get("/:id", function(req, res) {
  Interest
  .findOne(req.params.id)
  .then(function(interest) {
    res.send(interest);
  });
});

interestRouter.post("/", function(req, res) {
  Interest
  .create(req.body)
  .then(function(newInterest) {
    res.send(newInterest);
  });
});

interestRouter.delete("/:id", function(req ,res) {
  Interest
  .findOne(req.params.id)
  .then(function(interest) {
    interest
    .destroy()
    .then(function() {  
      res.send(interest);
    });
  });
});


module.exports = interestRouter;