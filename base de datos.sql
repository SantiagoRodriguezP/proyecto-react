--create database aranda;

use aranda 
go
CREATE TABLE Permisos(
	IdPermiso INT NOT NULL IDENTITY PRIMARY KEY,
	Permiso VARCHAR(50)
)
CREATE TABLE Roles(
	idRol INT NOT NULL IDENTITY PRIMARY KEY,
	Nombre VARCHAR(20),
	Permiso INT,
	FOREIGN KEY (Permiso) REFERENCES Permisos(IdPermiso)
)


CREATE TABLE Usuarios(
	idUsuario INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	Nombre VARCHAR(50),
	Apellidos VARCHAR(50),
	Direccion VARCHAR(50),
	Telefono  VARCHAR(50),
	Email  VARCHAR(50),
	Edad INT,
	Rol VARCHAR(50),
	idRol INT,
	NombreUsuario  VARCHAR(50),
	Clave VARCHAR(50),
	FOREIGN KEY (idRol) REFERENCES Roles(idRol)
)
CREATE TABLE PermisosAsignados(
	idPermisoAsignado INT NOT NULL IDENTITY PRIMARY KEY,
	IdPermiso INT,
	IdRol INT,
	FOREIGN KEY (IdPermiso) REFERENCES Permisos(IdPermiso),
	FOREIGN KEY (idRol) REFERENCES Roles(idRol)
)


--INSERT INTO Permisos VALUES('Visualizar'),('Listar'), ('Filtrar'), ('Editar'),('Eliminar');
--INSERT INTO Roles VALUES('Visitante',1),('Asistente',2), ('Editor',4), ('Administrador',5);
--INSERT INTO PermisosAsignados VALUES (1,1)

--INSERT INTO Usuarios VALUES ('Administrador', 'Aranda','Dg. 97 #17-60','7563000','info@aranda.com.co',20,4,'admon','123')

-- SELECT * FROM Usuarios
-- SELECT * FROM Roles
-- SELECT * FROM Permisos
-- SELECT * FROM PermisosAsignados

--drop TABLE Permisos
-- DROP TABLE Roles
-- DROP TABLE Usuarios
-- DROP TABLE PermisosAsignados

--SELECT R.idRol, R.Nombre, P.IdPermiso, P.Permiso
--FROM PermisosAsignados PA
--INNER JOIN Roles R ON  PA.IdRol = R.idRol
--INNER JOIN Permisos P ON PA.IdPermiso = P.IdPermiso