//Mi JavaScript
var us = 0; //-->Variable para relacionar comentarios con el usuario

//Verificación de Inicio de Sesión
$(document).ready(function(){
	$("#InicioForm").submit(function(event){
		console.log("entro el evento botón - iniciar sesión");
		event.preventDefault();
		var correo = document.getElementById("Usuario-1").value;
		var pass = document.getElementById("Contrasena-1").value;
		submitConsulta(correo,pass);
		//console.log(correo + " + " +pass); Se estan capturando de manera correcta los campos init
	});
});
//Extrae los valores de las listas desplegables
$(document).ready(function(){
	var origen;
	var destino;
	$('#validationCustom01').on('click',function() {
		console.log($(this).val());
		origen = $(this).val();
	});
	$('#validationCustom02').on('click',function() {
		console.log($(this).val());
		destino = $(this).val();
	});
	$('#Ayuda-tab').on('click',function() {
		datosConsulta(origen,destino);
	});
});
//Consultar Ruta
function datosConsulta(CiudadOrigen, CiudadDestino){
	console.log('Entro');
	fetch('http://localhost/Tec-Internet/server/business/RutaConsulta.php',{
	method:	'GET',
	headers:{
		'Content-Type' : 'application/json'
	}
	}).then(response => response.json())
		.then(result => {
			if (result.length > 0) {
				cargarDatos(result, CiudadOrigen, CiudadDestino);
			} else {
				console.log(JSON.stringify(result));
			}
	}).catch(error => console.log('error: ' + error));
}

function cargarDatos(data, Origen, Destino){
	console.log('Este es origen:' + Origen);
	console.log('Este es destino:' + Destino);
	$("#dataInfo tr").remove();
	if(Origen == data[0].CiudadOrigen && Destino == data[0].CiudadDestino){
		$("#dataInfo").append('<tr><td>Ciudad de origen:</td>' + `<tr><td>${data[0].CiudadOrigen}</td><td>` + '<tr><td>Ciudad de destino:</td>' + `<tr><td>${data[0].CiudadDestino}</td><td>` 
		+ '<tr><td>Horarios:</td>' + `<tr><td>${data[0].Horarios}</td><td>`);	
	}else(
		$("#dataInfo").append('<tr><td>No se encontro la ruta</td>')
	)
}

function submitConsulta(email,pass){
	var bandera = 0;
	console.log("Entró a llamar");
	fetch('http://localhost/Tec-Internet/server/business/UserConsulta.php',{
	method:	'GET',
	headers:{
		'Content-Type' : 'application/json'
	}
	}).then(response => response.json())
        .then(result => {
            if (result.length > 0) {
                //cargarDatos(result);
				//console.log(JSON.stringify(result));
				for (var i=0; i<result.length; i++){
					//console.log(email + " + " + result[i].Correo);
					if(email == result[i].Correo){
						bandera = 1;
						if(bandera == 1){
							if(pass == result[i].Contrasena){
								bandera = 2;
								us = result[i].idUsuario;
							}
						}
					}
				}
				ayuda(bandera);
            } else {
				console.log("Error");
            }
        })
        .catch(error => console.log('error: ' + error));
	return bandera;
}

function ayuda(flag){
	if(flag == 0){
		//console.log("Usuario no encontrado");
		var respuesta = document.getElementById('alerta2');
		respuesta.innerHTML = `<div class="alert alert-danger" role="alert">
		Usuario Incorrecto / Usuario no registrado.
		  </div>`
	}
	if(flag == 1){
		//console.log("Contraseña Incorrecta");
		var respuesta = document.getElementById('alerta2');
		respuesta.innerHTML = `<div class="alert alert-danger" role="alert">
		Contraseña Incorrecta.
		  </div>`
	}
	if(flag == 2){
		//console.log("Bienvenido");
		var respuesta = document.getElementById('alerta2');
		respuesta.innerHTML = `<div class="alert alert-success" role="alert">
		¡ Bienvenido !
		  </div>`
		var respuesta1 = document.getElementById('Hello');
		var ab = "Yay";
		respuesta1.innerHTML = ` <a class="btn btn-light m-3" 
		<button class="btn btn-warning" id="Inicio-tab" data-toggle="tab" href="#Continuar" role="tab" type="submit" href="#Continuar" aria-selected="true">Consultar ruta</a>`//Complementar acciones para el cierre de sesión cambiar us --> Desaparecer botón
		console.log(us);
	}
}
//Insertar Usuario

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

	fetch('http://localhost/Tec-Internet/server/business/UserInsert.php',{
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