App.Views.Users = Backbone.View.extend({
  //Needs el

  initialize: function() {
  	console.log('all users View');
    this.listenTo(this.collection, 'reset', this.renderAll);
    //Needs template
  },
  renderAll: function() {
    this.collection.each(this.renderOne.bind(this));
  },
  //This function below takes an argument - look at the interests view if you have questions
	renderOne: function(user) {
    this.$el.html( this.template( this.model.toJSON() ) );
	}
});