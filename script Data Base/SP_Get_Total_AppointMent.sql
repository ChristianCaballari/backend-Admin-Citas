
GO
CREATE PROC SP_Get_Total_AppointMent
AS
SET NOCOUNT ON
BEGIN
    SELECT COUNT(id) AS Total FROM Cita WHERE active = 1;
END