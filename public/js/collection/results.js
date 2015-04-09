App.Collections.Results = Backbone.Collection.extend({

	initialize: function() {
		console.log("Result collection created");
	},

	url: '/results',
  
  model: App.Models.Result
})