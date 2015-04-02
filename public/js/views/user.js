App.Views.User = Backbone.View.extend({
	initialize: function() {
		console.log('single user view')
		this.template = Handlebars.compile($(#single-user-template).html());
		this.listenTo(this.model, 'add', this.renderOne);
		this.render();
	},
	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
	},
 
  	setUser: function() {
  		this.model.set(user.toJSON() );
  		this.model.getUser();
  	},

  	updateUser: function(updatedUser) {
  		var updateThis = updatedUser.id;
  		var newUpdatedUser = App.collection.findWhere({id: updateThis});
  		newUpdatedUser.set({
  			username: user.username,
				name: user.name,
				date_of_birth: user.date_of_birth,
				personality: user.personality,
				password: user.password
			});
  	}

});