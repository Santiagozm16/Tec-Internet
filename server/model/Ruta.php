<?php

class Ruta {

    var $Nombre;
    var $Horarios;
    var $Cordenadas;
    var $CiudadDestino;
    var $CiudadOrigen;

    function __construct($Nombre, $Horarios, $Cordenadas, $CiudadDestino, $CiudadOrigen)
    {
        $this->Nombre = $Nombre;
        $this->Horarios = $Horarios;
        $this->Cordenadas = $Cordenadas;
        $this->CiudadDestino = $CiudadDestino;
        $this->CiudadOrigen = $CiudadOrigen;
    }
    

}
?>