'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {foreignKey: 'UserId'})
      Profile.hasMany(models.Adventure, {foreignKey: 'ProfileId'})
    }
  }
  Profile.init({
    username: DataTypes.STRING,
    level: DataTypes.INTEGER,
    experience: DataTypes.INTEGER,
    currentXp: DataTypes.INTEGER,
    xpToLevelUp: {
      type: DataTypes.INTEGER,
      defaultValue: 250
    },
    pokedollars: DataTypes.INTEGER,
    adventures: DataTypes.INTEGER,
    profile_picture: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};