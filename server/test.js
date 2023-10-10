// const Pokedex = require('pokedex-promise-v2');
// const options = {
//   protocol: 'https',
//   hostName: 'localhost:443',
//   versionPath: '/api/v2/',
//   cacheLimit: 100 * 1000, // 100s
//   timeout: 5 * 1000 // 5s
// }
// const P = new Pokedex();
// P.getBerryByName('cheri')
//   .then((response) =>
//   {
//     console.log(response);
//   })
//   .catch((error) =>
//   {
//     console.log('There was an ERROR: ', error);
//   });

// const datas = require('./datas/Area1.json');

// datas.forEach(x =>
// {
//   P.getPokemonByName(x.name)
//     .then((result) =>
//     {
//       console.log(result)
//     }).catch((err) =>
//     {
//       console.log(err)
//     })
// }
// )
// console.log("================= START HERE ======================")

// P.getPokemonByName("rattata")
// .then((result) =>
// {
//   console.log(result)
// }).catch((err) =>
// {
//   console.log(err)
// })

// console.log("================= SPECIES INFO ======================")

// P.getPokemonSpeciesByName("rattata")
// .then((result) =>
// {
//   console.log(result)
// }).catch((err) =>
// {
//   console.log(err)
// })


// async function getPokemonByName(name)
// {
//   try {
//     // const pkmn = await P.getPokemonByName(name);
//     const pkmnFlavorText = await P.getPokemonSpeciesByName(name);
//     // console.log(pkmn.types[0].type.name)
//     // console.log(pkmn.sprites.other["official-artwork"].front_default) // get official sprite
//     let notEnglish = true;
//     let index = pkmnFlavorText.flavor_text_entries.length-1;
//     while(notEnglish)
//     {
//       if (pkmnFlavorText.flavor_text_entries[index].language.name !== 'en')
//       {
//         index--;
//       }
//       else
//       {
//         break;
//       }
//     }
//     // console.log(pkmnFlavorText.flavor_text_entries[index])

//     console.log(pkmnFlavorText.flavor_text_entries[index].flavor_text.split('\n').join(" "))
//   } catch (error) {
//     console.log(error)
//   }
// }

// getPokemonByName("wurmple")

// module.exports = P;

const areaPkmnDatas = require('./datas/PokemonAreas.json').map(rawArea => {
  let oneArea = []
  rawArea.pokemonList.forEach(element => {
    oneArea.push({
      AreaId: rawArea.AreaId,
      PokemonId: element
    })
  })
  return oneArea;
});
  console.log(areaPkmnDatas.flat());