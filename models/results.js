"use strict";
module.exports = function(sequelize, DataTypes) {
  var results = sequelize.define("results", {
    restaurant_name: DataTypes.STRING,
    yelp_image_url: DataTypes.TEXT,
    yelp_snippet_image_url: DataTypes.TEXT,
    description: DataTypes.TEXT,
    telephone_number: DataTypes.STRING,
    website: DataTypes.TEXT,
    address: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    timestamps: false,

    classMethods: {
      associate: function(models) {
        results.belongsTo(models.users, {
          foreignKey: "user_id"
        });
      }
    }
  });
  return results;
};