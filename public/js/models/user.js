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
	},
	
	getUsers: function() {
		console.log('getting users');
		$.ajax({
			url: '/users',
			method: 'GET'
		})
		.done(this.addUsers.bind(this));
	},

	addUsers: function() {
		console.log('adding user');
		App.Users.reset();
		users.forEach(function(user) {
			App.users.add({
				username: user.username,
				name: user.name,
				date_of_birth: user.date_of_birth,
				personality: user.personality,
				password: user.password
			});
		})
	}

})
