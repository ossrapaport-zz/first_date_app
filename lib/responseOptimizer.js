//This function will take the data given back and returns the best option.
exports.optimizeResponse = function(chosenPrice, personality, responseData) {
  //If the response is more than one spot, first find the
  //place with the highest rating and matching the user's price.
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
    //If only one restaurant is best, send that one back.
    if (bestResponsesArray.length === 1) {
      return bestResponsesArray[0];
    //If more than one restaurant is best, go through them
    //and sort by personality.
    } else if (bestResponsesArray.length > 1) {
      var bestResFromPersonality = matchByPersonality(personality, bestResponsesArray, responseData);
      return bestResFromPersonality;
    }
  //If the response is just one restaurant, then send that back.
  }
};

var matchByPersonality = function(personality, bestResArray, responseData) {
  //If the personality is outgoing
  if (personality === "Outgoing") {
    //Looks through the potential choices for the one best
    //for someone outgoing. If none, chooses randomly.
    for (var i = 0; i < bestResArray.length; i ++) {
      if (responseData[bestResArray[i]].cuisine.indexOf("Gastropub") !== -1 ||
      responseData[bestResArray[i]].cuisine.indexOf("Nooodle Bar") !== -1 ||
      responseData[bestResArray[i]].cuisine.indexOf("Dim Sum") !== -1) {
        return bestResArray[i];
      }
    }
    return bestResArray[Math.floor( Math.random() * bestResArray.length )];
  //If the personality is reserved
  } else if (personality  === "Reserved") {
    //Looks through the potential choices for the one best
    //for someone reserved. If none, chooses randomly.
    for (var i = 0; i < bestResArray.length; i ++) {
      if (responseData[bestResArray[i]].attire === "business casual" ||
      responseData[bestResArray[i]].attire === "smart casual" ||
      responseData[bestResArray[i]].attire === "formal") {
        return bestResArray[i];
      }
    }
    return bestResArray[Math.floor( Math.random() * bestResArray.length )];
  //If the personality is traditional
  } else if (personality === "Traditional") {
    //Looks through the potential choices for the one best
    //for someone traditional. If none, chooses randomly.
    for (var i = 0; i < bestResArray.length; i ++) {
      if (responseData[bestResArray[i]].cuisine.indexOf("Traditional") !== -1 || 
      responseData[bestResArray[i]].cuisine.indexOf("American") !== -1 ||
      responseData[bestResArray[i]].cuisine.indexOf("French") !== -1 ||
      responseData[bestResArray[i]].cuisine.indexOf("Italian") !== -1) {
        return bestResArray[i];
      }
    } 
    return bestResArray[Math.floor( Math.random() * bestResArray.length )];
  } else if (personality === "Materialistic") {
    //Looks through the potential choices for the one best
    //for someone materialistic. If none, chooses randomly.
    for (var i = 0; i < bestResArray.length; i ++) {
      if (responseData[bestResArray[i]].reservations === true && 
      responseData[bestResArray[i]].room_private === true) {
        return bestResArray[i];
      }
    } 
    return bestResArray[Math.floor( Math.random() * bestResArray.length )];
  } else if (personality === "Spiritual") {
    //Looks through the potential choices for the one best
    //for someone spiritual. If none, chooses randomly.
    for (var i = 0; i < bestResArray.length; i ++) {
      if (responseData[bestResArray[i]].attire === "streetwear" ||
      responseData[bestResArray[i]].attire === "casual" ||
      responseData[bestResArray[i]].attire === "business casual") {
        return bestResArray[i];
      }
    }
    return bestResArray[Math.floor( Math.random() * bestResArray.length )];
  }
}