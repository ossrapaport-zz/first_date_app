App.Views.NewUser = Backbone.View.extend({

  initialize: function() {
    this.template = Handlebars.compile( $('#create-user-template').html() );
    this.render();
  },
  render: function() {
    this.$el.html( this.template );
  },
  getCheckedBoxesID: function(checkboxName) {
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
  createNewUser: function(event) {
    var userName = this.$el.find("#username").val().trim();
    var userPassword = this.$el.find("#password").val().trim();
    var usersName = this.$el.find("#name").val().trim();
    var userDOB = this.$el.find("#dob").val().trim();
    var personalityList = this.$el.find("#personality-list");
    var userPersonality = personalityList.find(":selected").text();
    var interestsIDArray = this.getCheckedBoxesID("interest-checkbox"); 
    var locationList = this.$el.find("#neighborhood-list");
    var userLocation = locationList.find(":selected").text();
    
    var data = {
      username: userName,
      password: userPassword,
      name: usersName,
      date_of_birth: userDOB,
      personality: userPersonality,
      location: userLocation
    };

    App.users.create(data, {
      success: function(data) {
        debugger
        var userID = data.id;
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
            App.searchView.render();
            App.modalView.hide();
          }
        }.bind(this));
        App.router.navigate("/search/" + userID);
      }
    });
  },
  events: {
    "click #register-btn": "createNewUser"
  }
});