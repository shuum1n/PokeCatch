'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcryptHelper');
module.exports = (sequelize, DataTypes) =>
{
  class User extends Model
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models)
    {
      User.hasOne(models.Profile, { foreignKey: 'UserId' })
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, options)
      {
        instance.password = hashPassword(instance.password);
      }
    }
  });
  return User;
};