"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING
      },
      date_of_birth: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
      personality: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.TEXT
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("users").done(done);
  }
};