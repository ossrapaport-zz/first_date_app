App.Views.Interests = Backbone.View.extend({

  el: '#interests',

  initialize: function() {
  	console.log('all interests view');
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.listenTo(this.collection, 'add', this.renderOne);
    this.template = Handlebars.compile($('#interest-list-template').html());
    this.render();
  },
  renderAll: function() {
    this.$el.empty();
    this.collection.each(this.renderOne, this)
  },
  renderOne: function() {
  this.$el.append(new App.Views.Interest({model: interest}).$el);
	},
    events: {
    'click .add':'addInterest',
    'click .remove': 'deleteIterest',
  },

  // Need to add "addInterest" and "deleteIterest" functions


});