<?php
    require_once ('../daos/CancionDAO.php');
    
    $cuerpo = file_get_contents('php://input');
    $cancionDTO = json_decode($cuerpo);
	
	
    $cancionDAO = new CancionDAO();
    $cancion = new Cancion($cancionDTO->NombreApellido,$cancionDTO->Contrasena,$cancionDTO->Correo);
    $results = $cancionDAO->create($cancion);
    echo $results;
?>