const { Router } = require('express');
const { getStatus } =require('../controllers/statusController');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/',validateJWT, getStatus);

module.exports = router;