App.Views.User = Backbone.View.extend({
  
  el: '.app-wrapper',

	initialize: function() {
		this.template = Handlebars.compile($('#single-user').html());
		this.listenTo(this.model, 'add', this.renderOne);
    //TODO: Make edit template
    this.editTemplate = Handlebars.compile($("#edit-user-template").html());
	},
	render: function() {
    var compiledTemplate = this.template( this.model );
		this.$el.html( compiledTemplate.html() );
	},
  setUser: function(user) {
    this.model = user;
    debugger;
    this.render();
  },
  editUser: function() {
    this.$el.html(this.editTemplate( this.model.toJSON() ));
    App.router.navigate("editprofile/" + this.model.id);
  },
  updateUser: function() {
    this.model.save({
      username: this.$('.username').val(),
      date_of_birth: this.$('.dob').val(),
      location: this.$('.location').val(),
      personality: this.$('.personality').val(),
      password: this.$('.password').val()
    });
    App.router.navigate("profile/" + this.model.id);
  },
  events: {
    "click .edit-user": "editUser",
    "click .update-user": "updateUser",
  }
});
