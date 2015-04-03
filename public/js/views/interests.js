App.Views.Interests = Backbone.View.extend({
  initialize: function() {
  	console.log('all interests view')
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.listenTo(this.collection, 'add', this.renderOne);
    //We need a template for each interest for the date and user to choose.
  },

  renderAll: function() {
  	console.log('')
    this.collection.each(this.renderOne, this);
  },
	//We would never need this function because it actually destroys a model.
	//We would want to add and remove a template view of a model on click.
  delete: function() {
    this.model.destroy();
  },
	//Maybe move this one up after removing delete, and it should take an argument "model" 
  renderOne: function() {
  	//Template is used here
	this.$el.html(this.template(this.model.toJSON() ));
	}
});
