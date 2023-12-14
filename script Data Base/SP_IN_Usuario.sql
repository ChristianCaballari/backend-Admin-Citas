CREATE PROC SP_IN_Usuario(
  @name NVARCHAR(50),
  @password NVARCHAR(MAX),
  @email NVARCHAR(256)
)
AS 
SET NOCOUNT ON
BEGIN
    INSERT INTO Usuario([name],email,[password])
	        VALUES(@name,@email,@password);
	SELECT id, [name], email, [role] FROM Usuario WHERE id = (SELECT SCOPE_IDENTITY());
END