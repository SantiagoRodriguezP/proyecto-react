CREATE PROCEDURE SP_ValidarUsuario
@nombreUsuario VARCHAR(50),
@clave VARCHAR(50),
@Patron VARCHAR(50)
AS
BEGIN
	
	SELECT * FROM Usuarios WHERE NombreUSuario=@nombreUsuario AND CONVERT(VARCHAR(50), DECRYPTBYPASSPHRASE(@Patron, @clave))=@clave
END