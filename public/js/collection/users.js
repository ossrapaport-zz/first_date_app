App.Collections.Users = Backbone.Collections.extend({
	 
  //Needs initialize function
  url: '/users',
	model: App.Models.User
})