const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController');
const AreaController = require('../controllers/areaController');
const AdventureController = require('../controllers/adventureController');
const authentication = require('../middleware/authentication');
const errorHandler = require('../middleware/errorHandler');
const adventureLevelGuard = require('../middleware/adventureLevelGuard');


const profile = require('./profile');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.use(authentication);
router.use(profile);

router.get('/areas', AreaController.fetchAreas);

router.get('/adventure/list', AdventureController.fetchAdventure);
router.get('/adventure/claim', AdventureController.claimAdventure);
router.post('/adventure/:areaId', adventureLevelGuard, AdventureController.generateAdventure);


router.use(errorHandler)

module.exports = router;