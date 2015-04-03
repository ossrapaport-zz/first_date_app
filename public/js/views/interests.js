App.Views.Interests = Backbone.View.extend({

  el: '#interests',

  initialize: function() {
  	console.log('All Interests view');
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.listenTo(this.collection, 'add', this.renderOne);
    this.template = Handlebars.compile($('#interest-list-template').html());
    //Preference not to render immediately, so below is commented
    //this.renderAll();
  },
  renderAll: function() {
    this.$el.empty();
    this.collection.each(this.renderOne.bind(this));
  },
  renderOne: function(interest) {
  var compiledTemplate = this.template( interest.toJSON() );
  this.$el.append( compiledTemplate.html() );
	}
});