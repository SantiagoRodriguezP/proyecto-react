
--INSERT INTO Usuarios VALUES ('Administrador', 'Aranda','Dg. 97 #17-60','7563000','info@aranda.com.co',20,'admon','123',4)

--EXEC SP_agregarUsuarios 'Administrador', 'Aranda','Dg. 97 #17-60','7563000','info@aranda.com.co' ,20,4,1,'admon','123'

ALTER PROCEDURE SP_agregarUsuarios
@Nombre VARCHAR(50),
@Apellidos VARCHAR(50),
@Direccion VARCHAR(50),
@Telefono VARCHAR(50),
@Email VARCHAR(50),
@Edad INT,
@Rol INT,
@Permiso INT,
@NombreUsuario VARCHAR(50),
@Clave VARCHAR(50)
AS
BEGIN
	INSERT INTO Usuarios VALUES (@Nombre, @Apellidos,@Direccion,@Telefono,@Email,@Edad,@Rol,@Permiso,@NombreUsuario,ENCRYPTBYPASSPHRASE(@Clave, 'InfoToolsSV') )

	SELECT * FROM Usuarios
END


-- SELECT * FROM Usuarios
