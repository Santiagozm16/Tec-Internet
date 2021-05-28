<?php
    require_once ('../daos/ComentarioDAO.php');
    $comentarioDAO = new ComentarioDAO();
    $results= json_encode($comentarioDAO->readAll());
    echo $results;
?>