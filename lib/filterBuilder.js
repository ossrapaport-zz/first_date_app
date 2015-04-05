//This fuction will return the search query to plug into Factual
exports.buildSearchFilter = function(chosenPrice, chosenNeighborhood, typesArray) { 

  typesArray.sort();
  var neighborhood = chosenNeighborhood;
  var price = parseInt(chosenPrice);

  if (price !== 1) {
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
        }
      ]
    };  
  } else if (price === 1) {
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
        }
      ]
    }  
  };

  //The following conditions will insert desired attributes.

var buildtheBase = function(price, typesArray) {
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
  }
  //If the date is The One
  if (typesArray.indexOf("top-class") !== -1 && price !== 1) {
    var upSell = {
      "price": (price + 1)
    }
    base.$and[2].$or.push(upSell);
  }
  //If quieter
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
  }

  //If exotic (needs two occurrences)
  if (typesArray.indexOf("exotic") !== -1 && typesArray[ typesArray.indexOf("exotic") + 1 ] == "exotic") {
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
  }
  //To get the right spot 
  //TODO: Find good search term for below 
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
  } else if (price !== 1 && price !== 2) {
    var attireObject = {
      "$or":
      [
        {"attire": "business casual"},
        {"attire": "smart casual"},
        {"attire": "formal"}
      ]
    }
  }
  
}


  //EVERYTHING FROM HERE FORWARD IS A TEST - IT IS IN A FUNCTION
  //JUST TO NOT HAVE IT HAPPEN AUTOMATICALLY
  var testQuery = {"$and":[{"price":3, "alcohol":"true", "meal_dinner":true, "neighborhood":{"$includes":"park slope"}},{"$or":[{"rating":"4"},{"rating":"5"},{"rating":"4.5"}]}]};
  
  if (typesArray.indexOf("healthy") !== -1) {
    var insertHealthyTest = function() {
      testQuery.$and[0].options_healthy = true;
    }
  } else {
    var insertHealthyTest = function() {
      console.log("Not healthy");
    } 
  }

  insertHealthyTest();

  var filter = {
    filters: base
  };

  var testFilter = {
    filters: testQuery
  }

  //For future information, the code below worked with server.js
  return filter;
}