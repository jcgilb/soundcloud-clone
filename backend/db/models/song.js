"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsTo(models.User, { foreignKey: "userId", as: "Artist" });
      Song.belongsTo(models.Album, { foreignKey: "albumId" });
      Song.hasMany(models.Comment, { foreignKey: "songId" });
      Song.hasMany(models.PlaylistSong, { foreignKey: "songId" });
      Song.belongsToMany(models.Playlist, {
        through: "PlaylistSong",
        foreignKey: "songId",
        otherKey: "playlistId",
      });
      Song.hasMany(models.SongLikes, { foreignKey: "songId" });
    }
  }
  Song.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      albumId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};
