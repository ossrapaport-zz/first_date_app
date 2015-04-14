var express = require("express"),
    models  = require("../models");

var User     = models.users,
    Interest = models.interests,
    Date     = models.dates,
    Result   = models.results;

var userRouter = express.Router();

userRouter.get("/", function(req, res) {
  User
  .findAll({ 
    include: Interest, 
    include: Result
  })
  .then(function(users) {
    res.send(users);
  });
});

userRouter.get("/:id", function(req, res) {
  User
  .findOne(req.params.id, {
    include: Interest,
    include: Result
  })
  .then(function(user) {
    res.send(user);
  });
});

userRouter.post("/", function(req, res) {
  User
  .create(req.body)
  .then(function(newUser) {
    res.send(newUser);
  });
});

userRouter.put("/:id", function(req, res) {
  var userID = req.params.id;
  var userParams = req.body;
  
  User
  .findOne(userID)
  .then(function(user) {
    user
    .update(userParams)
    .then(function(updatedUser) {
      res.send(updatedUser);
    });
  });
});

userRouter.delete("/:id", function(req, res) {
  User
  .findOne(req.params.id)
  .then(function(user) {
    user
    .destroy()
    .then(function() {
      res.send(user);
    });
  });
});

//Adding and removing interests from users

userRouter.put("/:id/add_interest", function(req, res) {
  var userID = req.params.id
  var interestID = req.body.interest_id;

  User
  .findOne(userID, { 
    include: Interest 
  })
  .then(function(user) {
    Interest
    .findOne(interestID)
    .then(function(interest) {
      user
      .addInterest(interest)
      .then(function(info) {
        res.send(info);
      });
    });
  });
});

userRouter.put("/:id/remove_interest", function(req, res) {
  var userID = req.params.id;
  var interestID = req.body.interest_id;

  User
  .findOne(userID, { 
    include: Interest 
  })
  .then(function(user) {
    Interest
    .findOne(interestID)
    .then(function(interest) {
      user
      .removeInterest(interest)
      .then(function(info) {
        res.send(info);
      });
    });
  });
});

userRouter.post("/:id/results", function(req, res) {
  var userID = req.params.id;
  var data = req.body;

  User
  .findOne(userID)
  .then(function(user) {
    Result
    .create(data)
    .then(function(newResult) {
      user
      .addResult(newResult)
      .then(function(result) {
        res.send(result);
      });
    });
  });
});

module.exports = userRouter;