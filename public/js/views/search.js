App.Views.Search = Backbone.View.extend({
  el: ".app-wrapper",

  initialize: function() {
    this.template = Handlebars.compile($("#search-template").html());
  },
  render: function() {
    this.$el.html(this.template);
    App.interestsView = new App.Views.Interests ({ collection: App.interests });
    App.interestsView.renderAll();
    //Saves user id for later use
  },
  getCheckedBoxesID: function(checkboxName) {
<<<<<<< HEAD
    console.log(checkboxName);
    var checkboxes = this.getElementsByName(checkboxName);
=======
    var findTerm = "[name=" + checkboxName + "]";
    var checkboxes = this.$el.find(findTerm);
>>>>>>> b3014e1c7f61804d823b405123ab81da3b576fdc
    var checkedBoxesIDs = [];

    for (var i = 0; i < checkboxes.length; i++) {
       if (checkboxes[i].checked) {
          checkedBoxesIDs.push( parseInt( checkboxes[i].value) );
       }
    }
    return checkedBoxesIDs;
  },
  //Searches based on interests
  searchForAResult: function() {
    //Takes the name, personality, neighborhood, interests,
    // and price and uses those to search.
    //TODO: check date name
    this.userID = parseInt( Backbone.history.fragment.split("/")[1] );
    var dateName = this.$el.find("#date-name").val();
    var personalityList = this.$el.find("#personality-list");
    var datePersonality = personalityList.find(":selected").text();
    var neighborhoodList = this.$el.find("#neighborhood-list");
    var neighborhood = encodeURI( neighborhoodList.find(":selected").text() );
    var priceList = this.$el.find("#price-list");
    var price = parseInt( priceList.find(":selected").val() );
    //See how to use interestsIDArray because its a nested nested view.
    var interestsIDArray = this.getCheckedBoxesID("interest-checkbox");
    var baseURL = "/date_and_search/" + price + "/" + neighborhood;
    //Makes AJAX request with those attributes as data
    $.ajax({
      url: baseURL,
      method: "POST",
      data: {
        firstName: dateName,
        personality: datePersonality,
        interest_ids: interestsIDArray
      }
    })
    .done(this.fleshOutResult.bind(this));
  },
  //Gets more information about the restaurant with Yelp
  fleshOutResult: function(data) {
    var restaurantName = encodeURI( data.name );
    var neighborhood1 = encodeURI( data.neighborhood[0] );
    var neighborhood2 = encodeURI( data.neighborhood[1] );
    if (data.neighborhood[2] === undefined) {
      var neighborhood3 = notest;
    } else {
      var neighborhood3 = encodeURI( data.neighborhood[2] );
    }
    var baseURL = "/yelp_for_more/" + restaurantName + "/" + neighborhood1 + "/" + neighborhood2 + "/" + neighborhood3;
    $.ajax({
      url: baseURL,
      method: "GET"
    }).done(this.displayResult.bind(this));
  },
  //Takes Yelp data and makes a new result model from it.
  //Then, renders the model.
  displayResult: function(data) {
    var currentID = this.userID; 
    console.log(currentID);
    var restaurantInfo = data.businesses[0];
    var resultData = {
      restaurant_name: restaurantInfo.name,
      yelp_image_url: restaurantInfo.image_url,
      yelp_snippet_image_url: restaurantInfo.snippet_image_url,
      description: restaurantInfo.snippet_text.split(".")[0] + ".",
      telephone_number: restaurantInfo.display_phone,
      address: restaurantInfo.location.display_address.join(", ") 
    }
    var baseURL = "/users/" + currentID + "/results";
    $.ajax({
      url: baseURL,
      method: "POST",
      data: resultData 
    }).done(function(newResult) {
      App.results.create(newResult);
      var newResultView = new App.Views.Result ({ model: App.results.last() });
      var resultID = App.results.last().id;
      newResultView.render();
      App.router.navigate("search/" + this.userID + "/" + resultID);
    }.bind(this));
  },
  events: {
    "click .search-btn": "searchForAResult"
  }
})