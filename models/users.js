"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.STRING,
    location: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {
    timestamps: false,

    classMethods: {
      associate: function(models) {
        users.belongsToMany(models.interests, {
          through: "interests_tags",
          foreignKey: "user_id"
        });
      }
    }
  });
  return users;
};