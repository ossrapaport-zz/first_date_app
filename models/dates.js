"use strict";
module.exports = function(sequelize, DataTypes) {
  var dates = sequelize.define("dates", {
    firstName: DataTypes.STRING,
    personality: DataTypes.STRING
  }, {
    timestamps: false,

    instanceMethods: {
      getID: function() {
        return this.id;
      }
    },

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