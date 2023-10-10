const { Profile, xpTable } = require('../models');

async function calculateReward(profile, xp, pokedollars)
{
    let levelUp = false;
    profile.experience += xp;
    profile.currentXp += xp;
    profile.pokedollars += pokedollars;
    const currentLevel = await xpTable.findOne({
        where: {
            level: profile.level
        }
    })
    if (profile.currentXp >= currentLevel.xpRequiredToNextLevel)
    {
        profile.level++;
        profile.currentXp -= currentLevel.xpRequiredToNextLevel
        const newLevel = await xpTable.findOne({
            where: {
                level: profile.level
            }
        })
        profile.xpToLevelUp = newLevel.xpRequiredToNextLevel;
        levelUp = true;
    }
    await profile.save();
    return levelUp;
}



module.exports = {
    calculateReward
}