App.Models.Result = Backbone.Model.extend({
	initialized: function(){
		console.log("Result Model Created")
	},
	defaults: {
		name: "Name",
		address: "Address",
		phoneNumber: "Number",
		website: "website"
	}
});