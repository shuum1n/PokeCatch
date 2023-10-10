
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pokemon.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    element: DataTypes.STRING,
    sprite: DataTypes.STRING,
    base_attract_rate: DataTypes.INTEGER,
    base_pokedollars: DataTypes.INTEGER,
    base_exp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pokemon',
  });
  return Pokemon;
};