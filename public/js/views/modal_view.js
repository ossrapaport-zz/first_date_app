App.Views.ModalView = Backbone.View.extend({
	el: '#account-modal',
	initialize: function() {
		this.newUserTemplate = Handlebars.compile( $('#create-user-template').html() );
		this.template = Handlebars.compile( $('#account-modal-template').html() );
	},
	showExistingUsers: function() {
		App.users.fetch();
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
	},
	showNewUser: function() {
		this.$el.html( this.newUserTemplate.html() );
	},
	createNewUser: function() {
		var userName = this.$el.find( $("#username").val() );
		var userPassword = this.$el.find( $("#password").val() )
		var usersName = this.$el.find( $("#name").val() );
		var userDOB = this.$el.find("#dob").val();
		var personalityList = this.$el.find("#personality-list");
		var userPersonality = personalityList.options[personalityList.selectedIndex].value;
		var interestsIDArray = this.getCheckedBoxesID("interest-checkbox"); 
		var data = {
			username: userName,
			password: userPassword,
			name: usersName,
			date_of_birth: userDOB,
			personality: userPersonality
		};
		App.users.create(data);
		var userID = App.users.last().id;
		var count = 0;
		interestsIDArray.forEach(function(interestID) {
			count ++;
			$.ajax({
				url: "/users" + userID + "/add_interest",
				method: "PUT",
				data: {
					interest_id: interestID
				}
			})
			if (count === interestsIDArray.length) {
				App.searchView.render();
				//TODO: Check what this is here
				this.hide();
			}
		}).bind(this);
		App.router.navigate("/search" + userID);
	},
	events: {
		'click #create-acct-btn':'showNewUser',
		"click #register-btn": "createNewUser"
	}
})
