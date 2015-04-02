App.Views.Interests = Backbone.View.extend({
  initialize: function() {
  	console.log('all interests view')
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.listenTo(this.collection, 'add', this.renderOne);
  },

  renderAll: function() {
  	console.log('')
    this.collection.each(this.renderOne, this);
  },

  delete: function() {
    this.model.destroy();
  },

  renderOne: function() {
	this.$el.html(this.template(this.model.toJSON() ));
	}
});