<?php

class Comentario {

    var $ComentarioUsuario;
    var $fkUsuario;

    function __construct($ComentarioUsuario, $fkUsuario)
    {
        $this->ComentarioUsuario = $ComentarioUsuario;
        $this->fkUsuario = $fkUsuario;
    }
    

}
?>