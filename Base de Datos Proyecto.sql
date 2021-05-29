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
CiudadOrigen VARCHAR(100) NOT NULL,
Distancia VARCHAR(100) NOT NULL,
Ruta VARCHAR(100) NOT NULL,
Mapa VARCHAR(100) NOT NULL
);

CREATE TABLE Comentario (
idComentario INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
ComentarioUsuario VARCHAR(280) NOT NULL,
fkUsuario INTEGER NOT NULL,
fkRuta  INTEGER NOT NULL,
CONSTRAINT FOREIGN KEY(fkUsuario) REFERENCES Usuario(idUsuario),
CONSTRAINT FOREIGN KEY(fkRuta) REFERENCES Ruta(idRuta)
);

SELECT * FROM streaming.usuario;
SELECT * FROM streaming.comentario;
SELECT * FROM streaming.ruta;

INSERT INTO Ruta (Nombre, Horarios, Cordenadas, CiudadDestino, CiudadOrigen, Tiempo, Distancia, Mapa)
VALUES ('Ruta1', 'horario/Ruta1.pdf', '4.864909639282648, -74.05120513489219' , 'Chía' , 'Bogota', '39 min', '23km', 'imagenes/Bogota-Chía.jpg' );

INSERT INTO Ruta (Nombre, Horarios, Cordenadas, CiudadDestino, CiudadOrigen, Tiempo, Distancia, Mapa)
VALUES ('Ruta2', 'horario/Ruta2.pdf', '4.721509310098101, -74.07005114881964' , 'Bogota' , 'Chía', '27 min', '23km', 'imagenes/Chía-Bogota.jpg' );





