App.Routers.Main = Backbone.Router.extend({

  initialize: function() {
    console.log("New router initialized");
    //TODO: Move initialize from app to here
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
    //TODO: Check name of modal and that show is a function
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