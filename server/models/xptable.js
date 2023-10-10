'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class xpTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  xpTable.init({
    level: DataTypes.INTEGER,
    xpRequiredToNextLevel: DataTypes.INTEGER,
    cumulativeXpRequired: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'xpTable',
  });
  return xpTable;
};