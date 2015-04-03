App.Models.User = Backbone.Model.extend({
	initialize: function() {
		console.log("New User Model created");
	},
	defaults: {
		username: 'username',
		name: 'name',
		date_of_birth: 'date of birth',
		location: 'location',
		personality: 'personality',
		password: 'password'
	}

});
