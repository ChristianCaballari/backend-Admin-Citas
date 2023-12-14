const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { login,renewToken } = require('../controllers/authController');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

router.post('/',
     [
          check('email','El email es obligatorio').isEmail(),
          check('password','El password es obligatorio').not().isEmpty(),
          validateFields
     ],
     login
);

router.get('/renew',validateJWT,
      renewToken
);
module.exports = router;


