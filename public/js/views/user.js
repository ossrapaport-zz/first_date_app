App.Views.User = Backbone.View.extend({
  	el: '#single-user',

	initialize: function() {
		this.template = Handlebars.compile($('#single-user-template').html());
		this.listenTo(this.model, 'add', this.renderOne);
    //TODO: Make edit template
    this.editTemplate = Handlebars.compile($("#SOME_TEMPLATE").html());
	},
	render: function() {
    var compiledTemplate = this.template( this.model.toJSON() );
		this.$el.html( compiledTemplate.html() );
	},
  setUser: function(user) {
    this.model = user;
    this.render();
  },
  editUser: function() {
    this.$el.html(this.editTemplate( this.model.toJSON() ));
  },
  updateUser: function() {
    this.model.save({
      username: this.$('.username').val(),
      date_of_birth: this.$('.dob').val(),
      location: this.$('.location').val(),
      personality: this.$('.personality').val(),
      password: this.$('.password').val()
    });
  },
  events: {
    "click .edit-user": "editUser",
    "click .update-user": "updateUser",
  }
});
