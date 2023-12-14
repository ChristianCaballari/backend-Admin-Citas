
CREATE PROC SP_Get_All_User
AS
SET NOCOUNT ON
BEGIN
   SELECT id, [name],email FROM Usuario WHERE active = 1;
END