App.Views.Result = Backbone.View.extend({
	el: '#search-result',
	initialize: function() {
		this.template = Handlebars.compile($('#search-result').html());
		this.render();
	},
	render: function() {
		$('#search-results').empty();
		this.$el.html(this.template(this.model.toJSON()))

	}
})