CREATE PROC SP_Update_Img_Usuario
(
  @id INT,
  @img NVARCHAR(MAX)
)
AS
SET NOCOUNT ON
BEGIN
    UPDATE Usuario SET img = @img WHERE id = @id;
END