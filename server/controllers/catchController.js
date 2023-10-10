const { Pokemon, Area } = require('../models');

class CatchController
{
    static async catchPokemon(req, res, next)
    {
        const { areaId } = req.params;
        try
        {
            const currentArea = await Area.findOne({
                where: {
                    id: areaId
                },
                include: 'AreaPokemons' 
            })
            if (!currentArea)
            {
                throw null
            }
            else
            {
                // console.log(currentArea)
                let pkmnIndex = Math.floor(Math.random()*currentArea.AreaPokemons.length)
                const pkmn = await Pokemon.findOne({
                    where: {
                        id: currentArea.AreaPokemons[pkmnIndex].PokemonId
                    }
                })
                let missRoll = Math.ceil(Math.random()*100)
                if (missRoll <= pkmn.base_attract_rate)
                {
                    res.json({
                        message: `You caught a ${pkmn.name}! Gained ${pkmn.base_exp} points!`
                    })
                }
                else
                {
                    res.json({
                        message: `You encountered a ${pkmn.name} but it got away!`
                    })
                }
                // console.log(pkmn.name, pkmn.element, pkmn.base_exp)
            }
        } catch (error)
        {
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}

module.exports = CatchController