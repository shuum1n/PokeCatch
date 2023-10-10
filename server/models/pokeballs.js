'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokeballs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pokeballs.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    sprite: DataTypes.STRING,
    catch_modifier: DataTypes.INTEGER,
    special_pkmn: DataTypes.STRING,
    special_attract_rate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pokeballs',
  });
  return Pokeballs;
};