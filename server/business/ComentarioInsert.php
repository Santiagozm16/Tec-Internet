<?php
    require_once ('../daos/ComentarioDAO.php');
    
    $cuerpo = file_get_contents('php://input');
    $comentarioDTO = json_decode($cuerpo);
	
	
    $comentarioDAO = new ComentarioDAO();
    $comentario = new Comentario($comentarioDTO->ComentarioUsuario,$comentarioDTO->fkUsuario);
    $results = $comentarioDAO->create($comentario);
    echo $results;
?>