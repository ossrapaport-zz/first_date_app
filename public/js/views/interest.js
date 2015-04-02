// We may not need single interest view
App.Views.Interest = Backbone.View.extend({
	initialize: function() {
		this.template = Handlebars.compile($('#interest-template').html());
		this.render();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON() ));
	}
})