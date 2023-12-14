

CREATE DATABASE AdministracionCitas;
GO
USE AdministracionCitas;
GO

/*
   Estrucutra tabla Usuario:

   id: Identificador Único,
   name: Nombre del Usuario,
   email:Correo del Usuario,
   password: Contraseña de acceso,
   role: detemina los permisos,
   img: Foto del Usuario,
   active: Identificador para ver si esta activo o inactivo(Eliminación Logica),
   created: Fecha de Creación del Usuario
*/
--DROP TABLE USUARIO;
GO
CREATE TABLE Usuario(
    id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR (50) NOT NULL,
	email NVARCHAR(256) NOT NULL,
    [password] NVARCHAR(MAX)NOT NULL,
	[role] NVARCHAR(30) NOT NULL DEFAULT 'USER_ROLE',
	img NVARCHAR(MAX),
	active BIT NOT NULL DEFAULT 1,
	created DATETIME DEFAULT GETDATE(),
);
SELECT * FROM Usuario;

/*
   Estrucutra tabla Estado:
   id: Identificador Único,
   name: Nombre del estado (Cancelado, Atendido...)

	Pendiente
	Realizado
	Cancelado
	Rechazado
	Postergado
*/
INSERT INTO Estado([name])VALUES('Pendiente');
INSERT INTO Estado([name])VALUES('Cancelado');
INSERT INTO Estado([name])VALUES('Realizado');
INSERT INTO Estado([name])VALUES('Rechazado');
INSERT INTO Estado([name])VALUES('Postergado');
SELECT * FROM Estado;

GO
CREATE TABLE Estado(
    id TINYINT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR (50) NOT NULL,
);



/*
  Estructura tabla Cita
  id: Identificador Único,
  title: Asunto de la cita,
  note: Nota o obervaciones,
  message: Algun mensaje o descripción,
  date: Fecha de la cita,
  idStatus: Estado de la cita,
  idUser: Usuario ,

*/

CREATE TABLE Cita(
  id INT IDENTITY(1,1) PRIMARY KEY,
  title NVARCHAR(100) NOT NULL,
  note NVARCHAR(100) NOT NULL,
  [message] NVARCHAR(200) NOT NULL,
  appointmentDate DATETIME NOT NULL,
  created DATETIME DEFAULT GETDATE(),
  active BIT DEFAULT 1,
  idStatus TINYINT NOT NULL,
  idUser INT NOT NULL,
  CONSTRAINT FK_idUsuario FOREIGN KEY (idUser) REFERENCES Usuario(id),
  CONSTRAINT FK_idEstado FOREIGN KEY (idStatus) REFERENCES Estado(id)
);
SELECT * FROM Cita;










