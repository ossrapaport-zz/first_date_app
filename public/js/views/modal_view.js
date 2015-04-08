App.Views.ModalView = Backbone.View.extend({
	el: '#account-modal',
	initialize: function() {
		this.template = Handlebars.compile( $('#account-modal-template').html() );
	},
	show: function() {
		this.$el.fadeIn(500);
	},
	hide: function() {
		this.$el.fadeOut(200);
	},
	render: function() {
		this.$el.html(this.template);
		App.usersView = new App.Views.Users({ collection: App.users });
		App.usersView.renderAll();
		this.show();
	},
	showNewUser: function() {
		App.router.navigate("newprofile");
		this.$el.html( new App.Views.NewUser().$el );
    App.interestsView = new App.Views.Interests({ collection: App.interests });
    App.interestsView.renderAll();
	},
	events: {
		"click #create-acct-btn":"showNewUser"
	}
})
