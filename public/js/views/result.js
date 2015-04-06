App.Views.Result = Backbone.View.extend({
	el: '#search-result',
	initialize: function() {
		this.template = Handlebars.compile($('#search-result-template').html());
	},
	render: function() {
		this.$el.empty();
		this.$el.html(this.template( this.model.toJSON() ));
	}
})