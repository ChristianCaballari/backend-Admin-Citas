
const verifyEmailQuery = (email) => {
     return `EXEC SP_Verify_Email @email =N'${email}'`; 
}

const getUserByIdQuery = (id)=>{
     return `EXEC SP_Sl_Usuario @id =N'${id}'`;
}

const updateImgUserQuery = (id, img)=>{
     return `EXEC SP_Update_Img_Usuario @id =N'${id}', @img =N'${img}'`;
}

const registerUserQuery = (user) =>{
     return `EXEC SP_IN_Usuario @name =N'${user.name}',@password =N'${user.password}', @email =N'${user.email}'`;
}

const updateUserQuery = (user) =>{
     return `EXEC SP_Update_Usuario @id =N'${user.id}',@name =N'${user.name}', @email =N'${user.email}', @role =N'${user.role}'`;
}


const deleteUserQuery = (id) =>{
     return `EXEC SP_Delete_Usuario @id =N'${id}'`;
}

const getUserPaginadoQuery = (desde, paginado) =>{
     return `EXEC SP_Get_User_Pag @next =N'${desde}', @paginado =N'${paginado}'`;
}

const getTotalUsersQuery = () =>{
     return `EXEC SP_Get_Total_Users`; 
}
const getAllAppointmentQuery = (id) =>{
     return `EXEC SP_Get_All_AppointMents_By_User @id =N'${id}'`;
}

module.exports = {
     verifyEmailQuery,
     getUserByIdQuery,
     updateImgUserQuery,
     registerUserQuery,
     updateUserQuery,
     deleteUserQuery,
     getUserPaginadoQuery,
     getTotalUsersQuery,
     getAllAppointmentQuery
}