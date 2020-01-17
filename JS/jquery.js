/* https://victoruizr.github.io/Peliculas/ */

var pagina = 1;
var imagenes = 0;
var peticionEnCurso = false;

function crearElementosBase() {
	$("body").addClass("bg-dark");
	var container = $("<div class=container-fluid></div>");
	var div1 = $('<div id="div1" class="row"><div>');
	$("body").append(container);

	var fila1 = $("<div id=fila class=row></div>");
	var columna1 = $("<div id=menu class=col></div>");
	var menu = $(
		"<nav class='navbar navbar-expand-lg navbar-dark bg-dark'></nav>"
	);
	var clasmenu = $("<a class='navbar-brand' href='#'></a>");
	var logo = $(
		"<img id='logo' src='https://www.beep.es/blog/wp-content/uploads/2016/05/cine_icono.png' width=125 height=100></a>"
	);
	var boton = $(
		"<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'></button>"
	);

	var estilo = $("<span class='navbar-toggler-icon'></span>");
	var barra = $(
		"<div class='collapse navbar-collapse' id='navbarSupportedContent'></div>"
	);
	var lista = $(
		"<select  id='tipos' class='form-control bg-dark text-white' style='width:10rem'></select>"
	);
	var seleccion1 = $("<option value='series'>Series</option>");
	var seleccion2 = $("<option value='peliculas'>Peliculas</option>");
	var buscar = $(
		"<input id='texto' class='form-control mr-sm-2 mr-md-2 ml-md-2 col-md-10' style='width:20rem' type='search' placeholder='Search' aria-label='Search'></input>"
	);
	var botonBuscar = $(
		"<button id='search' class='btn btn-outline-light my-2 my-sm-0 ml-sm-0' type='submit'>Search</button>"
	);
	/* Añadiendo el menu*/
	$(".container-fluid").append(fila1);
	$("#fila").append(columna1);
	$("#menu").append(menu);
	$(".navbar").append(clasmenu);
	$(".navbar-brand").append(logo);
	$(".navbar").append(boton);
	$(".navbar-toggler").append(estilo);
	$(".navbar").append(barra);
	$(".navbar-collapse").append(lista);
	$("#tipos").append(seleccion1);
	$("#tipos").append(seleccion2);
	$(".collapse").append(buscar);
	$(".collapse").append(botonBuscar);

	/*ventana*/
	var modal = $(
		"<div id='mymodal' class='modal fade bg-transparent ' tabindex='-1' role='dialog'></div>"
	);
	var dialog = $("<div class='modal-dialog bg-dark ' role='document'></div>");
	var content = $("<div class='modal-content bg-dark text-white'></div>");
	var header = $("<div class='modal-header'>");
	var title = $("<h5 class='modal-title'></h5>");
	var boton2 = $(
		"<button type='button' class='close descripcion' data-dismiss='modal' aria-label='Close'></button>"
	);
	var style = $("<span aria-hidden='true'>&times;</span>");
	var body = $("<div class='modal-body'></div>");
	var bar = $("<div class='progress'></div>");
	var progresbar = $(
		"<div class='progress-bar bg-secondary' role='progressbar' style='width: 25%; aria-valuemin='0' aria-valuemax='100'>25%</div>"
	);
	/*Añadiendo ventana*/
	$(".container-fluid").append(modal);
	$("#mymodal").append(dialog);
	$(".modal-dialog").append(content);
	$(".modal-content").append(header);
	$(".modal-header").append(title);
	$(".modal-header").append(boton2);
	$(".close").append(style);
	$(".modal-content").append(body);
	$(".modal-content").append(bar);
	$(".progress").append(progresbar);
	$(".container-fluid").append(div1);
}

/*Esta funcion lo que hacer es cambiar la imagen en caso de que esta no esté disponible*/
function CambioDeImagen() {
	$("img").on("error", function() {
		$(this).attr(
			"src",
			"https://fistiktekstil.com/blog/wp-content/uploads/2019/12/img.jpg"
		);
	});
}

/*Esta funcion recibe como paramtro el e de result search para posteriormente maquetar la imagen con el src poster*/
function crearImagenes(e) {
	var card = $("<div id='" + e.imdbID + "' class='col 2 mt-5 ml-3'></div>");
	var cardImagen = $(
		"<div class='card' style='width: 18rem; height: 30rem'></div>"
	);
	var cardCurpo = $("<div class='card-body'></div>");
	var h5 = $("<h5 class='card-title'></h5>");
	var btn = $("<a class='btn btn-dark text-white'>Mas informacion</a>");
	var imagen = $(
		"<img class='card-img-top' style='height: 20rem' src='" + e.Poster + "'>"
	);
	$("#div1").append(card);
	$("#" + e.imdbID).append(cardImagen);
	$("#" + e.imdbID + " .card").append(imagen);
	$("#" + e.imdbID + " .card").append(cardCurpo);
	$("#" + e.imdbID + " .card .card-body").append(h5);
	$("#" + e.imdbID + " .card .card-body").append(h5);
	$("#" + e.imdbID + " .card .card-body .card-title").append(e.Title);
	$("#" + e.imdbID + " .card .card-body").append(btn);
	CambioDeImagen();
	/*con esto añadimos el click tanto para el boton como para la imagen */
	obtenerDatos(btn, e.imdbID);
	obtenerDatos(imagen, e.imdbID);
}

