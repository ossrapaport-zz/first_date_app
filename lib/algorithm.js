//This fuction will return the search query to plug into Factual
exports.buildSearchFilter = function(chosenPrice, chosenNeighborhood, typesArray) { 

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

  var filter = {
    filters: base
  };

  //For future information, the code below worked with server.js
  var test = {filters: {"$and":[{"price":3, "alcohol":"true", "meal_dinner":true, "neighborhood":{"$includes":"park slope"}},{"$or":[{"rating":"4"},{"rating":"5"},{"rating":"4.5"}]}]}}
  return test;
}