$(function() {

  App.users = new App.Collections.Users;
  App.usersView = new App.Views.Users({ collection: App.users });
  App.users.fetch({ reset: true });

  App.interests = new App.Collections.Interests;
  App.interestsView = new App.Views.Interests({ collection: App.interests });
  App.interests.fetch({ reset: true });

  //TODO: initialize results collection App.results
});