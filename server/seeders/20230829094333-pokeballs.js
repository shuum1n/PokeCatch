'use strict';

const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

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
    const rawPokeballData = require('../datas/pokeballs.json');
    const instanceData = await Promise.all(rawPokeballData.map(async rawPokeball =>
    {
      const pokeball = await P.getItemByName(rawPokeball.name);
      const sprite = pokeball.sprites.default;
      let flavor_text;
      let notEnglish = true;
      let index = pokeball.flavor_text_entries.length-1;
      while(notEnglish)
      {
        if (pokeball.flavor_text_entries[index].language.name !== 'en')
        {
          index--;
        }
        else
        {
          flavor_text = pokeball.flavor_text_entries[index].text.split('\n').join(" ")
          break;
        }
      }
      rawPokeball.description = flavor_text;
      rawPokeball.sprite = sprite;
      rawPokeball.createdAt = new Date();
      rawPokeball.updatedAt = new Date();
      return rawPokeball;
    }))
    await queryInterface.bulkInsert('Pokeballs', instanceData, {})
  },

  async down(queryInterface, Sequelize)
  {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Pokeballs', null, {})

  }
};
