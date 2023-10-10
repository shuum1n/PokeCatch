'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adventure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Adventure.belongsTo(models.Profile, {foreignKey: 'ProfileId'})
    }
  }
  Adventure.init({
    location: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'ongoing'
    },
    startedAt: DataTypes.DATE,
    estimatedCompletion: DataTypes.DATE,
    ProfileId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Profile',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Adventure',
  });
  return Adventure;
};