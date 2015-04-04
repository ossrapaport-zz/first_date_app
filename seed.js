var models = require('./models');
var Interest = models.interests;


var interest = [
  {
  	name:["Outdoorsy", "Art Fanatic", "Always Working Out", "Always Dieting", "Foodie", "Adventurous", "Excitable", "Witty", "Cute", "Gentle", "Hilarious", "Boring", "Bland", "Meh", "I Can't Stop Looking", "Just Gets Me", "Talkative", "Aggressive", "Vegan", "Vegetarian", "Gluten Free", "Paleo", "Loves Farm to Table", "The One"],
  	type:["vegan", "healthy", "vegetarian", "outdoors", "loud", "quiet", "exotic", "top-class", "organic", "gluten-free"]
  }

]

var seedDatabase = function() {
	interest.forEach( function (interestData) {
		Interest
		  .create({
			name: interestData.name,

			name: "Outdoorsy".n
			type: interestData.type
		})
	})
}

Interest.destroy({ truncate: true }).then(function(){
	seedDatabase();
})



