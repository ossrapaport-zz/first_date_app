App.Collections.Users = Backbone.Collections.extend({
	 initialize: function() {
		console.log('Search Collection created');
	},

  	url: '/users',
	model: App.Models.User,

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
