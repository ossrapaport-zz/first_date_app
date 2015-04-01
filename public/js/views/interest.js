App.Views.Interest = Backbone.View.extend({
	initialize: function() {
		this.template = Handlebars.compile($(/*Place class or id name*/).html());
		this.render();
	},

	fetch: function(){

	},

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) )
	}
})