const { response } = require('express');
const { globalServices } = require('../services/globalServices');
const { getStatusQuery } = require('../queries/statusQueries');

const getStatus = async(req, res = response) => {

     try{
       const statusDB = await globalServices(getStatusQuery());

       res.json({
          ok:true,
          estados: statusDB.recordset
       });
     }catch(error){
          console.log(error);
          res.status(500).json({
               ok:false,
               msg: 'Hable con el administrador'
          })
     }
}
module.exports = {
     getStatus
}