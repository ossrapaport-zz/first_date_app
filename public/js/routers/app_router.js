App.Routers.Main = Backbone.Router.extend({

  initialize: function() {
    console.log("New router initialized");
    //TODO: Move initialize from app to here
  },
  routes: {
    "": "modalHome",
    "newprofile": "newUser",
    "editprofile/:id": "editUser",
    "profile/:id": "showProfile",
    "search/:id": "userSearch",
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
  editUser: function(id) {
    var user = App.users.get(id);
    //TODO: See if this should be new or use setUser
    //setUser will have less views hanging around
    App.userView.setUser(user);
    userView.editUser();
  },
  showProfile: function(id) {
    //TODO: Make empty App.userView somewhere
    var user = App.users.get(id);
    App.userView.setUser(user);
  },
  userSearch: function(id) {
    //TODO: Make searchView, not rendered, somewhere
    App.searchView.render();
  },
  searchResult: function(userID, resultID) {
    var result = App.results.get(resultID);
    App.resultView.setResult(result);
  }
}) 