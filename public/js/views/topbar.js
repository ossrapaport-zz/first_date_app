App.Views.TopBar = Backbone.View.extend({
  el: "#header",

  initialize: function() {
    this.template = Handlebars.compile( $("#header-template").html() );
  },
  render: function() {
    this.$el.html(this.template);
  },
  toSearch: function() {
    var userID = parseInt( Backbone.history.fragment.split("/")[1] );
    /*App.searchView.render();
    debugger;*/
    App.router.navigate("search/" + userID, {trigger: true});
  },
  viewProfile: function() {
    var userID = parseInt( Backbone.history.fragment.split("/")[1] );
    var user = App.users.get(userID);
    App.userView.setUser(user);
    var route = "profile/" + userID;
    App.router.navigate(route, {trigger: true});
    debugger;
  },
  events: {
    "click .nav-search": "toSearch",
    "click .nav-profile": "viewProfile"  
  }
})