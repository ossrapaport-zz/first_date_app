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
  searchForAResult: function() {
    //HOW TO GET ALL OF THESE??
    var dateName = this.find("");
    var personalityList = this.find("#personality-list");
    var datePersonality = personalityList.options[personalityList.selectedIndex].value;
    var interestsIDArray = this.getCheckedBoxesID("interest-checkbox");
    var neighborhoodList = this.find("#neighborhood-list");
    var neighborhood = encodeURI( neighborhoodList.options[neighborhoodList.selectedIndex].text );
    var priceList = this.find("#price-list");
    var price = parseInt( priceList.options[priceList.selectedIndex].value );
    var baseURL = "/date_and_search/" + price + "/" + neighborhood;
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
  fleshOutResult: function(data) {
    var restaurantName = data.name;
    var telephoneNumber = data.tel;
    var restaurantWebsite = data.website;
    var neighborhood = data.neighborhood[0];
      
  }
  events: {
    "click .search-btn": "searchForAResult"
  }
})







