'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AreaPokemons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AreaPokemons.belongsTo(models.Area, {foreignKey: 'AreaId'})
    }
  }
  AreaPokemons.init({
    AreaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Areas',
        key: 'id'
      }
    },
    PokemonId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Pokemons',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'AreaPokemons',
  });
  return AreaPokemons;
};