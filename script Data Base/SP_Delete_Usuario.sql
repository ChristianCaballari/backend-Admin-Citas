CREATE PROC SP_Delete_Usuario
(
  @id INT
)
AS
SET NOCOUNT ON
BEGIN
    UPDATE Usuario SET active = 0 WHERE id = @id;
END