"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("results", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      restaurant_name: {
        type: DataTypes.STRING
      },
      yelp_image_url: {
        type: DataTypes.TEXT
      },
      yelp_snippet_image_url: {
        type: DataTypes.TEXT
      },
      description: {
        type: DataTypes.TEXT
      },
      telephone_number: {
        type: DataTypes.STRING
      },
      website: {
        type: DataTypes.TEXT
      },
      address: {
        type: DataTypes.TEXT
      },
      user_id: {
        type: DataTypes.INTEGER
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("results").done(done);
  }
};