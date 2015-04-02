"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("dates_interests", {
      date_id: {
        type: DataTypes.INTEGER
      },
      interest_id: {
        type: DataTypes.INTEGER
      }
    }).done(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable("dates_interests").done(done);
  }
};
