const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { globalServices } = require('../services/globalServices');
const { verifyEmailQuery,getUserByIdQuery } = require('../queries/userQueries');
const { getMenuFronEnd } = require('../helpers/menu_frontend');

const login = async(req, res = response) => {

     const { email, password } = req.body;

     try{
     //TODO: Varificar email
       const userDB = await globalServices(verifyEmailQuery(email));

       if(userDB.recordset.length === 0){
          return res.status(404).json({
               ok: false,
               msg: 'Credenciales Incorrectas'
          });
       }
       //TODO: Verificar password
       const validatePassword = bcrypt.compareSync(password,userDB.recordset[0].password);

       if(!validatePassword){
          return res.status(404).json({
               ok:false,
               msg: 'Credenciales Incorrectas'
          });
       }
       //TODO: Generar el TOKEN = JWT
       const token = await generateJWT(userDB.recordset[0].id);
       res.json({
          ok:true,
          token
       });

     }catch(error){
          console.log(error);
          res.status(500).json({
               ok:false,
               msg: 'Hable con el administrador'
          })
     }
}
const renewToken = async(req, res = response) =>{
      
     const id = req.id;
     //Generar el Token -JWT
     const token = await generateJWT(id);

     //obtener usuario por uid

     const usuarioDB = await globalServices(getUserByIdQuery(id));

    if (usuarioDB.recordset.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }

     res.json({
          ok:true,
          token,
          usuario:usuarioDB.recordset[0],
          menu: getMenuFronEnd(usuarioDB.recordset[0].role)
     });
}
module.exports = {
     login,
     renewToken
}