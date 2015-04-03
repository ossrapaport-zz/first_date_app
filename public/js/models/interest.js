var App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {}
};

App.Models.Interest = Backbone.Model.extend({
	initialize: function() {
		console.log("New Interest Model created");
	},
	defaults: {
		name: 'Name',
		type: 'Type'
	}

});

