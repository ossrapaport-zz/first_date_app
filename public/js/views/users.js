App.Views.Users = Backbone.View.extend({
	//Needs an el
  initialize: function() {
  	console.log('all users View');
    this.listenTo(this.collection, 'reset', this.renderAll);
    //Needs a template
  },

  renderAll: function() {
    this.collection.each(this.renderOne, this)
  }
}),
	//Needs to take an argument "user". Also you want to append, not set the html.
	renderOne: function() {
		this.$el.html(this.template(this.model.toJSON() ));
	}
});
