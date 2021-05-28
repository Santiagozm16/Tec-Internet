//Mi JavaScript
var us = 0; //-->Variable para relacionar comentarios con el usuario
var nombre;

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
//Cargar ruta
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
//Consultar usuario para inicio de Sesión
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
								nombre = result[i].NombreApellido;
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
//Función para generar mensajes emergentes
function ayuda(flag){
	console.log("Usuario no encontrado");
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
		  </div>`;
		var respuesta0 = document.getElementById('Hello0');
		var respuesta1 = document.getElementById('Hello');
		var respuesta2 = document.getElementById('Hello2');
		var respuesta3 = document.getElementById('Hello3');
		var respuesta4 = document.getElementById('Hello4');
		var respuesta5 = document.getElementById('Hello5');
		respuesta0.innerHTML = "Bienvenido " + nombre;
		respuesta1.innerHTML = ` <a class="btn btn-light m-3" 
		<button class="btn btn-warning" id="Inicio-tab" data-toggle="tab" href="#Continuar" role="tab" type="submit" href="#Continuar" aria-selected="false">Consultar ruta</a>`//Complementar acciones para el cierre de sesión cambiar us --> Desaparecer botón
		console.log(us);
		console.log(nombre);
		respuesta2.innerHTML = ` <a class="btn btn-light m-3" 
		<button class="btn btn-warning" id="Inicio-tab" data-toggle="tab" role="tab" type="submit" aria-selected="false" href="#Inicio" onclick="cerrarSesion()"> Cerrar Sesión </a>`;
		respuesta3.innerHTML = "";
		respuesta4.innerHTML = " ";
		respuesta5.innerHTML = " ";
	}
}

function cerrarSesion(){
	var respuesta0 = document.getElementById('Hello0');
	var respuesta1 = document.getElementById('Hello');
	var respuesta2 = document.getElementById('Hello2');
	var respuesta3 = document.getElementById('Hello3');
	var respuesta4 = document.getElementById('Hello4');
	var respuesta5 = document.getElementById('Hello5');
	respuesta0.innerHTML = " ";
	respuesta1.innerHTML = " ";
	respuesta2.innerHTML = " ";
	respuesta3.innerHTML = `<a class="btn btn-light m-3" id="Inicio-tab" data-toggle="tab" href="#Inicio" role="tab"
	aria-selected="false">Inicio</a>`;
	respuesta4.innerHTML = `<a class="btn btn-light m-3" id="home-tab" data-toggle="tab" href="#Table" role="tab"
	aria-controls="home" aria-selected="false">Iniciar Sesión</a>`;
	respuesta5.innerHTML = `<a class="btn btn-light m-3" id="table-tab" data-toggle="tab" href="#Registro" role="tab" aria-controls="tabla"
	aria-selected="false">Registro</a>`;
	us = 0;
	nombre = null;
	console.log(us);
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