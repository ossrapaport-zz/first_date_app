//TODO: Look at this with McK

App.Views.NewUser = Backbone.View.extend({

  el: "#account-modal",
  initialize: function() {
    this.template = Handlebars.compile( $('#create-user-template').html() );
  },
  render: function() {
    this.$el.empty();
    this.$el.html( this.template );
    //this.delegateEvents({"click #register-btn": "createNewUser"});
    App.interestsView = new App.Views.Interests ({ collection: App.interests });
    App.interestsView.renderAll();
    App.router.navigate("newprofile");
  },
  show: function() {
    this.$el.show();
  },
  hide: function() {
    this.$el.fadeOut(200);
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
  createNewUser: function() {
    debugger
    console.log("I'm here");
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
  },
  testFn: function() {
    console.log("Tested");
  }
});