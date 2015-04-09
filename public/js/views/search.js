App.Views.Search = Backbone.View.extend({
  
  el: ".app-wrapper",

  initialize: function() {
    this.template = Handlebars.compile( $("#search-template").html() );
    this.errorTemplate = Handlebars.compile( $("#error-template").html() );
  },
  
  render: function() {
    this.$el.html(this.template);
    App.interestsView = new App.Views.Interests ({ collection: App.interests });
    App.interestsView.renderAll();
  },
  
  //Finds which interest boxes are checked
  getCheckedBoxesID: function(checkboxName) {
    var findTerm = "[name=" + checkboxName + "]";
    var checkboxes = this.$el.find(findTerm);
    var checkedBoxesIDs = [];

    for (var i = 0; i < checkboxes.length; i++) {
       if (checkboxes[i].checked) {
          checkedBoxesIDs.push( parseInt( checkboxes[i].value) );
       }
    }
    return checkedBoxesIDs;
  },

  //Gets the date's name, personality, and interests
  getDateData: function() {
    var dateName = this.$el.find("#date-name").val();
    var personalityList = this.$el.find("#personality-list");
    var datePersonality = personalityList.find(":selected").text();
    var interestsIDArray = this.getCheckedBoxesID("interest-checkbox");
    var data = {
      firstName: dateName,
      personality: datePersonality,
      interest_ids: interestsIDArray  
    };
    return data;
  },

  //Builds the AJAX url with date and neighborhood
  buildFactualURL: function() {
    var neighborhoodList = this.$el.find("#neighborhood-list");
    var neighborhood = encodeURI( neighborhoodList.find(":selected").text() );
    var priceList = this.$el.find("#price-list");
    var price = parseInt( priceList.find(":selected").val() );
    var baseURL = "/date_and_search/" + price + "/" + neighborhood;
    return baseURL;
  },

  //Gets the potential neighborhoods for this restaurant
  getRestaurantNeighborhoods: function(data) {
    var neighborhood1 = encodeURI( data.neighborhood[0] );
    var neighborhood2 = encodeURI( data.neighborhood[1] );
    if (data.neighborhood[2] === undefined) {
      var neighborhood3 = "notest";
    } else {
      var neighborhood3 = encodeURI( data.neighborhood[2] );
    }
    return [neighborhood1, neighborhood2, neighborhood3];
  },

  //Builds URL for Yelp section from the name and neighborhoods
  buildYelpURL: function(restaurantName, resNeighborhoodArray) {
    var baseURL = "/yelp_for_more/" + restaurantName + "/" + 
    resNeighborhoodArray[0] + "/" + resNeighborhoodArray[1]
    + "/" + resNeighborhoodArray[2];
    return baseURL;
  },

  //Get data from Yelp AJAX call for result model
  getResultData: function(data) {
    var restaurantInfo = data.businesses[0];
    var resultData = {
      restaurant_name: restaurantInfo.name,
      yelp_image_url: restaurantInfo.image_url,
      yelp_snippet_image_url: restaurantInfo.snippet_image_url,
      description: restaurantInfo.snippet_text.split(".")[0] + ".",
      telephone_number: restaurantInfo.display_phone,
      address: restaurantInfo.location.display_address.join(", "),
      website: restaurantInfo.url 
    }
    return resultData;  
  },

  
  //Searches based on the description of the date
  searchForAResult: function() {
    this.userID = parseInt( Backbone.history.fragment.split("/")[1] );
    var baseURL = this.buildFactualURL();
    var dateInfo = this.getDateData();

    //Makes AJAX post request to create date and search
    $.ajax({
      url: baseURL,
      method: "POST",
      data: dateInfo
    })
    .done(this.fleshOutResult.bind(this));
  },
  
  //Gets more information about the restaurant with Yelp
  fleshOutResult: function(data) {
    //Implement error handling in case of no result
    if (data === "") {
      this.$el.html(this.errorTemplate);
      return;
    }

    var restaurantName = encodeURI( data.name );
    var restaurantNeighborhoodArray = this.getRestaurantNeighborhoods(data);
    var yelpURL = this.buildYelpURL(restaurantName, restaurantNeighborhoodArray);
    
    $.ajax({
      url: yelpURL,
      method: "GET"
    }).done(this.displayResult.bind(this));
  },
  
  //Takes Yelp data, makes a new result model, and renders it
  displayResult: function(data) {
    var currentID = this.userID;
    var baseURL = "/users/" + currentID + "/results";
    var resultData = this.getResultData(data);
    
    $.ajax({
      url: baseURL,
      method: "POST",
      data: resultData 
    }).done(this.renderNewResult.bind(this));
  },
  
  //Takes the new result, adds it, and then renders it
  renderNewResult: function(newResultData) {
    App.results.add(newResultData);
    var newResultView = new App.Views.Result ({ model: App.results.last() });
    var resultID = newResultData.id;
    newResultView.render();
    var mapSRC = this.buildMapSRC(newResultData.restaurant_name);
    newResultView.$el.find("iframe").attr("src", mapSRC);
    App.router.navigate("search/" + this.userID + "/" + resultID);
  },

  //Builds the SRC for the Google Map iframe
  buildMapSRC: function(restaurantName) {
    var base = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCwnxlkHNmO8y1NFmMP2VnWhG2K271rBZ0&q=";
    var compiledSRC = base + encodeURI(restaurantName) + ",New+York+NY";
    return compiledSRC;
  },
  
  //Goes to a new search page on click
  newSearch: function() {
    this.render();
    var userID = parseInt( Backbone.history.fragment.split("/")[1] );
    App.router.navigate("search/" + userID);
  },
  
  events: {
    "click .search-btn": "searchForAResult",
    "click .search-again-btn": "newSearch"
  }
})