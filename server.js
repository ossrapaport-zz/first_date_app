//Libraries
var application_root = __dirname,
    express = require("express"),
    logger = require("morgan"),
    bodyParser = require("body-parser"),
    models = require("./models"),
    path = require("path"),
    environment = require("dotenv"),
    request = require("request");

//Models 
var User = models.users;
var Interest = models.interests;

var app = express();
environment.load();

/*var yelp = require("yelp").createClient ({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});*/

var Factual = require("factual-api");
var factual = new Factual(process.env.FACTUAL_KEY, process.env.FACTUAL_SECRET);

app.use(logger("dev"));
app.use(bodyParser());
app.use(express.static(path.join(application_root, "public")));
app.use(express.static(path.join(application_root, "browser")));

//User Routes

app.get("/users", function(req, res) {
  User
  .findAll({include: [Interest] })
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


/*//Restaurant Search

app.get("/search_for_date", function(req, res) {

  yelp.search({term: "food", location: "New York City"}, function(error, data) {
    res.send(data);
  });

  //Then, once we've gotten the search term,
  yelp.business(RESTAURANT_ID, function(error, data) {
    res.send(data);
  });
});*/


//Factual Search -- For Example Only, Not Functional With Search

app.get("/search_for_restaurant/:price/:neighborhood", function(req, res) {
  
  var price = req.params.price;
  var neighborhood = req.params.neighborhood;
  var cuisine = "TO BE SET";

  factual.get('/t/restaurants-us', {filters:
    {"$and":[{"locality":"new york", "price":3, "alcohol":"true", "meal_dinner":true, "neighborhood":{"$includes":"soho"}},{"$or":[{"rating":"4"},{"rating":"5"},{"rating":"4.5"}]}]}},
    function (error, response) {
  res.send(response.data);
  });
})


app.listen(3000, function() {
  console.log("Server running on 3000");
});
 
	


