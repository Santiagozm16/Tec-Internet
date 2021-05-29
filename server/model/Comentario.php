<?php

class Comentario {

    var $ComentarioUsuario;
    var $fkUsuario;
    var $fkRuta;

    function __construct($ComentarioUsuario, $fkUsuario, $fkRuta)
    {
        $this->ComentarioUsuario = $ComentarioUsuario;
        $this->fkUsuario = $fkUsuario;
        $this->fkRuta = $fkRuta;
    }
    

}
?>