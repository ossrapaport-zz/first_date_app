App.Views.ModalView = Backbone.View.extend({
	el: '#account-modal',
	initialize: function() {
		//this.newUserTemplate = Handlebars.compile( $('#create-user-template').html() );
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
	exit: function() {
		this.undelegateEvents();
		this.stopListening();
	},
	showNewUser: function() {
		var newUserView = new App.Views.NewUser();
		newUserView.render();
		this.exit();
		/*
		this.$el.html( this.newUserTemplate );
		App.interestsView = new App.Views.Interests ({ collection: App.interests });
		App.interestsView.renderAll();
		this.delegateEvents();
		App.router.navigate("newprofile");*/
		//Event is delegated here. Otherwise it would be delegated on render
		//but the newTemplate wouldn't exist yet so it wouldn't work.
		//this.delegateEvents({"click #register-btn": "createNewUser"});
	},
  /*getCheckedBoxesID: function(checkboxName) {
    var findTerm = "[name=" + checkboxName + "]";
    var checkboxes = this.$el.find(findTerm);
    var checkedBoxesIDs = [];

    for (var i = 0; i < checkboxes.length; i++) {
       if (checkboxes[i].checked) {
          checkedBoxesIDs.push( parseInt( checkboxes[i].value) );
       }
    }
    return checkedBoxesIDs;
  },
	createNewUser: function() {
		console.log("I'm here");
		var userName = this.$el.find("#username").val().trim();
		var userPassword = this.$el.find("#password").val().trim();
		var usersName = this.$el.find("#name").val().trim();
		var userDOB = this.$el.find("#dob").val().trim();
		var personalityList = this.$el.find("#personality-list");
		var userPersonality = personalityList.find(":selected").text();
		var interestsIDArray = this.getCheckedBoxesID("interest-checkbox"); 
		var data = {
			username: userName,
			password: userPassword,
			name: usersName,
			date_of_birth: userDOB,
			personality: userPersonality
		};
		debugger;
		console.log(data);
		$.ajax({
			url: "/users",
			method: "POST",
			data: data
		}).done(function(newUserData) {
			var userID = newUserData.id;
			var count = 0;
			interestsIDArray.forEach(function(interestID) {
				count ++;
				$.ajax({
					url: "/users/" + userID + "/add_interest",
					method: "PUT",
					data: {
						interest_id: interestID
					}
				})
				if (count === interestsIDArray.length) {
					this.hide();
					App.searchView.render();
				}
			}.bind(this));
			App.router.navigate("/search/" + userID);
		}.bind(this));
	},*/
	events: {
		"click #create-acct-btn":"showNewUser"
	}
})
