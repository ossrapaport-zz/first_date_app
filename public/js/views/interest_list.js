App.Views.InterestList = Backbone.View.extend({
  initialize: function() {
    this.template = Handlebars.compile( $("#interest-list-template").html() );
  },
  render: function() {
    var compiledTemplate = this.template( this.model.toJSON() );
    this.$el.html(compiledTemplate);
  }
})