SELECT * FROM Cita;
SELECT * FROM Estado;
SELECT * FROM Usuario;
USE AdministracionCitas;


GO
CREATE PROC SP_Get_AppointMents_Pag(
  @next INT
)
AS
SET NOCOUNT ON
BEGIN
SELECT C.id,C.title,C.note,C.[message],
         CONVERT(VARCHAR,C.appointmentDate,22) AS appointmentDate,
		 CONVERT(VARCHAR,C.created,22) AS created,E.[name]  AS estado, U.[name] AS usuario
			 FROM Estado AS E
				 INNER JOIN Cita AS C
				 ON C.idStatus = E.id
				 INNER JOIN Usuario AS U
			 ON U.id = C.idUser
			 ORDER BY C.id
		 OFFSET @next ROWS FETCH FIRST 5 ROWS ONLY;
END








EXEC SP_Get_AppointMents_Pag 0;

--SELECT CONVERT(VARCHAR,created,22) AS Fecha FROM Usuario;


SELECT * FROM Usuario;

UPDATE Usuario SET [role] = 'ADMIN_ROLE' WHERE id = 7;