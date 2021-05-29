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


SELECT * FROM streaming.ruta;

INSERT INTO Ruta (Nombre, Horarios, Cordenadas, CiudadDestino, CiudadOrigen)
VALUES ('Ruta1', '5:15AM - 10:00PM', '4.864909639282648, -74.05120513489219' , 'Chía' , 'Bogota' );

ALTER TABLE comentario DROP COLUMN  CLike;
ALTER TABLE comentario DROP COLUMN  Dislike;

SET FOREIGN_KEY_CHECKS=0;

TRUNCATE TABLE streaming.ruta;

SET FOREIGN_KEY_CHECKS=1;

ALTER TABLE ruta
ADD COLUMN Distancia VARCHAR(100) AFTER CiudadOrigen;

ALTER TABLE ruta
ADD COLUMN Tiempo VARCHAR(100) AFTER CiudadOrigen;

ALTER TABLE ruta
ADD COLUMN Mapa VARCHAR(100) AFTER Distancia;

INSERT INTO Ruta (Nombre, Horarios, Cordenadas, CiudadDestino, CiudadOrigen, Tiempo, Distancia, Mapa)
VALUES ('Ruta1', 'horario/Ruta1.pdf', '4.864909639282648, -74.05120513489219' , 'Chía' , 'Bogota', '39 min', '23km', 'imagenes/Bogota-Chía.jpg' );

INSERT INTO Ruta (Nombre, Horarios, Cordenadas, CiudadDestino, CiudadOrigen, Tiempo, Distancia, Mapa)
VALUES ('Ruta2', 'horario/Ruta2.pdf', '4.721509310098101, -74.07005114881964' , 'Bogota' , 'Chía', '27 min', '23km', 'imagenes/Chía-Bogota.jpg' );

SET FOREIGN_KEY_CHECKS=0;

TRUNCATE TABLE streaming.comentario;

SET FOREIGN_KEY_CHECKS=1;

ALTER TABLE comentario
ADD COLUMN fkRuta INTEGER NOT NULL AFTER fkUsuario;

SELECT * FROM streaming.comentario;


