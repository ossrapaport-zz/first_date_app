"use strict";
module.exports = function(sequelize, DataTypes) {
  var dates = sequelize.define("dates", {
    firstName: DataTypes.STRING,
    personality: DataTypes.STRING
  }, {
    timestamps: false,

    classMethods: {
      associate: function(models) {
        dates.belongsToMany(models.interests, {
          through: "dates_interests",
          foreignKey: "date_id"
        });
      }
    }
  });
  return dates;
};