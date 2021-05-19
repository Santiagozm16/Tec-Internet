//JAVASCRIPT
var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), 
        {
            center: {lat: 4.942523, lng: -74.012765},
            zoom: 8          
        });
    }
	

// JQUERY - Ante el evento de hacer click en la opción Mapa, se llama la función de inicializar mapa.	
$(function(){
    $("a[href='#Maps']").on('shown.bs.tab', function() {
        console.log("Aqui");
        initMap();
    });
});	


// JQUERY Consultar base de datos y mostrar en una tabla

$("#table-tab" ).click(function() {
	submitConsulta();
});

function submitConsulta(){
	console.log("Entró a llamar");
	fetch('http://localhost/TestPHP/server/index.php',{
	method:	'GET',
	headers:{
		'Content-Type' : 'application/json'
	}
	}).then(response => response.json())
        .then(result => {
            if (result.length > 0) {
                cargarDatos(result);
            } else {
                console.log(JSON.stringify(result));
            }
        })
        .catch(error => console.log('error: ' + error));
}

function cargarDatos(data){
    var rows = "";
    $("#dataTable tr").remove();
    $("#dataTable").append('<tr><td>Nombre</td>'+
    '<td>Duración</td>' + 
    '<td>Año</td>');
    for (x in data) {
        rows += `<tr><td>${data[x].nombre}</td><td>${data[x].duracion}</td><td>${data[x].anio}</td></tr>`;
    }
    $("#dataTable").append(rows);
	
}

// insertar información a la base de datos capturados desde interfaz gráfica

$(document).ready(function(){
	$("#cancionForm").submit(function(event){
		console.log("entro");
		event.preventDefault();
		submitFormInsert();
	});
});


function submitFormInsert(){
	
	var nombre = $("#nombre").val();
    var duracion = $("#duracion").val();
    var anio = $("#anio").val();
    var genero = $("#genero").val();

    var object = {"nombre":nombre,"duracion":duracion, "anio":anio, "genero":genero};
	
    console.log(object);
		
	fetch('http://localhost/TestPHP/server/insertCancion.php',{
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
		if(data === "OK"){
			formSuccess();
        }
        else{
            alert("Error al insertar");
        }
	})
	.catch(function(err){
		console.error(err);
	});
}


function formSuccess(){
	alert("Datos almacenados");
}