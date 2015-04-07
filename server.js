//BEFORE HEROKU
//Libraries
var application_root = __dirname,
    express = require("express"),
    logger = require("morgan"),
    bodyParser = require("body-parser"),
    models = require("./models"),
    path = require("path"),
    environment = require("dotenv"),
    filterBuilder = require("./lib/filterBuilder.js"),
    responseOptimizer = require("./lib/responseOptimizer.js"),
    request = require("request");

//Models 
var User = models.users;
var Interest = models.interests;
var Date = models.dates;
var Result = models.results;


var app = express();
environment.load();

var yelp = require("yelp").createClient ({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

var Factual = require("factual-api");
var factual = new Factual(process.env.FACTUAL_KEY_3, process.env.FACTUAL_SECRET_3);

app.use(logger("dev"));
app.use(bodyParser());

//I connected this path to a test HTML folder
app.use(express.static(path.join(application_root, "public"))); 
app.use(express.static(path.join(application_root, "browser")));

//User Routes

app.get("/users", function(req, res) {
  User
  .findAll({ include: [Interest], include: Result })
  .then(function(users) {
    res.send(users);
  });
});

app.get("/users/:id", function(req, res) {
  var userID = req.params.id;
  User
  .findOne({
    where: {id: userID},
    include: [Interest],
    include: Result
  })
  .then(function(user) {
    res.send(user);
  });
});

app.post("/users", function(req, res) {
  var userParams = req.body;
  User
  .create(userParams)
  .then(function(newUser) {
    res.send(newUser);
  });
});

app.put("/users/:id", function(req, res) {
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

app.delete("/users/:id", function(req, res) {
  var userID = req.params.id;
  User
  .findOne(userID)
  .then(function(user) {
    user
    .destroy()
    .then(function() {
      res.send(user);
    });
  });
});

//Adding and removing interests from users

app.put("/users/:id/add_interest", function(req, res) {
  var userID = req.params.id
  var interestID = req.body.interest_id;

  User
  .findOne(userID, { include: [Interest] })
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

app.put("/users/:id/remove_interest", function(req, res) {
  var userID = req.params.id;
  var interestID = req.body.interest_id;

  User
  .findOne(userID, {include: [Interest]})
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

//Interest Routes

app.get("/interests", function(req, res) {
  Interest
  .findAll({ include: [User] })
  .then(function(interests) {
    res.send(interests);
  });
});

app.get("/interests/:id", function(req, res) {
  var interestID = req.params.id;

  Interest
  .findOne(interestID)
  .then(function(interest) {
    res.send(interest);
  });
});

app.post("/interests", function(req, res) {
  var interestParams = req.body;

  Interest
  .create(interestParams)
  .then(function(newInterest) {
    res.send(newInterest);
  });
});

app.put("/interests/:id", function(req, res) {
  var interestID = req.params.id;
  var interestParams = req.body;
  Interest
  .findOne(interestID)
  .then(function(interest) {
    interest
    .update(interestParams)
    .then(function(updatedInterest) {
      res.send(updatedInterest);
    });
  });
});

app.delete("/interests/:id", function(req ,res) {
  var interestID = req.params.id;
  Interest
  .findOne(interestID)
  .then(function(interest) {
    interest
    .destroy()
    .then(function() {  
      res.send(interest);
    });
  });
});

//Date Routes

app.get("/dates", function(req, res) {
  Date
  .findAll({ include: [Interest]})
  .then(function(dates) {
    res.send(dates);
  });
});

app.get("/dates/:id", function(req, res) {
  var dateID = req.params.id;
  Date
  .findOne( dateID, { include: [Interest] })
  .then(function(date) {
    res.send(date);
  });
});

app.post("/dates", function(req, res) {
  var dateParams = req.body;
  Date
  .create(dateParams)
  .then(function(newDate) {
    res.send(newDate);
  });
});

app.delete("/dates/:id", function(req, res) {
  var dateID = req.params.id;
  Date
  .findOne(dateID)
  .then(function(date) {
    date
    .destroy()
    .then(function() {
      res.send(date);
    });
  });
});

//Adding interests to dates

app.put("/dates/:id/add_interest", function(req, res) {
  var dateID = req.params.id;
  var interestID = req.body.interest_id;

  Date
  .findOne(dateID, { include : [Interest] })
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

//Result Routes

app.get("/results", function(req, res) {

  Result
  .findAll()
  .then(function(results) {
    res.send(results);
  });
});

app.get("/resuts/:id", function(req, res) {
  var resultID = req.params.id;

  Result
  .findOne(resultID)
  .then(function(result) {
    res.send(result);
  });
});

app.post("/users/:id/results", function(req, res) {
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

app.put("/results/:id", function(req, res) {
  var resultID = req.params.id;
  var data =req.body;

  Result
  .findOne(resultID)
  .then(function(result) {
    result
    .update(data)
    .then(function(updatedResult) {
      res.send(updatedResult);
    });
  });
});

app.delete("/results/:id", function(req, res) {
  var resultID = req.params.id;

  Result
  .findOne(resultID)
  .then(function(result) {
    result
    .destroy()
    .then(function() {
      res.send(result);
    });
  });
});

//Factual Search -- For Example Only, Not Functional With Search

app.get("/test_call/:price/:neighborhood", function(req, res) {

  var price = req.params.price;
  var neighborhood = req.params.neighborhood;
  
  factual.get('/t/restaurants-us?limit=50', 
  { filters:
    { "$and":
      [
        {
          "alcohol": "true", 
          "price": 3,
          "meal_dinner": true,  
          "neighborhood": { 
              "$includes": "soho"
          },
          "category_labels": {
            "$excludes_any": ["Music and Show Venues", "Night Clubs", "Movie Theatres"]
          }
        },
        { "$or":
            [
              { "rating": "4" },
              { "rating": "5" },
              { "rating": "4.5" }, 
              { "rating": "3.5"},
              { "rating": "3"}
            ]
        },
        { "$or": 
          [
            { "locality": "New York"},
            { "locality": "Brooklyn"}
          ]
        }/*, 
        { "$or":
          [
            { "price": 3 },
            { "price": 5 },
            { "price": 2 }, 
            { "price": 4 }
          ]
        }*/
      ]
    }
  },
  function (error, response) {
    res.send(response.data);
  });
})

app.post("/date_and_search/:price/:neighborhood", function(req, res) {
  var price = req.params.price;
  var neighborhood = req.params.neighborhood;

  //TODO: Make sure this works with the front-end structure
  var dateParams = {
    firstName: req.body.firstName,
    personality: req.body.personality
  };
  console.log(req.body);
  var interestIDArray = req.body.interest_ids;
  console.log(interestIDArray);
  var count = 0;

  //Make new date
  Date
  .create(dateParams)
  .then(function(date) {
    //Add all the date's interests with a counter to avoid asynchronous issues 
    interestIDArray.forEach(function(interestID) { 
      Interest 
      .findOne(interestID)
      .then(function(interest) {        
        date
        .addInterest(interest)
        .then(function() {
          count ++;
          //Once all are added, get those interests
          if (count === interestIDArray.length) { 
            date
            .getInterests()
             //Look at those interests
            .then(function(dateInterests) {
              var typesArray = [];
              for (var i = 0; i < dateInterests.length; i ++) {
                //Creates an array of the types of the date's interests
                typesArray.push(dateInterests[i].type); 
              }
              //Makes Factual filters
              var factualFilter = filterBuilder.buildSearchFilter(price, neighborhood, typesArray); 
              factual.get("/t/restaurants-us?limit=50", 
                factualFilter,
              function(error, response) {
                //Finds the single best spot for the date
                //console.log(response.data);
                var bestRestaurantIndex = responseOptimizer.optimizeResponse(price, dateParams.personality, response.data); 
                console.log(bestRestaurantIndex);
                console.log(response.data[bestRestaurantIndex]);
                res.send(response.data[bestRestaurantIndex]);
              });
            });
          }
        });
      });
    });
  });
});

//Restaurant Search for a Photo - Yelp is Here
app.get("/yelp_for_more/:name/:neighborhood1/:neighborhood2/:neighborhood3", function(req, res) {
  var restaurantName = req.params.name;
  var restaurantNeighborhood1 = req.params.neighborhood1 + ", New York City";
  var restaurantNeighborhood2 = req.params.neighborhood2 + ", New York City";
  var restaurantNeighborhood3 = req.params.neighborhood3 + ", New York City";

  //This is the Yelp call. THe nested structure is in case the 
  //neighborhoods of Yelp and Factual don't line up.
  yelp.search({term: restaurantName, limit: 1, location: restaurantNeighborhood1}, function(error, data) {
    if (data !== undefined) {
    console.log("data:" + data);
    res.send(data);
    } else {
      yelp.search({term: restaurantName, limit: 1, location: restaurantNeighborhood}, function(error, newData) {
        if (newData !== undefined) {
          console.log("newData:" + newData);
          res.send(newData);
        } else {
          if (restaurantNeighborhood3 !== "notest") {
            yelp.search({term: restaurantName, limit: 1, location: restaurantNeighborhood3}, function(error, newestData) {
              console.log("newestData:" + newestData);
              res.send(newestData);
            });            
          } else {
            var noData = {
              name: "Nothing"
            }
            res.send(noData);
          }
        }
      });
    }
  });
});

app.get("/yelp_test", function(req, res) {

  yelp.search({term: "vinegar hill house", limit: 1, location: "DUMBO, New York City"}, function(error, data) {
    res.send(data);
  })

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on 3000");
}); 
