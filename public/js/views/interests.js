App.Views.Interests = Backbone.View.extend({

  el: '.interest-list',

  initialize: function() {
  	console.log('All Interests view');
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.listenTo(this.collection, 'add', this.renderOne);
  },
  renderAll: function() {
    this.collection.each(this.renderOne.bind(this));
  },
  renderOne: function(interest) {
    var newInterestView = new App.Views.InterestList({ model: interest });
    newInterestView.render();
    this.$el.append(newInterestView.$el);
	}
});