App.Views.TopBar = Backbone.View.extend({
  el: "#header",

  initialize: function() {
    this.template = Handlebars.compile( $("#header-template").html() );
  },
  render: function() {
    this.$el.html(this.template);
  },
  toSearch: function() {
    //TODO: Make this work
    var userID = Backbone.history.getFragment(userID);
    App.searchView.render();
    App.router.navigate("search/" + userID);
  },
  viewProfile: function() {
    //TODO: Make this work
    var userID = Backbone.history.getFragment(userID);
    var user = this.users.get(userID);
    App.userView.setUser(user);
    App.router.navigate("profile/" + userID);
  },
  events: {
    "click .nav-search": "toSearch",
    "click .nav-profile": "viewProfile"  
  }
})