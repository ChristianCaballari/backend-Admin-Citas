const { dbConnection, sql} = require('../database/config');
const { response } = require('express');

const globalServices = async(query, req, res = response) => { 

     let data;
     let pool;
     
     try{
          pool = await sql.connect(dbConnection);
          data = await  pool.request().query(query);
     }catch(error){
          console.log(error);
          return res.status(500).json({
               ok:false,
               msg: 'Error en respuesta'
          });
     }finally{
          pool.close();
     }
     return data;
}


module.exports = {
     globalServices
}