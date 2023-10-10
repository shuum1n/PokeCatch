'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize)
  {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const areaPkmnDatas = require('../datas/PokemonAreas.json').map(rawArea => {
      let oneArea = []
      rawArea.pokemonList.forEach(element => {
        oneArea.push({
          AreaId: rawArea.AreaId,
          PokemonId: element,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })
      return oneArea;
    });
    await queryInterface.bulkInsert('AreaPokemons', areaPkmnDatas.flat(), {})
  },

  async down(queryInterface, Sequelize)
  {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('AreaPokemons', null, {})
  }
};
