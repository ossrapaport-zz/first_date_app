App.Collections.Interests = Backbone.Collection.extend({
	initialize: function() {
		console.log('Interest Collection created');
	},	
  	url:'/interests',
	model: App.Models.Interest,
})