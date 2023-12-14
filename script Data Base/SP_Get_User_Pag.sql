 
 USE AdministracionCitas;
GO
ALTER PROC SP_Get_User_Pag(
  @next INT,
  @paginado INT
)
AS
SET NOCOUNT ON
BEGIN
   IF @paginado =1
     BEGIN
     SELECT id,[name], email, [role], img, active FROM Usuario AS U
       ORDER BY U.id 
             OFFSET @next ROWS FETCH FIRST 5 ROWS ONLY;
	END
	ELSE
	  BEGIN
	      SELECT id, [name],email FROM Usuario WHERE active = 1;
	  END
END

EXEC SP_Get_User_Pag 0,0;
