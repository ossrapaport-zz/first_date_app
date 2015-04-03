App.Collections.Users = Backbone.Collection.extend({
	 initialize: function() {
		console.log('Search Collection created');
	},

  	url: '/users',
	model: App.Models.User,
})
