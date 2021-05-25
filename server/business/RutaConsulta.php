<?php
    require_once ('../daos/RutaDAO.php');
    $rutaDAO = new UsuarioDAO();
    $results= json_encode($rutaDAO->readAll());
    echo $results;
?>