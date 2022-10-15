"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SongLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SongLikes.belongsTo(models.User, { foreignKey: "userId" });
      SongLikes.belongsTo(models.Song, { foreignKey: "songId" });
    }
  }
  SongLikes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      songId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "SongLikes",
      indexes: [{ unique: true, fields: ["songId", "userId"] }],
    }
  );
  return SongLikes;
};
