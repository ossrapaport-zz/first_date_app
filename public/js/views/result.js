App.Views.Result = Backbone.View.extend({
	
  el: '.app-wrapper',
	
  initialize: function() {
		this.template = Handlebars.compile( $('#search-result-template').html() );
	},
	
  render: function() {
		this.$el.html(this.template( this.model.toJSON() ));
    var mapSRC = this.buildMapSRC(this.model.attributes.restaurant_name);
    this.$el.find("iframe").attr("src", mapSRC);
    
	},

  buildMapSRC: function(restaurantName) {
    var base = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCwnxlkHNmO8y1NFmMP2VnWhG2K271rBZ0&q=";
    var compiledSRC = base + encodeURI(restaurantName) + ",New+York+NY";
    return compiledSRC;
  },
  
  setResult: function(result) {
    this.model = result;
    this.render();
  },
  
  newSearch: function() {
    App.searchView.render();
    var userID = parseInt( Backbone.history.fragment.split("/")[1] );
    App.router.navigate("search/" + userID);
  },
  
  events: {
    "click .search-again-btn": "newSearch"
  }
})