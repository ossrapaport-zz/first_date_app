App.Views.Users = Backbone.View.extend({
   el: '#user-list',

  initialize: function() {
  	console.log('all users View');
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.template = Handlebars.compile($('#user-list-template').html());

  },
  renderAll: function() {
    this.collection.each(this.renderOne.bind(this));
  },
	renderOne: function(user) {
  var compiledTemplate = this.template( user.toJSON() );
  this.$el.append( compiledTemplate.html() );
	}
});