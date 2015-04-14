//Libraries
var application_root  = __dirname,
    express           = require("express"),
    logger            = require("morgan"),
    bodyParser        = require("body-parser"),
    path              = require("path"),
    request           = require("request");

//Routers
var userRouter      = require("./routers/user_router.js"),
    interestRouter  = require("./routers/interest_router.js"),
    dateRouter      = require("./routers/date_router.js"),
    resultRouter    = require("./routers/result_router.js"),
    searchRouter    = require("./routers/search_router.js"),
    yelpRouter      = require("./routers/yelp_router.js");


var app = express();

app.use(logger("dev"));
app.use(bodyParser());

app.use(express.static(path.join(application_root, "public"))); 
app.use(express.static(path.join(application_root, "browser")));

app.use("/users", userRouter);
app.use("/interests", interestRouter);
app.use("/dates", dateRouter);
app.use("/results", resultRouter);
app.use("/date_and_search", searchRouter);
app.use("/yelp_for_more", yelpRouter);

module.exports = app;