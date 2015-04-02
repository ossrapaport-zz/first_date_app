App.Views.Users = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.renderAll);
    //Functions to listen for adding and deleting models
  },

  renderAll: function() {
    this.collection.each(this.renderOne, this)
  }
  //Functions to make: renderOne and createNewUser
})