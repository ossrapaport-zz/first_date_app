//This fuction will return the search query to plug into Factual
exports.buildSearchQuery = function(chosenPrice, chosenNeighborhood, typesArray) { 
  
  //Libraries
  var application_root = __dirname,
    express = require("express"),
    logger = require("morgan"),
    bodyParser = require("body-parser"),
    Factual = require("factual-api"),
    environment = require("dotenv");

  //Loading libaries
  var app = express();
  environment.load();
  var factual = new Factual(process.env.FACTUAL_KEY_2, process.env.FACTUAL_SECRET_2);
  app.use(logger("dev"));
  app.use(bodyParser());

  var info = "placeholder";

  factual.get('/t/restaurants-us', {filters:
  {"$and":[{"locality":"new york", "price":3, "alcohol":"true", "meal_dinner":true, "neighborhood":{"$includes":"soho"}},{"$or":[{"rating":"4"},{"rating":"5"},{"rating":"4.5"}]}]}},
  function (error, response) {
    objectTest.data = response.data;
  });

  var test = {"$and":[{"price":3, "alcohol":"true", "meal_dinner":true, "neighborhood":{"$includes":"park slope"}},{"$or":[{"rating":"4"},{"rating":"5"},{"rating":"4.5"}]}]}
  return test;
}
//This will have one less } at the end than if it were being
//plugged in directly because the server.js accounts for that.