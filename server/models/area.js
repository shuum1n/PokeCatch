'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Area.hasMany(models.AreaPokemons, {foreignKey: 'AreaId'})
    }
  }
  Area.init({
    name: DataTypes.STRING,
    base_time: DataTypes.INTEGER,
    level_restriction: DataTypes.INTEGER,
    background_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Area',
  });
  return Area;
};