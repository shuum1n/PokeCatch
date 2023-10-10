'use strict';
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize)
  {
    /**
     * Add seed commands here.q
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // P.getBerryByName('cheri')
    // .then((response) => {
    //   console.log(response);
    // })
    // .catch((error) => {
    //   console.log('There was an ERROR: ', error);
    // });
    const rawPkmnData = require('../datas/Pokemon.json');
    const instanceData = await Promise.all(rawPkmnData.map(async rawPkmn =>
    {
      const pkmn = await P.getPokemonByName(rawPkmn.name);
      const pkmnFlavorText = await P.getPokemonSpeciesByName(rawPkmn.name);
      let notEnglish = true;
      let index = pkmnFlavorText.flavor_text_entries.length-1;
      while(notEnglish)
      {
        if (pkmnFlavorText.flavor_text_entries[index].language.name !== 'en')
        {
          index--;
        }
        else
        {
          break;
        }
      }
      return {
        name: rawPkmn.name,
        description: pkmnFlavorText.flavor_text_entries[index].flavor_text.split('\n').join(" "),
        element: pkmn.types[0].type.name,
        sprite: pkmn.sprites.other["official-artwork"].front_default,
        base_attract_rate: rawPkmn.base_attract_rate,
        base_pokedollars: rawPkmn.base_pokedollars,
        base_exp: rawPkmn.base_exp,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }));
    await queryInterface.bulkInsert('Pokemons', instanceData, {})
  },

  async down(queryInterface, Sequelize)
  {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Pokemons', null, {})

  }
};
