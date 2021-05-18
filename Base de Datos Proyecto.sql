CREATE TABLE Usuario (
idUsuario INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
NombreApellido VARCHAR(100) NOT NULL,
Contrasena VARCHAR(100) NOT NULL,
Correo VARCHAR(100) NOT NULL
);

CREATE TABLE Ruta (
idRuta INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
Nombre VARCHAR(100) NOT NULL,
Horarios VARCHAR(1000) NOT NULL,
Cordenadas VARCHAR(100) NOT NULL,
CiudadDestino VARCHAR(100) NOT NULL,
CiudadOrigen VARCHAR(100) NOT NULL
);

CREATE TABLE Comentario (
idComentario INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
ComentarioUsuario VARCHAR(280) NOT NULL,
CLike INTEGER,
Dislike INTEGER,
fkUsuario INTEGER NOT NULL,
CONSTRAINT FOREIGN KEY(fkUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE RutaUsuario(
idRutaUsuario INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
fkRuta INTEGER NOT NULL,
fkUsuario INTEGER NOT NULL,
CONSTRAINT FOREIGN KEY(fkRuta) REFERENCES Ruta(idRuta),
CONSTRAINT FOREIGN KEY(fkUsuario) REFERENCES Usuario(idUsuario)
);

SELECT * FROM streaming.usuario;

#Forzar eliminar tablas relacionadas, Se ejecutan las 3 lineas y luego la de Truncate
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE streaming.usuario;
SET FOREIGN_KEY_CHECKS=1;
