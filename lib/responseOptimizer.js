//This function will take the data given back and prune it down,
//returning the single best option.
exports.optimizeResponse = function(chosenPrice, personality, responseData) {
  //If the response has more than one restaurant,
  //first find where the rating is highest and it matches
  //the price put in exactly.
  chosenPrice = parseInt( chosenPrice );
  if (responseData.length > 1) {
    //Find which among these restaurants has the highest
    //rating and matches the user's price exactly.
    var bestResponsesArray = [];
    for (var i = 0; i < responseData.length; i ++) {
      if (responseData[i].rating === 5 && responseData[i].price === chosenPrice) {
        bestResponsesArray.push(i);
      }
    }
    //Make sure there's at least one restaurant in the array.
    //If there isn't, see if a lower rating will do it. Please
    //note the double equals sign instead of triple. This is key
    //to check if the array has any values.
    if (bestResponsesArray.toString() == false) {
      for (var i = 0; i < responseData.length; i ++) {
        if (responseData[i].rating === 4 && responseData[i].price === chosenPrice) {
          bestResponsesArray.push(i);
        }
      }  
    }
    //If only one restaurant best, send that restaurant back.
    if (bestResponsesArray.length === 1) {
      return bestResponsesArray[0];
    //If more than one restaurant is best, go through them
    //and sort by personality.
    } else if (bestResponsesArray.length > 1) {
      //If the personality is outgoing
      if (personality === "Outgoing") {
        //Looks through the potential choices for the one best
        //for someone who is outgoing. If none, just chooses
        //a random one.
        for (var i = 0; i < bestResponsesArray.length; i ++) {
          if (responseData[bestResponsesArray[i]].cuisine.indexOf("Gastropub") !== -1 ||
          responseData[bestResponsesArray[i]].cuisine.indexOf("Nooodle Bar") !== -1 ||
          responseData[bestResponsesArray[i]].cuisine.indexOf("Dim Sum") !== -1) {
            return bestResponsesArray[i];
          }
        }
        return bestResponsesArray[Math.floor( Math.random() * bestResponsesArray.length )];
      //If the personality is reserved
      } else if (personality  === "Reserved") {
        //Looks through the potential choices for the one best
        //for someone who is reserved. If none, just chooses
        //a random one. 
        for (var i = 0; i < bestResponsesArray.length; i ++) {
          if (responseData[bestResponsesArray[i]].attire === "business casual" ||
          responseData[bestResponsesArray[i]].attire === "smart casual" ||
          responseData[bestResponsesArray[i]].attire === "formal") {
            return bestResponsesArray[i];
          }
        }
        return bestResponsesArray[Math.floor( Math.random() * bestResponsesArray.length )];
      //If the personality is traditional
      } else if (personality === "Traditional") {
        //Looks through the potential choices for the one best
        //for someone who is traditional. If none, just chooses
        //a random one.
        for (var i = 0; i < bestResponsesArray.length; i ++) {
          if (responseData[bestResponsesArray[i]].cuisine.indexOf("Traditional") !== -1 || 
          responseData[bestResponsesArray[i]].cuisine.indexOf("American") !== -1 ||
          responseData[bestResponsesArray[i]].cuisine.indexOf("French") !== -1 ||
          responseData[bestResponsesArray[i]].cuisine.indexOf("Italian") !== -1) {
            return bestResponsesArray[i];
          }
        } 
        return bestResponsesArray[Math.floor( Math.random() * bestResponsesArray.length )];
      } else if (personality === "Materialistic") {
        //Looks through the potential choices for the one best
        //for someone who is materialistic. If none, just chooses
        //a random one.
        for (var i = 0; i < bestResponsesArray.length; i ++) {
          if (responseData[bestResponsesArray[i]].reservations === true && 
          responseData[bestResponsesArray[i]].room_private === true) {
            return bestResponsesArray[i];
          }
        } 
        return bestResponsesArray[Math.floor( Math.random() * bestResponsesArray.length )];
      } else if (personality === "Spiritual") {
        //Looks through the potential choices for the one best
        //for someone who is spiritual. If none, just chooses
        //a random one.
        for (var i = 0; i < bestResponsesArray.length; i ++) {
          if (responseData[bestResponsesArray[i]].attire === "streetwear" ||
          responseData[bestResponsesArray[i]].attire === "casual" ||
          responseData[bestResponsesArray[i]].attire === "business casual") {
            return bestResponsesArray[i];
          }
        }
        return bestResponsesArray[Math.floor( Math.random() * bestResponsesArray.length )];
      }
    }
  //If the response is just one restaurant, then that is 
  //sent back.
  } else {
    return 0;
  }
};