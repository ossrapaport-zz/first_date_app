App.Views.Interests = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.renderAll);
  },

  renderAll: function() {
    this.collection.each(this.renderOne, this)
  }
})