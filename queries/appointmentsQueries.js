
const registerAppointMentQuery = (appointMent) =>{
     return `EXEC SP_IN_AppointMent @title =N'${appointMent.title}',@note =N'${appointMent.note}', @message =N'${appointMent.message}',
     @appointMentDate =N'${appointMent.appointmentDate}',
     @idStatus =N'${appointMent.idStatus}',
     @idUser =N'${appointMent.idUser}',
     @idUserCreated =N'${appointMent.idUserCreated}'`;
}

const getAppointMentPaginadoQuery = (desde) =>{
     return `EXEC SP_Get_AppointMents_Pag @next =N'${desde}'`;
}

const getTotalAppointQuery = () =>{
     return `EXEC SP_Get_Total_AppointMent`;
}

module.exports = {
     registerAppointMentQuery,
     getAppointMentPaginadoQuery,
     getTotalAppointQuery,
}

