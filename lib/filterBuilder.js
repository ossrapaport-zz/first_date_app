//This fuction will return the search query to plug into Factual
exports.buildSearchFilter = function(chosenPrice, chosenNeighborhood, typesArray) { 

  typesArray.sort();
  var neighborhood = chosenNeighborhood;
  var price = parseInt(chosenPrice);

  if (price === 1) {
    var base = {
      "$and":[
        {
          "price": 1, 
          "alcohol": "true", 
          "meal_dinner": true, 
          "neighborhood":
            {
              "$includes": chosenNeighborhood
            }
        },
        {"$or":
          [
            {"rating": "4"},
            {"rating": "5"},
            {"rating": "4.5"},
            {"rating": "3.5"}
          ]
        },
        { "$or": 
          [
            { "locality": "New York"},
            { "locality": "Brooklyn"}
          ]
        }
      ]
    }  
  } else {
    var base = {
      "$and":[
        {
          "alcohol": "true", 
          "meal_dinner": true,
          "neighborhood":
            {
              "$includes": chosenNeighborhood
            }
        },
        {"$or":
          [
            { "rating": "4" },
            { "rating": "5" },
            { "rating": "4.5" },
            { "rating": "3.5" }
          ]
        },
        {"$or":
          [
            {"price": price},
            {"price": (price - 1)}
          ]
        },
        { "$or": 
          [
            { "locality": "New York"},
            { "locality": "Brooklyn"}
          ]
        }
      ]
    };  
  }

  var fullBase = buildtheBase(base, price, typesArray);

  var filter = {
    filters: fullBase
  };

  return filter;
}

//The following functions will insert desired attributes.
var buildtheBase = function(base, price, typesArray) {
  
  var baseL1 = setOptionsIndOfPrice(base, typesArray);  
  
  var baseL2 = sellEmUp(baseL1, price, typesArray);
  
  var baseL3 = testQuiet(baseL2, typesArray);

  var baseL4 = testExotic(baseL3, typesArray);

  var baseL5 = optimizeAttire(baseL4, price);

  return baseL5;  
};

var setOptionsIndOfPrice = function(base, typesArray) {
  //If vegan
  if (typesArray.indexOf("vegan") !== -1) {
    base.$and[0].options_vegan = true;   
  }
  //If healthy
  if (typesArray.indexOf("healthy") !== -1) {
    base.$and[0].options_healthy = true;
  }
  //If vegetarian
  if (typesArray.indexOf("vegetarian") !== -1) {
    base.$and[0].options_vegetarian = true;
  }
  //If outdoorsy
  if (typesArray.indexOf("outdoors") !== -1) {
    base.$and[0].seating_outdoor = true;
  }
  //If foodie
  if (typesArray.indexOf("organic") !== -1) {
    base.$and[0].options_organic = true;
  } 
  //If gluten free
  if (typesArray.indexOf("gluten-free") !== -1) {
    base.$and[0].options_glutenfree = true;
  }
  //If louder
  if (typesArray.indexOf("loud") !== -1) {
    base.$and[0].groups_goodfor = true; 
  } return base;
};

//If the date is The One, raise the price
var sellEmUp = function(base, price, typesArray) {
  if (typesArray.indexOf("top-class") !== -1 && price !== 1) {
    var upSell = {
      "price": (price + 1)
    } 
    base.$and[2].$or.push(upSell);
  } return base;
};

//If quieter
var testQuiet = function(base, typesArray) {
  if (typesArray.indexOf("quiet") !== -1) {
    base.$and[0].category_labels = {
      "$excludes_any": 
        [
          "Night Clubs",
          "Music and Show Venues",
          "Movie Theatres"  
        ]
    }
    base.$and[0].cuisine = {
      "$excludes_any":
      [
        "Tapas",
        "Gastropub"
      ]
    }
  } return base;
};

//If exotic (needs two occurrences)
var testExotic = function(base, typesArray) {
  if (typesArray.indexOf("exotic") !== -1 && 
  typesArray[ typesArray.indexOf("exotic") + 1 ] == "exotic") {
    base.$and[0].cuisine = {
      "$excludes_any":
      [
        "French",
        "Pizza",
        "Burgers",
        "Traditional",
        "Sandwiches",
        "Diner",
        "Italian"
      ]
    }
  } return base;
};

//Tries to match the attire to the money spent
var optimizeAttire = function(base, price) {
  if (price === 1) {
    var attireObject = {
      "$or":
        [
          { "attire": "casual" },
          { "attire": "business casual" },
          { "attire": "smart casual" }
        ]
    } 
    base.$and.push(attireObject);
  } else if (price === 2) {
    var attireObject = {
      "$or":
        [
          {"attire": "business casual"},
          {"attire": "smart casual"}
        ]
    } 
    base.$and.push(attireObject);
  } else {
    var attireObject = {
      "$or":
       [
          {"attire": "business casual"},
          {"attire": "smart casual"},
          {"attire": "formal"}
       ]
    } 
    base.$and.push(attireObject);
  } return base;
}; 