/*En este caso obtengo los datos y los meto en un array para su posterior uso*/
function todosLosDatos(result) {
	var datos = [
		"<strong> " + result.Title + "</strong><br>",
		"<strong>Año</strong> " + result.Year + "</strong><br>",
		"<strong>Released</strong> " + result.Released + "<br>",
		"<strong>Director</strong> " + result.Director + "<br>",
		"<strong>Writter</strong> " + result.Writer + "<br>",
		"<strong>Plot</strong> " + result.Plot + "<br>",
		"<strong>Languaje</strong> " + result.Languaje + "<br>",
		result.Metascore
	];
	return datos;
}

/*Esta funcion se efectua cuando se hace un clcik en cada una de las imagenes de manera que cada imagen cambia el contenido del modal*/
function descripcion(result) {
	var datos = todosLosDatos(result);
	$(".modal-title").empty();
	$(".modal-body").empty();
	$(".progress-bar").empty();
	imagen = $(
		"<img class='card-img-top' style='height: 36rem;' src='" +
			result.Poster +
			"'>"
	);
	$("#mymodal .modal-title").append(datos[0]);
	$("#mymodal .modal-body").append(imagen);
	$("#mymodal .modal-body").append(datos[1]);
	$("#mymodal .modal-body").append(datos[2]);
	$("#mymodal .modal-body").append(datos[3]);
	$("#mymodal .modal-body").append(datos[4]);
	$("#mymodal .modal-body").append(datos[5]);
	$("#mymodal .modal-body").append(datos[6]);
	/*Preguntar */
	if (datos[7] == "N/A") {
		$(".progress-bar").width("0%");
	} else {
		$(".progress-bar").width(datos[7] + "%");
		$(".progress-bar").append(datos[7] + "/100");
	}
	$("#mymodal").modal("show");
	CambioDeImagen();
}

/*Esta funcion obtiene a traves de una peticion ajax la informacion de la pelicula*/
function obtenerDatos(objeto, id) {
	objeto.click(function() {
		$.ajax({
			url: "https://www.omdbapi.com/?i=" + id + "&apikey=ffbf2dce",
			success: function(result) {
				descripcion(result);
			}
		});
	});
}

/*Esta funcion es llamada cuando se clicka en el boton search y sele pasa como parametro el tipo(Movie o serie)*/
function peticionBoton(tipo) {
	$.ajax({
		url:
			"https://www.omdbapi.com/?s=" +
			$("#texto").val() +
			"&type=" +
			tipo +
			"&apikey=ffbf2dce",
		success: function(result) {
			$.each(result.Search, function(i, e) {
				crearImagenes(e);
			});
		}
	});
}

/*Esta funcion se ejecuta al clickar el boton search y comprueba si en la lista esta seleccionada una peli o serie y en funcion de eso se hace una peticion ajax u otra*/
function clicadoEnBoton() {
	$("#div1").empty();
	var a = $("#tipos option:selected").val();
	if (a == "series" || a == undefined) {
		peticionBoton("series");
	} else if (a == "peliculas") {
		peticionBoton("Movie");
	}
}

/*Esta funcion es llamada cuando el scroll llega al final y lo que hace es una peticion ajax en el que incrementa el numero de páginas y muestra una imagen mientras recibe los datos*/
function peticionScroll(tipo) {
	if (!peticionEnCurso) {
		peticionEnCurso = true;
		$.ajax({
			url:
				"https://www.omdbapi.com/?s=" +
				$("#texto").val() +
				"&page=" +
				(pagina += 1) +
				"&type=" +
				tipo +
				"&apikey=ffbf2dce",
			beforeSend: function() {
				$("#cargando").show();
			},
			complete: function() {
				$("#cargando").hide();
			},
			success: function(result) {
				$.each(result.Search, function(i, e) {
					crearImagenes(e);
				});
				peticionEnCurso = false;
			}
		});
	}
}
/*Esta funcion se ejecuta cuando el scroll llega al final*/
function Scroll() {
	if ($(window).scrollTop() == $(document).height() - $(window).height()) {
		if (
			$("#tipos option:selected").val() == "series" ||
			$("#tipos option:selected").val() == undefined
		) {
			peticionScroll("series");
		} else if (
			$("#tipos option:selected").val() ==
			"peliculas" /* &&(bloqueado==false) */
		) {
			peticionScroll("Movie");
		}
	}
}

crearElementosBase();
$("#search").click(function() {
	clicadoEnBoton();
});

$(window).on("scroll", function() {
	Scroll();
});
