const { Profile } = require('../models');
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dstfdain7',
    api_key: '815881418581177',
    api_secret: 'gBQ1q_O1ryYMWvQnqFT5ln4SaEA'
});
class ProfileController 
{
    static async updateProfile(req, res, next)
    {
        try
        {
            console.log(req.body)
            console.log(req.file)
            const options = {
                use_filename: true,
                unique_filename: false,
                overwrite: true,
            }
            const result = await cloudinary.uploader.upload(req.file.path, options);
            const userProfile = await Profile.findOne({
                where: {
                    UserId: req.user.id
                }
            })
            userProfile.profile_picture = result.url;
            await userProfile.save()
            console.log(result);
            res.json({
                message: "Profile successfully updated"
            })
        } catch (error)
        {
            next(error)
        }
    }

    static async fetchProfile(req, res, next)
    {
        try
        {
            const userProfile = await Profile.findOne({
                where: {
                    UserId: req.user.id
                }
            })
            res.status(200).json(userProfile)
        } catch (error)
        {
            next(error)
        }
    }
}

module.exports = ProfileController