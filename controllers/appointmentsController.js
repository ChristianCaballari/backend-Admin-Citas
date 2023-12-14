const { response } = require("express");
const {registerAppointMentQuery, getTotalAppointQuery,getAppointMentPaginadoQuery} = require("../queries/appointmentsQueries");
const { globalServices } = require("../services/globalServices");
const AppointMent = require('../models/AppointMent');


const getCitas = async(req, res) => {
  
     const desde = Number(req.query.desde)||0;
   
     const citas = await globalServices(getAppointMentPaginadoQuery(desde));
   
     const total = await globalServices(getTotalAppointQuery());
   
     res.json({
       ok:true,
       citas:citas.recordset,
       total: total.recordset[0].Total
     });
   }

  const buildDate = (date) =>{
     let fecha = new Date(date);
     return `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}.${fecha.getMilliseconds()}`;
   
}
const createAppointMent = async (req, res = response) => {

  const { title,note,message,appointmentDate,idUserCreated} = req.body;

  const idUser = req.params.idUsuario;
  const idStatus = req.params.idEstado;
  const date = buildDate(appointmentDate);


  try {
    const appointMent = new AppointMent(0,title,note,message,date,idStatus,idUser,idUserCreated);
    //Guardar Cita
    const appointMentDB = await globalServices(registerAppointMentQuery(appointMent));

    res.json({
      ok: true,
      appointMent:appointMentDB.recordset,
      msg:'Cita Creada Correctamente'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};



module.exports = {
  createAppointMent,
  getCitas,
};
