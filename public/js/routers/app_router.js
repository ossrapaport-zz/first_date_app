App.Routers.Main = Backbone.Router.extend({

  initialize: function() {
    console.log("New router initialized");

    App.topBar = new App.Views.TopBar();
    App.topBar.render();

    App.users = new App.Collections.Users;
    App.users.fetch({ reset: true });

    App.interests = new App.Collections.Interests;
    App.interests.fetch({ reset: true });

    App.userView = new App.Views.User({ model: new App.Models.User });

    App.modalView = new App.Views.ModalView();
    App.modalView.render();

    App.searchView = new App.Views.Search();
  },
  routes: {
    "": "modalHome",
    "newprofile": "newUser",
    "editprofile/:userID": "editUser",
    "profile/:userID": "showProfile",
    "search/:userID": "userSearch",
    "result/:userID/:resultID": "searchResult" 
  },
  modalHome: function() {
    //$(".app-wrapper").empty();
    App.modalView.render();
  },
  newUser: function() {
    App.modalView.show();
    App.modalView.newUser();
  },
  editUser: function(userID) {
    App.modalView.hide();
    var user = App.users.get(userID);
    App.userView.setUser(user);
    userView.editUser();
  },
  showProfile: function(userID) {
    App.modalView.hide();
    var user = App.users.get(userID);
    App.userView.setUser(user);
  },
  userSearch: function(userID) {
    App.modalView.hide();
    App.searchView.render();
  },
  searchResult: function(userID, resultID) {
    App.modalView.hide();
    var result = App.results.get(resultID);
    App.resultView.setResult(result);
  }
}) 