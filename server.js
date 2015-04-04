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

var app = express();
environment.load();

var Factual = require("factual-api");
var factual = new Factual(process.env.FACTUAL_KEY, process.env.FACTUAL_SECRET);

app.use(logger("dev"));
app.use(bodyParser());

//I connected this path to a test HTML folder
app.use(express.static(path.join(application_root, "public_TO_TEST"))); 
app.use(express.static(path.join(application_root, "browser")));

//User Routes

app.get("/users", function(req, res) {
  User
  .findAll({ include: [Interest] })
  .then(function(users) {
    res.send(users);
  });
});

app.get("/users/:id", function(req, res) {
  var userID = req.params.id;
  User
  .findOne({
    where: {id: userID},
    include: [Interest]
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

//I need to integrate the above code with the code below,
//and that will yield our algorithm. Where I am responding
//typesArray right now is where the above code belongs in
//a modified form.

app.post("/date_and_search/:price/:neighborhood", function(req, res) {
  var price = req.params.price;
  var neighborhood = req.params.neighborhood;

  //Front end will need to have this structure
  var dateParams = {
    firstName: req.body.firstName,
    personality: req.body.personality
  };
  var interestIDArray = req.body.interest_ids;
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

app.listen(3000, function() {
  console.log("Server running on 3000");
}); 
