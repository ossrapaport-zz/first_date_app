//Libraries
var application_root  = __dirname,
    express           = require("express"),
    logger            = require("morgan"),
    bodyParser        = require("body-parser"),
    models            = require("./models"),
    path              = require("path"),
    environment       = require("dotenv"),
    filterBuilder     = require("./lib/filterBuilder.js"),
    responseOptimizer = require("./lib/responseOptimizer.js"),
    request           = require("request"),
    async             = require("async"),
    Factual           = require("factual-api");

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

var factual = new Factual(process.env.FACTUAL_KEY_3, process.env.FACTUAL_SECRET_3);

app.use(logger("dev"));
app.use(bodyParser());

app.use(express.static(path.join(application_root, "public"))); 
app.use(express.static(path.join(application_root, "browser")));

//User Routes

app.get("/users", function(req, res) {
  User
  .findAll({ 
    include: Interest, 
    include: Result
  })
  .then(function(users) {
    res.send(users);
  });
});

app.get("/users/:id", function(req, res) {
  User
  .findOne(req.params.id, {
    include: Interest,
    include: Result
  })
  .then(function(user) {
    res.send(user);
  });
});

app.post("/users", function(req, res) {
  User
  .create(req.body)
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

app.put("/users/:id/add_interest", function(req, res) {
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

app.put("/users/:id/remove_interest", function(req, res) {
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

//Interest Routes

app.get("/interests", function(req, res) {
  Interest
  .findAll({ 
    include: User 
  })
  .then(function(interests) {
    res.send(interests);
  });
});

app.get("/interests/:id", function(req, res) {
  Interest
  .findOne(req.params.id)
  .then(function(interest) {
    res.send(interest);
  });
});

app.post("/interests", function(req, res) {
  Interest
  .create(req.body)
  .then(function(newInterest) {
    res.send(newInterest);
  });
});

app.delete("/interests/:id", function(req ,res) {
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

//Date Routes

app.get("/dates", function(req, res) {
  Date
  .findAll({ 
    include: Interest 
  })
  .then(function(dates) {
    res.send(dates);
  });
});

app.post("/dates", function(req, res) {
  Date
  .create(req.body)
  .then(function(newDate) {
    res.send(newDate);
  });
});

//Adding interests to dates

app.put("/dates/:id/add_interest", function(req, res) {
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

//Result Routes

app.get("/results", function(req, res) {
  Result
  .findAll()
  .then(function(results) {
    res.send(results);
  });
});

app.get("/resuts/:id", function(req, res) {
  Result
  .findOne(req.params.id)
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

app.delete("/results/:id", function(req, res) {
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

//The Factual query that finds the right restaurant
app.post("/date_and_search/:price/:neighborhood", function(req, res) {
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

//Yelp Search For the Factual Restaurant - Better Information 
app.get("/yelp_for_more/:name/:neighborhood1/:neighborhood2/:neighborhood3", function(req, res) {
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

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on 3000");
}); 