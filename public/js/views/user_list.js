App.Views.UserList = Backbone.View.extend({
  initialize: function() {
    this.template = Handlebars.compile($('#user-list-template').html());  
  },
  render: function() {
    var compiledTemplate = this.template( this.model.toJSON() );
    this.$el.html(compiledTemplate);
  },
  selectUser: function() {
    App.searchView.render();
    App.modalView.hide();
    App.router.navigate("search/" + this.model.id);
  },
  events: {
    "click .user-li": "selectUser"
  }
});