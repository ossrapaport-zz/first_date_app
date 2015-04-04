var models = require("../models");
var Interest = models.interests;

//Populates database with desired interests.
var seedArr = [
  {
    name: "Vegan", 
    type: "vegan"
  },
  {
    name: "Always Working Out", 
    type: "healthy"
  },
  {
    name: "Always Dieting", 
    type: "healthy"
  },
  {
    name: "Vegetarian", 
    type: "Vegetarian"
  },
  {
    name: "Outdoorsy", 
    type: "outdoors"
  },
  {
    name: "Excitable", 
    type: "loud"
  },
  {
    name: "Witty", 
    type: "loud"
  },
  {
    name: "Hilarious", 
    type: "loud"
  },
  {
    name: "Boring", 
    type: "loud"
  },
  {
    name: "Meh", 
    type: "loud"
  },
  {
    name: "Aggressive", 
    type: "loud"
  },
  {
    name: "I Can't Stop Looking", 
    type: "loud"
  },
  {
    name: "Art Fanatic", 
    type: "quiet"
  },
  {
    name: "Cute", 
    type: "quiet"
  },
  {
    name: "Gentle", 
    type: "quiet"
  },
  {
    name: "Just Gets Me", 
    type: "quiet"
  },
  {
    name: "Talkative", 
    type: "quiet"
  },
  {
    name: "Adventurous", 
    type: "exotic"
  },
  {
    name: "Spicy", 
    type: "exotic"
  },
  {
    name: "Daring", 
    type: "exotic"
  },
  {
    name: "The One", 
    type: "top-class"
  },
  {
    name: "Foodie", 
    type: "organic"
  },
  {
    name: "Loves Farm to Table", 
    type: "organic"
  },
  {
    name: "Gluten Free", 
    type: "gluten-free"
  }
]

var seedDatabase = function() {
  seedArr.forEach( function(seed) {
    Interest.create({
      name: seed.name,
      type: seed.type
    })
  });
}

seedDatabase();


