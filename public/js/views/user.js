App.Views.User = Backbone.View.extend({
	initialize: function() {
		this.template = Handlebars.compile($(/*Place class or id name*/).html());
		this.render();
	},
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) )
	}
})