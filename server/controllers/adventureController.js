const { Adventure, Profile, Area, Pokemon } = require('../models');
const { DateTime } = require("luxon");
const { calculateReward } = require('../helpers/adventureReward');
const path = require('path');
const fs = require('fs');



class AdventureController
{
    static async generateAdventure(req, res, next)
    {
        const { areaId } = req.params;
        const userId = req.user.id;
        try
        {
            // check if currently on adventure or not
            const currentProfile = await Profile.findOne({
                where: {
                    UserId: userId
                },
                include: Adventure
            })
            if (!currentProfile) 
            {
                throw {
                    name: "NotFound",
                    message: "Invalid Profile"
                }
            }
            console.log(currentProfile)
            // res.status(200).json(currentProfile)
            const currentAdventure = await Adventure.findOne({
                where: {
                    ProfileId: currentProfile.id,
                    status: "ongoing"
                }
            })
            // if on adventure, not allowed to go on adventure
            if (currentAdventure)
            {
                throw {
                    name: "BadRequest",
                    message: "There is still adventure ongoing!"
                }
            }
            else
            {
                // is area valid
                const currentArea = await Area.findOne({
                    where: {
                        id: areaId
                    }
                })
                if (!currentArea)
                {
                    throw {
                        name: "NotFound",
                        message: "Area not found"
                    }
                }
                else
                {
                    let now = DateTime.now()
                    const newAdventure = await Adventure.create({
                        location: currentArea.name,
                        startedAt: now,
                        estimatedCompletion: now.plus({ minutes: currentArea.base_time }),
                        ProfileId: currentProfile.id
                    })
                    res.status(201).json(newAdventure)
                }
            }
        } catch (error)
        {
            next(error)
        }
    }

    static async claimAdventure(req, res, next)
    {
        const userId = req.user.id;
        try
        {
            //find profile
            const currentProfile = await Profile.findOne({
                where: {
                    UserId: userId
                },
            })
            // if there is ongoing adventure
            const currentAdventure = await Adventure.findOne({
                where: {
                    ProfileId: currentProfile.id,
                    status: "ongoing"
                }
            })
            // no adventure to claim
            if (!currentAdventure)
            {
                throw {
                    name: "BadRequest",
                    message: "There is no adventure to claim!"
                }
            }
            let now = DateTime.now()
            // adventure still ongoing
            if (now <= currentAdventure.estimatedCompletion)
            {
                throw {
                    name: "BadRequest",
                    message: "Adventure is in progress!"
                }
            }

            //find current area
            const currentArea = await Area.findOne({
                where: {
                    name: currentAdventure.location
                },
                include: 'AreaPokemons'
            })
            if (!currentArea)
            {
                throw {
                    name: "NotFound",
                    message: "Area not found"
                }
            }
            else
            {
                // console.log(currentArea)

                // make adventure complete
                currentAdventure.status = "completed";
                await currentAdventure.save();
                // logic to catch pkmn
                let pkmnIndex = Math.floor(Math.random() * currentArea.AreaPokemons.length)
                const pkmn = await Pokemon.findOne({
                    where: {
                        id: currentArea.AreaPokemons[pkmnIndex].PokemonId
                    }
                })
                // chance of failure
                let missRoll = Math.ceil(Math.random() * 100)
                let pkmnName = pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1);
                if (missRoll <= pkmn.base_attract_rate)
                {
                    let message = `You caught a ${pkmnName}! <br> Gained ${pkmn.base_exp} XP! <br> Gained ${pkmn.base_pokedollars} pokedollars!`
                    const levelUp = await calculateReward(currentProfile, pkmn.base_exp, pkmn.base_pokedollars)
                    if (levelUp)
                    {
                        message += ` <br> You leveled up!`
                    }
                    res.json({
                        code: 'success',
                        result: pkmn,
                        message: message
                    })
                }
                else
                {
                    
                    res.json({
                        code: 'fail',
                        message: `You encountered a ${pkmnNamex} but it got away!`
                    })
                }
            }
        } catch (error)
        {
            next(error)
        }
    }

    static async fetchAdventure(req, res, next)
    {
        const userId = req.user.id;
        try
        {
            const foundProfile = await Profile.findOne({
                where: {
                    UserId: userId
                }
            })
            const currentAdventure = await Adventure.findOne({
                where: {
                    ProfileId: foundProfile.id,
                    status: "ongoing"
                },
                attributes: ['location', 'status', 'startedAt', 'estimatedCompletion']
            })
            // console.log(currentAdventure)
            if (!currentAdventure)
            {
                res.status(404).json({
                    code: 'NoAdventure',
                    message: "You have no ongoing adventures!"
                })
            }
            else
            {
                let area = await Area.findOne({
                    where: {
                        name: currentAdventure.location
                    }
                })
                let completedTime = DateTime.fromJSDate(currentAdventure.estimatedCompletion)
                let now = DateTime.now()
                const imagePath = '../assets/backgroundImages/' + area.background_image + '.png';
                const imageData = fs.readFileSync(path.resolve(__dirname, imagePath));

                const base64Data = imageData.toString('base64');
                const dataUri = `data:image/png;base64,${base64Data}`;
                if (now > completedTime)
                {
                    res.status(200).json({
                        status: 'completed',
                        location: currentAdventure.location,
                        dataUri: dataUri,
                        timer: 0,
                        code: 'OnAdventure'
                    })
                }
                else
                {

                    let est = Math.ceil(completedTime.diff(now, 'seconds').as('seconds'))
                    console.log(est)
                    res.status(200).json({
                        status: 'ongoing',
                        timer: est,
                        location: currentAdventure.location,
                        dataUri: dataUri,
                        code: 'OnAdventure'
                    })
                }
            }
        } catch (error)
        {
            console.log(error)
            next(error)
        }
    }
}

module.exports = AdventureController
