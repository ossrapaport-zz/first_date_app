"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    location: DataTypes.STRING,
    personality: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {
    timestamps: false,

    classMethods: {
      associate: function(models) {
        users.belongsToMany(models.interests, {
          through: "interests_users",
          foreignKey: "user_id"
        });
        users.hasMany(models.results, {
          foreignKey: "user_id",
          onDelete: "cascade",
          hooks: true
        });
      }
    }
  });
  return users;
};