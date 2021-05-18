//Mi JavaScript

//Insertar Usuario

/*function capturar(){
    //console.log("hola");
	var Contrasena1;
    var Contrasena2;
	Contrasena1 = document.getElementById("Contrasena").value;
    Contrasena2 = document.getElementById("Contrasena-2").value;
	if(Contrasena1 == Contrasena2){
        console.log(":)")
    }
    else{
        console.log(":(")
    }
}*/

$(document).ready(function(){ //Capturar datos de la interfaz grafica
	$("#RegistroForm").submit(function(event){
		console.log("entro el evento botón");
		event.preventDefault();
		var pass1 = document.getElementById("Contrasena").value;
		var pass2 = document.getElementById("Contrasena2").value;
		if(pass1 == pass2 ){
			submitFormInsert();
		}else{
			var respuesta = document.getElementById('alerta');
			respuesta.innerHTML = `<div class="alert alert-danger" role="alert">
			Las contraseñas no coinciden.
		  	</div>`	
		}
		
	});
});

//Enviar datos a la base de datos
function submitFormInsert(){
	
	var NombreApellido = $("#Usuario").val();
    var Email = $("#Email").val();
    var Contrasena = $("#Contrasena").val();

    var object = {"NombreApellido":NombreApellido,"Contrasena":Contrasena,"Correo":Email};
	
    console.log(object);

	fetch('http://localhost/proyecto/server/business/UserInsert.php',{
	method:	'POST',
	headers:{
		'Content-Type' : 'application/json'
	},
	body: JSON.stringify(object),
	cache: 'no-cache'
	
	})
	.then(function(response){
		console.log("entró");
		return response.text();
	})
	.then(function(data){
		if(data === " 1"){
			//alert("Se ingreso el dato");
			var respuesta = document.getElementById('alerta');
			respuesta.innerHTML = `<div class="alert alert-success" role="alert">
			Se ha registrado exitosamente
		  	</div>`
        }
        else{
            alert("Error al insertar");
        }
	})
	.catch(function(err){
		console.error(err);
	});
}