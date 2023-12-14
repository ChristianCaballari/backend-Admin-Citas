CREATE PROC SP_Update_Usuario
(
  @id INT,
  @name NVARCHAR(50),
  @email NVARCHAR(256),
  @role NVARCHAR(30)
)
AS
SET NOCOUNT ON
BEGIN
    UPDATE Usuario SET [name] = @name, email = @email,[role] = @role WHERE id = @id;
END