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

    App.results = new App.Collections.Results();
  },
  routes: {
    "search/:userID": "userSearch",
    "newprofile": "newUser",
    "editprofile/:userID": "editUser",
    "profile/:userID": "showProfile",
    "result/:userID/:resultID": "searchResult", 
    "": "modalHome"
  },
  //TODO: Change route below
  newUser: function() {
    App.modalView.show();
    App.modalView.showNewUser();
  },
  editUser: function(userID) {
    App.modalView.hide();
    App.users.fetch({
      success: function() {
        var user = App.users.get(userID);
        App.userView.setUser(user);
        App.userView.editUser();
      }
    });
  },
  showProfile: function(userID) {
    App.modalView.hide();
    App.users.fetch({
      success: function() {
        var user = App.users.get(userID);
        App.userView.setUser(user);
      }
    });
  },
  userSearch: function(userID) {
    App.modalView.hide();
    App.searchView.render();
  },
  searchResult: function(userID, resultID) {
    App.modalView.hide();
    var result = App.results.get(resultID);
    App.resultView.setResult(result);
  },
  modalHome: function() {
    //$(".app-wrapper").empty();
    App.modalView.render();
  }
}) 