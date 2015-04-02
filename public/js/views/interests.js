App.Views.Interests = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.renderAll);
    //Set up functions for add and delete models
  },

  renderAll: function() {
    this.collection.each(this.renderOne, this);
  },
  //Define renderOne function that takes an argument
})