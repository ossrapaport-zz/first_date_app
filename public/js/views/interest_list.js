App.Views.InterestList = Backbone.View.extend({
  initialize: function() {
    console.log("Made interest list");
    this.template = Handlebars.compile( $("#interest-list-template").html() );
  },
  render: function() {
    var compiledTemplate = this.template( this.model.toJSON() );
    this.$el.html(compiledTemplate);
  }
})