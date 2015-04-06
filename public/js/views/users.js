App.Views.Users = Backbone.View.extend({
   
  el: '.user-list',

  initialize: function() {
  	console.log('all users View');
    this.listenTo(this.collection, 'reset', this.renderAll);
  },
  renderAll: function() {
    this.collection.each(this.renderOne);
  },
	renderOne: function(user) {
    var newUserView = new App.Views.UserList({ model: user });
    newUserView.render();
    this.$el.append(newUserView.$el);
	}
});