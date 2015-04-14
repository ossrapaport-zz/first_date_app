var express = require("express"),
    models  = require("../models");

var User     = models.users,
    Interest = models.interests,
    Date     = models.dates,
    Result   = models.results;

var dateRouter = express.Router();

dateRouter.get("/", function(req, res) {
  Date
  .findAll({ 
    include: Interest 
  })
  .then(function(dates) {
    res.send(dates);
  });
});

dateRouter.post("/", function(req, res) {
  Date
  .create(req.body)
  .then(function(newDate) {
    res.send(newDate);
  });
});

//Adding interests to dates

dateRouter.put("/:id/add_interest", function(req, res) {
  var dateID = req.params.id;
  var interestID = req.body.interest_id;

  Date
  .findOne(dateID, { 
    include : Interest 
  })
  .then(function(date) {
    Interest
    .findOne(interestID)
    .then(function(interest) {
      date
      .addInterest(interest)
      .then(function(info) {
        res.send(info);
      });
    });
  });
});

module.exports = dateRouter;