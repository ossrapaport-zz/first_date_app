var express       = require("express"),
    environment   = require("dotenv"),
    models        = require("../models");

var User     = models.users,
    Interest = models.interests,
    Date     = models.dates,
    Result   = models.results;

environment.load();
var yelp = require("yelp").createClient ({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

var yelpRouter = express.Router();


//Yelp Search For the Factual Restaurant - Better Information 
yelpRouter.get("/:name/:neighborhood1/:neighborhood2/:neighborhood3", function(req, res) {
  var restaurantName = req.params.name;
  var restaurantNeighborhood1 = req.params.neighborhood1 + ", New York City";
  var restaurantNeighborhood2 = req.params.neighborhood2 + ", New York City";
  var restaurantNeighborhood3 = req.params.neighborhood3 + ", New York City";

  //This is the Yelp call. The nested structure is in case the 
  //neighborhoods of Yelp and Factual don't line up.
  yelp.search({term: restaurantName, limit: 1, location: restaurantNeighborhood1}, function(error, data) {
    if (data) {
      res.send(data);
    } else {
      yelp.search({term: restaurantName, limit: 1, location: restaurantNeighborhood}, function(error, newData) {
        if (newData) {
          res.send(newData);
        } else {
          if (restaurantNeighborhood3 !== "notest") {
            yelp.search({term: restaurantName, limit: 1, location: restaurantNeighborhood3}, function(error, newestData) {
              res.send(newestData);
            });            
          } else {
            res.send({
              name: "Nothing"
            });
          }
        }
      });
    }
  });
});

module.exports = yelpRouter;