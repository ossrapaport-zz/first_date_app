App.Views.Search = Backbone.View.extend({
  el: ".app-wrapper",

  initialize: function() {
    this.template = Handlebars.compile($("#search-template").html());
  },
  render: function() {
    this.$el.empty();
    this.$el.append(this.template.html());
    App.interestsView.renderAll();
  },
  getCheckedBoxesID: function(checkboxName) {
    var checkboxes = this.getElementsByName(checkboxName);
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
    var dateName = this.find("#date-name").val();
    var personalityList = this.find("#personality-list");
    var datePersonality = personalityList.options[personalityList.selectedIndex].value;
    var interestsIDArray = this.getCheckedBoxesID("interest-checkbox");
    var neighborhoodList = this.find("#neighborhood-list");
    var neighborhood = encodeURI( neighborhoodList.options[neighborhoodList.selectedIndex].text );
    var priceList = this.find("#price-list");
    var price = parseInt( priceList.options[priceList.selectedIndex].value );
    var baseURL = "/date_and_search/" + price + "/" + neighborhood;
    //Makes AJAX request with those attributes as data
    $.ajax({
      url: baseURL,
      method: "POST",
      data: {
        firstName: dateName,
        personality: datePersonality,
        interests_ids: interestsIDArray
      }
    })
    .done(this.fleshOutResult);
  },
  //Gets more information about the restaurant with Yelp
  fleshOutResult: function(data) {
    //TODO: Remove number and website
    var restaurantName = encodeURI( data.name );
    var telephoneNumber = data.tel;
    var restaurantWebsite = data.website;
    var neighborhood = encodeURI( data.neighborhood[0] );
    var baseURL = "/yelp_for_more/" + restaurantName + "/" + neighborhood;
    $.ajax({
      url: baseURL,
      method: "GET",
    }).done(this.displayResult);
  },
  //Takes Yelp data and makes a new result model from it.
  //Then, renders the model.
  displayResult: function(data) {
    //TODO: Somehow get ID from router for the data 
    var restaurantInfo = data.business[0];
    var resultData = {
      restaurant_name: restaurantInfo.name,
      yelp_image_url: restaurantInfo.image_url,
      yelp_snippet_image_url: restaurantInfo.snippet_image_url,
      description: restaurantInfo.snippet_text.split(".")[0] + ".",
      telephone_number: restaurantInfo.display_phone,
      address: restaurantInfo.location.display_address.join(", ") 
    }
    App.results.create(resultData);
    var newResultView = new App.Views.Result ({ model: App.results.last() });
    newResultView.render();
  },
  events: {
    "click .search-btn": "searchForAResult"
  }
})