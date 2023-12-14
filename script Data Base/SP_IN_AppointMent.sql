
USE AdministracionCitas;
GO
CREATE PROC SP_IN_AppointMent(
  @title NVARCHAR(100),
  @note NVARCHAR(100),
  @message NVARCHAR(200),
  @appointmentDate DATETIME,
  @idStatus TINYINT,
  @idUser INT,
  @idUserCreated INT
)
AS
SET NOCOUNT ON
BEGIN
  INSERT INTO Cita(title,note,[message],appointmentDate,idStatus,idUser,idUserCreated)
	        VALUES(@title,@note,@message,@appointmentDate,@idStatus,@idUser,@idUserCreated);
	        SELECT id, title, note, [message],appointmentDate,active,created 
	              FROM Cita WHERE id = (SELECT SCOPE_IDENTITY());
END
