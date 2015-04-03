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
	},
	
	getInterests: function() {
			$.ajax({
				url:'/interests',
				method: 'GET'
			})
			.done(this.addInterests.bind(this));
		},
	//No need for the code below
	addInterests: function(interests) {
		console.log('adding interests');
		App.Interests.reset();
		interests.forEach(function(interest) {
			App.Interests.add ({
				name: interest.name,
				type: interest.type
			});
		})
	}

})
