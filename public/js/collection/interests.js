App.Collection.Interests = Backbone.Collection.extend({
	initialize: function() {
		console.log('Interest Collection created');
	},	

  	url:'/interests',
	model: App.Models.Interest,

	getInterests: function() {
		$.ajax({
			url:'/interests',
			method: 'GET'
		})
		.done(this.addInterests.bind(this));
	},

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

