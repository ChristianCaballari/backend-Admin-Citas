

GO
CREATE PROC SP_Get_All_AppointMents_By_User(
  @id INT
)
AS
SET NOCOUNT ON
BEGIN
SELECT C.id,C.title,C.note,C.[message],
         CONVERT(VARCHAR,C.appointmentDate,22) AS appointmentDate,
		 CONVERT (VARCHAR,C.created,22) AS created,
		 E.[name]  AS estado, U.[name] AS usuario
			 FROM Estado AS E
			 INNER JOIN Cita AS C
			 ON C.idStatus = E.id
			 INNER JOIN Usuario AS U
		 ON U.id = C.idUser
	WHERE C.active = 1 AND C.idUser = @id
END

SELECT * FROM Cita;

EXEC SP_Get_All_AppointMents_By_User 2;
