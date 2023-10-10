
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize)
  {
    await queryInterface.createTable('Pokemons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      element: {
        type: Sequelize.STRING
      },
      sprite: {
        type: Sequelize.STRING
      },
      base_exp: {
        type: Sequelize.INTEGER
      },
      base_pokedollars: {
        type: Sequelize.INTEGER
      },
      base_attract_rate: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Pokemons');
  }
};