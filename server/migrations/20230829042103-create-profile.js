'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize)
  {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      currentXp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      xpToLevelUp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 250
      },
      pokedollars: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      adventures: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      profile_picture: {
        type: Sequelize.STRING,
        defaultValue: 'http://placekitten.com/200/200'
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize)
  {
    await queryInterface.dropTable('Profiles');
  }
};