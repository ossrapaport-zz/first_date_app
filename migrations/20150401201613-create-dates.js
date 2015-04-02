"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("dates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING
      },
      personality: {
        type: DataTypes.STRING
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("dates").done(done);
  }
};