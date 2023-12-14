const { response } = require('express');
const { validationResult } = require('express-validator');

const validateFields = (req,res = response, next)=>{
    
     const  errorss = validationResult(req);

     if(!errorss.isEmpty()){
          return res.status(400).json({
               ok:false,
               errors: errorss.mapped()
          });
     }
     next();
}
module.exports = {
   validateFields
}