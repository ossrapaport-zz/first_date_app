//Libraries
var express = require("express"),
    logger = require("morgan"),
    bodyParser = require("body-parser"),
    models = require("./models"),
    request = require("request");

//Models 
var User = models.users;
var Interest = models.interests;

var app = express();

app.use(logger("dev"));
app.use(bodyParser());
app.use(express.static(__dirname + "/public"));

