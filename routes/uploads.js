
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, returnImg } = require('../controllers/uploadsController');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(expressFileUpload());
router.put('/:tipo/:id',validateJWT, fileUpload);
router.get('/:tipo/:foto',returnImg);

module.exports = router;