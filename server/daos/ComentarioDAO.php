<?php
require_once ('../config/ConnectionDB.php');
require_once ('../model/Comentario.php');

class ComentarioDAO {
   
   private $connectionDB;
   private $dbCon;
   const CONSULTA = "SELECT ComentarioUsuario, fkUsuario FROM comentario";
   const INSERT = "INSERT INTO comentario (ComentarioUsuario,fkUsuario) VALUES (?,?)";
   
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

   public function create(Comentario $comentario){
      $result=false;
      try {
         $statement = $this->dbCon->prepare(self::INSERT);
         $statement->execute([$comentario->ComentarioUsuario, $comentario->fkUsuario]);
         $result=true;
      }catch(PDOException $ex){
         echo $ex->getMessage();
         die($ex->getMessage());
      }
      return $result;
   }

}
?>