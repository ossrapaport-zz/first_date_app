$(function() {

  App.users = new App.Collections.Users;
  App.usersView = new App.Views.users({ collection: App.users });

  App.users.fetch({ reset: true });

});