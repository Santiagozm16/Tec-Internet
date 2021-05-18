<?php
require_once ('../config/ConnectionDB.php');
require_once ('../model/Cancion.php');

class CancionDAO {
   
   private $connectionDB;
   private $dbCon;
   const CONSULTA = "SELECT c.nombre, c.duracion, c.anio, g.nombre as genero FROM cancion c, genero g WHERE g.idGenero = c.fkgenero";
   const INSERT = "INSERT INTO usuario (NombreApellido,Contrasena,Correo) VALUES (?,?,?)";
   
   public function __construct() {
     $this->connectionDB = new connectionDB();
     $this->dbCon = $this->connectionDB->getConnection();
   }

   public function readAll() {
      try {
         $statement = $this->dbCon->prepare(self::CONSULTA);
         $statement->execute();
         $cancion = $statement->fetchAll(PDO::FETCH_ASSOC);
			
      }catch(PDOException $ex){
         echo $ex->getMessage();
         die($ex->getMessage());
      }
      return $cancion;
      $this->connectionDB.close();
   }

   public function create(Cancion $cancion){
      $result=false;
      try {
         $statement = $this->dbCon->prepare(self::INSERT);
         $statement->execute([$cancion->NombreApellido, $cancion->Contrasena, $cancion->Correo ]);
         $result=true;
      }catch(PDOException $ex){
         echo $ex->getMessage();
         die($ex->getMessage());
      }
      return $result;
   }

}
?>