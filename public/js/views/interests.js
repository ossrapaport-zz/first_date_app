App.Views.Interests = Backbone.View.extend({

  el: '.interest-list',

  initialize: function() {
  	console.log('All Interests view');
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.listenTo(this.collection, 'add', this.renderOne);
    this.template = Handlebars.compile($('#interest-list-template').html());
  },
  renderAll: function() {
    this.collection.each(this.renderOne.bind(this));
  },
  renderOne: function(interest) {
  var compiledTemplate = this.template( interest.toJSON() );
  this.$el.append( compiledTemplate.html() );
	}
});