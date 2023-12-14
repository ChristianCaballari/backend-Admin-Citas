const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { createUser, actualizarUsuario,borrarUsuario,getUsuarios,getCitasByUser } =require('../controllers/userController');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();


router.get('/:paginado',validateJWT, getUsuarios);
router.get('/:id/citas',validateJWT, getCitasByUser);
router.post('/',
     [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(), 
        check('email','El email es obligatorio').isEmail(),
        validateFields 
     ],createUser
);

router.put('/:id', 
[
     validateJWT,
     //validarADMIN_ROLE_o_MismoUsuario,
     check('name','El nombre es obligatorio').not().isEmpty(),
     check('email','El email es obligatorio').isEmail(),
     check('role', 'El role es obligatorio').not().isEmpty(),
     validateFields,
      
]
,actualizarUsuario);

router.delete('/:id',
[
   validateJWT,
    // validarADMIN_ROLE
], borrarUsuario);

module.exports = router;