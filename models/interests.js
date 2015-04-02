"use strict";
module.exports = function(sequelize, DataTypes) {
  var interests = sequelize.define("interests", {
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    timestamps: false,

    classMethods: {
      associate: function(models) {
        interests.belongsToMany(models.users, {
          through: "interests_users",
          foreignKey: "interest_id"
        });
        intersts.belongsToMany(models.dates, {
          through: "dates_users",
          foreignLey: "interest_id"
        }); 
      }
    }
  });
  return interests;
};