const { Area, Profile } = require('../models');

const adventureLevelGuard = async (req, res, next) =>
{
    try
    {
        const userProfile = await Profile.findOne({
            where: {
                UserId: req.user.id
            }
        })

        const {areaId} = req.params;

        const area = await Area.findOne({
            where: {
                id: areaId
            }
        })
        if (!area)
        {
            throw {
                name: "NotFound",
                message: "Area is unavailable"
            }
        }

        if (area.level_restriction > userProfile.level)
        {
            throw {
                name: "Forbidden",
                message: "Your level is too low to access this area!"
            }
        }
        else
        {
            next()
        }
    } catch (error)
    {
        next(error)
    }
}

module.exports = adventureLevelGuard;
