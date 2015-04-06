App.Routers.Main = Backbone.Router.extend({

  initialize: function() {
    console.log("New router initialized");

    App.topBar = new App.Views.TopBar

    App.users = new App.Collections.Users;
    App.usersView = new App.Views.Users({ collection: App.users });
    App.users.fetch({ reset: true });

    App.interests = new App.Collections.Interests;
    App.interestsView = new App.Views.Interests({ collection: App.interests });
    App.interests.fetch({ reset: true });

    App.userView = new App.Views.User({ model: new App.Models.User });

    App.modalView = new App.Views.ModalView();

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
    App.modalView.show();
    $(".app-wrapper").empty();
  },
  newUser: function() {
    App.modalView.show();
    App.modalView.newUser();
  },
  editUser: function(userID) {
    var user = App.users.get(userID);
    //TODO: Make App.userView onload
    App.userView.setUser(user);
    userView.editUser();
  },
  showProfile: function(userID) {
    //TODO: Make empty App.userView onload
    var user = App.users.get(userID);
    App.userView.setUser(user);
  },
  userSearch: function(userID) {
    //TODO: Make searchView, not rendered, onload
    App.searchView.render();
  },
  searchResult: function(userID, resultID) {
    var result = App.results.get(resultID);
    App.resultView.setResult(result);
  }
}) 