CREATE PROC SP_Sl_Usuario(
 @id INT
)
AS
SET NOCOUNT ON
BEGIN
      SELECT id, [name], email, [role], img, active FROM Usuario WHERE id = @id;
END