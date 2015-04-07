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
    App.searchView.render();
    App.router.navigate("search/" + userID, {trigger: true});
  },
  viewProfile: function() {
    var userID = parseInt( Backbone.history.fragment.split("/")[1] );
    App.router.navigate("profile/" + userID, {trigger: true});
  },
  events: {
    "click .nav-search": "toSearch",
    "click .nav-profile": "viewProfile"  
  }
})