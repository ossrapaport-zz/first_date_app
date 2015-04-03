App.Views.Users = Backbone.View.extend({
  initialize: function() {
  	console.log('all users View');
    this.listenTo(this.collection, 'reset', this.renderAll);
  },

  renderAll: function() {
    this.collection.each(this.renderOne, this)
  }

	renderOne: function() {
    this.$el.html( this.template(this.model.toJSON()) );
	}
});