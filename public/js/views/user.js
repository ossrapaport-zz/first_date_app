App.Views.User = Backbone.View.extend({
  	el: '#single-user',

	initialize: function() {
		this.template = Handlebars.compile($('#single-user-template').html());
		this.listenTo(this.model, 'add', this.renderOne);

	},
	render: function() {
    var compiledTemplate = this.template( this.model.toJSON() );
		this.$el.html( compiledTemplate.html() );
	},
  	setUser: function(user) {
    this.model = user;
    this.render();
  }
});
