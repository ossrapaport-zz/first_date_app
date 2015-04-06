App.Views.Users = Backbone.View.extend({
   
   el: '#user-list',

     events: {
    'click .create-user':'createUser',
    'click .update-user':'updateUser',
  },

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
	},
  createUser: function() {
    var data = {
      username: this.$('.username').val(),
      date_of_birth: this.$('.dob').val(),
      location: this.$('.location').val(),
      personality: this.$('.personality').val(),
      password: this.$('.password').val()
    }
    App.users.create(data);
  },
  events: {
    'click .create-user':'createUser',
    'click .update-user':'updateUser',
  }
});