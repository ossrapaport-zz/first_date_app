var express           = require("express"),
    models            = require("../models"),
    async             = require("async"),
    environment       = require("dotenv"),
    filterBuilder     = require("../lib/filterBuilder"),
    responseOptimizer = require("../lib/responseOptimizer"),
    Factual           = require("factual-api");

var User     = models.users,
    Interest = models.interests,
    Date     = models.dates,
    Result   = models.results;

environment.load();
var factual = new Factual(process.env.FACTUAL_KEY_3, process.env.FACTUAL_SECRET_3);
var searchRouter = express.Router();

//The Factual query that finds the right restaurant
searchRouter.post("/:price/:neighborhood", function(req, res) {
  var price = req.params.price;
  var neighborhood = req.params.neighborhood;
  var dateParams = {
    firstName: req.body.firstName,
    personality: req.body.personality
  };
  var interestIDArray = req.body.interest_ids;

  //Make new date
  Date
  .create(dateParams)
  .then(function(date) {
    //Add all the date's interests with async to avoid asynchronous issues 
    async.each(interestIDArray, function(interestID, callback) {
      Interest
      .findOne(interestID)
      .then(function(interest) {
        date
        .addInterest(interest)
        .then(function() {
          callback();
        })
      })
    }, function(err) {
      if (err) return callback(err);
      //Gets the interests and uses them to inform the search
      date
      .getInterests()
      .then(function(dateInterests) {
        var typesArray = makeTypesArray(dateInterests);
        //Makes Factual filters
        var factualFilter = filterBuilder.buildSearchFilter(price, neighborhood, typesArray); 
        factual.get("/t/restaurants-us?limit=50", factualFilter,
        function(error, response) {
          //Finds the single best spot for the date
          var bestRestaurantIndex = responseOptimizer.optimizeResponse(price, dateParams.personality, response.data); 
          res.send(response.data[bestRestaurantIndex]);
        });
      });
    });
  });
});

//Creates an array of the types of the date's interests
var makeTypesArray = function(dateInterestsArray) {
  var typesArray = [];
  for (var i = 0; i < dateInterestsArray.length; i ++) {
    typesArray.push(dateInterestsArray[i].type); 
  } return typesArray;
};

module.exports = searchRouter;