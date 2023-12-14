CREATE PROC SP_Verify_Email(
  @email NVARCHAR(256)
)
AS 
SET NOCOUNT ON
BEGIN
    SELECT id,[name],email,[password],img FROM Usuario WHERE email = @email;
END

