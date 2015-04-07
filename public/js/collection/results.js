App.Collections.Results = Backbone.Collection.extend({
	model: App.Models.Result,

	initialized: function(){
		console.log("Result collection created")
	},
	url: '/results',
  model: App.Models.Result
})