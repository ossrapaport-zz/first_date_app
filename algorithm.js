//This fuction will return the search query to plug into Factual
exports.buildSearchQuery = function(chosenPrice, chosenNeighborhood, typesArray) { 

  var neighborhood = chosenNeighborhood.toString();
  var price = parseInt(chosenPrice);

  if (price !== 1) {
    var base = {
      "$and":[
        {
        "alcohol":"true", 
        "meal_dinner":true, 
        "neighborhood":
          {
            "$includes": chosenNeighborhood
          }
        },
        {"$or":
          [
            {"rating":"4"},
            {"rating":"5"},
            {"rating":"4.5"}
          ]
        },
        {"$or":
          [
            {"price":price},
            {"price": (price - 1)}
          ]
        }
      ]
    }  
  } else if (price == 1) {
    var base = {
      "$and":[
        {
        "price":1, 
        "alcohol":"true", 
        "meal_dinner":true, 
        "neighborhood":
          {
            "$includes": chosenNeighborhood
          }
        },
        {"$or":
          [
            {"rating":"4"},
            {"rating":"5"},
            {"rating":"4.5"}
          ]
        }
      ]
    }  
  }


  //For future information, the code below worked with server.js
  var test = {"$and":[{"price":3, "alcohol":"true", "meal_dinner":true, "neighborhood":{"$includes":"park slope"}},{"$or":[{"rating":"4"},{"rating":"5"},{"rating":"4.5"}]}]}
  return test;
}
//This will have one less } at the end than if it were being
//plugged in directly because the server.js accounts for that.