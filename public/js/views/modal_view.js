App.Views.ModalView = Backbone.View.extend({
	el: '#account-modal',
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.newUserTemplate = Handlebars.compile($('#create-user-template').html());
		this.template = Handlebars.compile($('#account-modal-template').html());
		
	},

	events: {
		'click #create-acct-btn':'createNewUser'

	},

	createNewUser: function() {
		this.$el.fadeOut(300);
		var newUserView = new App.Views.User({ model: user });
		newUserView.$el.appendTo($('#account-modal'));

	},

	showExistingUsers: function() {
		App.user.fetch();
	},

	show: function() {
		this.$el.fadeIn(500);
	},

	hide: function() {
		this.$el.fadeOut(200);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.showExistingUsers();
		this.show();
	}
})