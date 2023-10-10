const { Area } = require('../models');
const path = require('path');
const fs = require('fs');
class AreaController
{
    static async fetchAreas(req, res, next)
    {
        try
        {
            const areas = await Area.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                    order: ['level_restriction', 'asc']
                }
            })
            const data = areas.map(x =>
            {
                const imagePath = '../assets/backgroundImages/' + x.background_image + '.png'; 
                const imageData = fs.readFileSync(path.resolve(__dirname, imagePath));

                const base64Data = imageData.toString('base64');
                x = x.toJSON()
                const dataUri = `data:image/png;base64,${base64Data}`;
                // x.dataUri = dataUri;
                return {
                    areaData: x,
                    dataUri: dataUri
                };
            })
            res.status(200).json(data)
        } catch (error)
        {
            next(error)
        }
    }

    static fetchAreaImage(req, res, next)
    {
        try
        {
            // const { backgroundName } = req.params
            // const dirname = process.cwd() + '/assets/backgroundImages/' + backgroundName + '.png'
            // console.log(dirname)
            // res.status(200).sendFile(dirname)

            const imagePath = '../assets/backgroundImages/default' + '.png'; // Change this to your image's path
            const imageData = fs.readFileSync(path.resolve(__dirname, imagePath));

            // Convert binary data to Base64
            const base64Data = imageData.toString('base64');
            res.status(200).json(base64Data)
        } catch (error)
        {
            next(error)
        }
    }
}

module.exports = AreaController