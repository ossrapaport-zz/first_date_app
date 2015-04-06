var App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {}
};

$(function() {

  console.log("loaded up");
  App.router = new App.Routers.Main();
  Backbone.history.start();
  
});