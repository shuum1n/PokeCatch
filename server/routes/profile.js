const express = require('express')
const router = express.Router()
const ProfileController = require('../controllers/profileController');
const multer = require("multer");

const fileFilter = (req, file, cb) =>
{
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    try
    {
        console.log(file.mimetype)
        if (!allowedTypes.includes(file.mimetype))
        {
            throw {
                name: "IncorrectFileType",
                message: "File must be of extension .jpeg, .jpg, or .png"
            }
        }
        return cb(null, true);
    } catch (error)
    {
        return cb(error, false)
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + "-" + req.user.email + '.png')
    }
  })

const upload = multer({
    storage: storage,
    fileFilter,
    limits: {
        fileSize: 10000000
    }
});

router.get('/profile', ProfileController.fetchProfile)
router.post('/profile', upload.single('avatar'), ProfileController.updateProfile)
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = router