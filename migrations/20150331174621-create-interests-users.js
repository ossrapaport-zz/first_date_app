"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("interests_users", {
      interest_id: {
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER
      }
    }).done(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable("interests_users").done(done);
  }
};
