const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { createAppointMent,getCitas } = require('../controllers/appointmentsController');


const router = Router();

router.get('/',validateJWT, getCitas);
router.post('/:idUsuario/estado/:idEstado',
     [
          check('title','El titulo es obligatorio').not().isEmpty(),
          check('note','La nota es obligatoria').not().isEmpty(),
          check('message','El mensaje es obligatorio').not().isEmpty(),
          check('appointmentDate','La fecha de la cita es obligatoria').not().isEmpty(),

          validateFields
     ],
     createAppointMent
);

module.exports = router;


