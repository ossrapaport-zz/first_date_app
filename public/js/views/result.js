App.Views.Result = Backbone.View.extend({
	el: '.app-wrapper',
	initialize: function() {
		this.template = Handlebars.compile($('#search-result-template').html());
	},
	render: function() {
		this.$el.html(this.template( this.model.toJSON() ));
	},
  setResult: function(result) {
    this.model = result;
    this.render();
  }
})