/**
 * 
 */
var TOKEN_KEY = 'jwtToken';
//array labela koje se salju na server
var lab=[];
$(document).ready(function(e){
	checkFirstTime();
	getAirline();
})

function getAirline() {
	var token = getJwtToken(TOKEN_KEY);
	if (token) {
		$.ajax({
			type : 'GET',
			url : "/api/getAirline",
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			dataType : "json",
			success : function(data) {
				if (data == null) {
					alert('Error while finding logged one!');
				} else {
					displayAirline(data);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert(jqXHR.status);
				alert(textStatus);
				alert(errorThrown);
			}
		})
	}
}

function displayAirline(data){
	$('#main').empty();
	var tab = '<div class="tab">'+
        '<button class="tablinks" onclick="openCity(event, \'Home\')" id="defaultOpen">About</button>'+
        '<button class="tablinks" onclick="openCity(event, \'Destinations\')" id="roomsOpen">Destinations</button>'+
        '<button class="tablinks" onclick="openCity(event, \'Flights\')" id="offersOpen">Flights</button>'+
        '<button class="tablinks" onclick="openCity(event, \'Fast\')" id="offersOpen">Fast Reservations</button>'+
    '</div>'+
    '<div class="tabcontent" id="Home">'+
        '<table class="content_table" id="airlineInfo">'+ 
        '</table>'+
    '</div>'+
    '<div id="Destinations" class="tabcontent">'+
        '<table class="table85" id="destinationsDisp">'+
        '</table>'+
    '</div>'+
		'<div id="Flights" class="tabcontent">'+
        '<table class="content_table" id="flightsDisp">'+
        '</table>'+
    '</div>'+'<div id="Fast" class="tabcontent">'+
    '<table class="content_table" id="fastRes">'+
    '</table>'+
'</div>';
	$('#main').append(tab);
	
	var modal = '<div id="modal" class="modal">'+
			        '<div class="ombre_div">'+
				    '<span class="close" id="close">&times;</span>'+
				    '<form enctype="multipart/form-data" id="uploadImageForm" name="uploadImageForm">'+
				        '<table class="ombre_table">'+
				        	'<tr>'+
				                '<td><h3>Image: </h3></td>'+
				            '</tr>'+
				            '<tr>'+
				                '<td><input type="file" name="file" /></td>'+
				            '</tr>'+
				            '<tr>'+
				            	'<td><input type="submit" value="Upload"/></td>'+
				            '</tr>'+
				        '</table>'+
				    '</form>'+
				'</div>'+
				'</div>';
	$('#main').append(modal);
	
	var modal2 = '<div id="modal2" class="modal">'+
        '<div class="ombre_div">'+
	    '<span class="close" id="close2">&times;</span>'+
	    '<form id="editHotelForm">'+
	        '<table class="ombre_table">'+
	        	'<tr>'+
	                '<td><input type="hidden" id="airlineId"/></td>'+
	            '</tr>'+
	            '<tr>'+
	                '<td><h3>Name: </h3></td>'+
	            '</tr>'+
	            '<tr>'+
	                '<td><input type="text" id="airlineName"/></td>'+
	            '</tr>'+
	            '<tr>'+
	                '<td><h3>Address: </h3></td>'+
	            '</tr>'+
	            '<tr>'+
	                '<td><input type="text" id="airlineAdress"/></td>'+
	            '</tr>'+
	            '<tr>'+
	                '<td><h3>Description: </h3></td>'+
	            '</tr>'+
	            '<tr>'+
	                '<td>'+
	                    '<textarea id="hotelDesc"></textarea>'+
	                '</td>'+
	            '</tr>'+
	            '<tr>'+
	                '<td><input type="submit" value="Save changes" /></td>'+
	           '</tr>'+
	        '</table>'+
	    '</form>'+
	'</div>'+
	'</div>';
	
	$('#main').append(modal2);
	
	document.getElementById("defaultOpen").click();
	
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	$.each(list, function(index, airline){
		//localStorage.setItem("airlineid", airline.id);
		var tr1=$('<tr></tr>');
		tr1.append('<td><h2>' + airline.name + '</h2></td>');
		tr1.append('<td><div class="edit_input"><input type="button" value="Edit info" id="edit" /></div></td><td></td>');
		var tr2=$('<tr></tr>');
		tr2.append('<td><h4>'+ airline.address +'</h4></td>');
		var tr3=$('<tr></tr>');
		tr3.append('<td colspan="2"><div class="middle_container"><p>'+ airline.description +'</p></div></td>');
		var tr4=$('<tr></tr>');
		tr4.append('<td><div><img src='+ airline.image + ' class="image" /></div></td>');
		tr4.append('<td>'+
                '<div class="rating">' +
                '<span class="heading">User Rating</span>'+
                '<span class="fa fa-star"></span>' +
                '<span class="fa fa-star"></span>' +
                '<span class="fa fa-star"></span>' +
                '<span class="fa fa-star"></span>' +
                '<span class="fa fa-star"></span>' +
                '<p>0 average based on 0 reviews.</p>' +
                '<hr style="border:3px solid #f1f1f1">' +
                '<div class="row">' +
                 '   <div class="side">' +
                  '      <div>5 star</div>' +
                   ' </div>' +
                    '<div class="middle">' +
                     '   <div class="bar-container">' +
                      '      <div class="bar-1"></div>' +
                       ' </div>' +
                    '</div>' +
                    '<div class="side right">' +
                     '   <div>0</div>' +
                    '</div>' +
                    '<div class="side">' +
                     '   <div>4 star</div>' +
                    '</div>' +
                    '<div class="middle">' +
                     '   <div class="bar-container">' +
                      '      <div class="bar-1"></div>' +
                       ' </div>' +
                    '</div>' +
                    '<div class="side right">' +
                     '   <div>0</div>' +
                    '</div>' +
                    '<div class="side">' +
                     '   <div>3 star</div>' +
                    '</div>' +
                    '<div class="middle">' +
                    '    <div class="bar-container">' +
                     '       <div class="bar-1"></div>' +
                     '   </div>' +
                    '</div>' +
                    '<div class="side right">' +
                     '   <div>0</div>' +
                    '</div>' +
                    '<div class="side">' +
                     '   <div>2 star</div>' +
                    '</div>' +
                    '<div class="middle">' +
                    '    <div class="bar-container">' +
                     '       <div class="bar-1"></div>' +
                     '   </div>' +
                    '</div>' +
                    '<div class="side right">' +
                     '   <div>0</div>' +
                    '</div>' +
                    '<div class="side">' +
                     '   <div>1 star</div>' +
                    '</div>' +
                    '<div class="middle">' +
                     '   <div class="bar-container"> '+
                      '      <div class="bar-1"></div>' +
                       ' </div>' +
                    '</div>' +
                    '<div class="side right">' +
                     '   <div>0</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</td>');
		var tr5=$('<tr></tr>');
		tr5.append('<td><div class="edit_input"><input type="button" value="Upload image" id="uploadImage" /></div></td>');
		$('#airlineInfo').append(tr1);
		$('#airlineInfo').append(tr2);
		$('#airlineInfo').append(tr3);
		$('#airlineInfo').append(tr4);
		$('#airlineInfo').append(tr5);
		
	})
	getDestinations();
	getFlights();
	getFastSeatReservations();
}

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

$(document).on('click','#edit',function(e){
    var modal = document.getElementById('modal2');
	var span = document.getElementById("close2");
	modal.style.display = "block";
	span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})

$(document).on('click','#uploadImage',function(e){
    var modal = document.getElementById('modal');
	var span = document.getElementById("close");
	modal.style.display = "block";
	span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})

$(document).on('submit', "#uploadImageForm", function(event){
	 event.preventDefault();
	 var formElement = this;
	 var formData = new FormData(formElement);
	 uploadImage(formElement, formData, "/api/editAirlineImage");
	 event.preventDefault();
})

/*LOGOUT AIRLINE ADMINISTRATORA*/
$(document).on('click', '#logout_button', function(e) {
	e.preventDefault();
	removeJwtToken(TOKEN_KEY);
	localStorage.clear();
	window.location.href = "index.html";
})


/*PRIKAZ PROFILA AIRLINE ADMINISTRATORA*/
$(document).on('click', '#viewUserProfile_button', function(e){
	e.preventDefault();
	$.ajax({
		type : 'GET',
		url : "/api/viewUserProfile",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType: 'json',
		success : viewUserProfile,		
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
})


$(document).on('click', '#airlineProfile', function(e){
	e.preventDefault();
	getAirline();
})

function viewUserProfile(user){
		$('#main').empty();
		//$('#main').append('<img src = "'+ korisnik.slika + '" width= "409px" height= "318">');
		$('#main').append('<div class="ombre_div" id="userProfile"></div>' );
		$('#userProfile').append('<h1>' +"View user profile"+ '</h1>' );
		var tabela1 = $('<table class="ombre_table"></table>');
		tabela1.append('<tr><td> Name:</td><td>' +  user.name +'</td></tr>');
		tabela1.append('<tr><td> Surname:</td><td>' +  user.surname +'</td></tr>');
		tabela1.append('<tr><td> Username:</td><td>' +  user.username +'</td></tr>');
		tabela1.append('<tr><td> Email:</td><td>' +  user.email +'</td></tr>');
		tabela1.append('<tr><td colspan="2"><input type="button" id="izmenaProfila_btn" value="Edit Profile"/></td></tr>');
		$('#userProfile').append(tabela1);
}

/*UPDATE PROFILA AIRLINE ADMINISTRATORA*/
$(document).on('click', '#izmenaProfila_btn', function(e){
	e.preventDefault();
	$.ajax({
		type : 'GET',
		url : "/api/viewUserProfile",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType: 'json',
		success : prikazPodatakaZaIzmenu,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
})


function prikazPodatakaZaIzmenu(data){
	var tabela = $('<table class="ombre_table"></table>');
	tabela.append('<tr><td> Ime:</td></tr>' +  '<tr><td><input type = "text" name = "name" value = "'+ data.name + '"</td></tr>');
	tabela.append('<tr><td> Prezime:</td></tr>' +  '<tr><td><input type = "text" name = "surname" value = "'+ data.surname + '"></td></tr>');
	
	//tabela.append('<tr><td> Korisnicko ime:</td><td>' +  '<input type = "text" name = "username" value = "'+ data.username + '"></td></tr>');
	tabela.append('<tr><td> Lozinka:</td></tr>' +  '<tr><td><input type = "password" name = "password" value = "'+ data.password + '"></td></tr>');
	
	tabela.append('<tr><td> Email:</td></tr><tr><td>' +  '<input type = "text" name = "email" value = "'+ data.email + '"></td></tr>');
	//tabela.append( '<tr><td> Nova slika:</td>' + '<td><input type="file" name = "slika" id = "slika" accept="image/*"> </td></tr>');
	tabela.append('<tr><td></td></tr><tr><td>' +  '<input type = "submit" value = "Posalji izmene" ></td></tr>');
	var forma = $('<form class = "posaljiIzmeneZaProfil"></form>');
	//forma.append('<input type = "hidden" value="' + data.id +'">');
	forma.append(tabela);
	$('#main').empty();
	//$('.main').append('<img src = "'+ data.slika + '" width= "411px" height= "321">');
	$('#main').append('<div class="ombre_div" id="changeProfile"></div>' );
	$('#changeProfile').append('<h1>Change your informations:</h1>');
	$('#changeProfile').append(forma);	
}

$(document).on('submit', '.posaljiIzmeneZaProfil', function(e){
	e.preventDefault();
	//var id = $(this).find('input[type=hidden]').val(); 
	//var username = $(this).find("input[name = username]").val();
	var password = $(this).find("input[name = password]").val();
	var name = $(this).find("input[name = name]").val();
	var surname = $(this).find("input[name = surname]").val();
	var email = $(this).find("input[name = email]").val();
	//var file = $("#slika")[0].files[0];
	if ( password == "" || name == "" || surname == "" ||  email == "" ){
		alert("Morate popuniti sva polja!");
		return false;
	}	
	$.ajax({
		type : 'PUT',
		url : '/api/updateUserProfile',
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType: 'application/json',
		data: formToJSON_profilIZ(password,name,surname,  email),
		success : function(data){
			$('#main').empty();
			setJwtToken(TOKEN_KEY, data.accessToken);
        	$('#main').append('<p>Uspesno ste izmenili podatke.</p>');
			/*if (file == undefined){
				$('.main').empty();
	        	$('.main').append('<p>Uspesno ste izmenili podatke.</p>');
			}
			else{
				uploadImage(file);
			}	*/
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: NISAM ULETEO U UPDATE KORISNIKA" + errorThrown);
		}
	});	
})

function formToJSON_profilIZ(password,name,surname,  email) {
	return JSON.stringify({
		"password" : password,
		"name" : name,
		"surname" : surname,
		"email" : email
	});
}








/*DODAVANJE NOVE DESTINACJE*/
$(document).on('click', '#dodajDest_btn', function(e){
	e.preventDefault();
	var tabela = $('<table class="ombre_table"></table>');
	tabela.append('<tr><td> Name of destination:</td></tr><tr><td>' +  '<input type = "text" name = "name" ></td></tr>');
	tabela.append('<tr><td> Destination coordinates:</td></tr><tr><td>' +  '<input type = "text" name = "coordinates" ></td></tr>');
	tabela.append('<tr><td> Destination description:</td></tr><tr><td>' +  '<input type = "text" name = "description" ></td></tr>');
	
	
	/*tabela.append('<tr><td> Naziv destinacije:</td><td>' +  '<input type = "text" name = "nazivDestinacije" ></td></tr>');
	tabela.append('<tr><td> Drzava:</td><td>' +  '<input type = "text" name = "drzava"></td></tr>');
	tabela.append('<tr><td> Naziv aerodorma:</td><td>' +  '<input type = "text" name = "nazivAerodroma" ></td></tr>');
	tabela.append('<tr><td> Kod aerodroma:</td><td>' +  '<input type = "text" name = "kodAerodroma"> </td></tr>');
	tabela.append('<tr><td> Lokacija:</td><td>' +  '<input type = "text" name = "lokacija"> </td></tr>');
	tabela.append('<tr><td> Stanje destinacije:</td> <td><select name = "stanjeDestinacije">'
			+ '<option>Aktivna</option>'
			+ '<option>Arhivirana</option>'
			+'</select></td></tr>');
	tabela.append( '<tr><td> Slika destinacije:</td>' + '<td><input type="file" name = "slika" id = "slika" accept="image/*"> </td></tr>');*/
	tabela.append('<tr><td></td></tr><tr><td>' +  '<input type = "submit" value = "Posalji" ></td></tr>');
	var forma = $('<form id = "dodajDestForma" enctype="multipart/form-data"></form>');
	forma.append(tabela);
	$('#main').empty();
	$('#main').append('<div class="ombre_div" id="addDestinationForm"></div>')
	$('#addDestinationForm').append('<h1>New Destination</h1>');
	$('#addDestinationForm').append(forma);
})

$(document).on('submit', '#dodajDestForma', function(e){
	e.preventDefault();
	var name = $(this).find("input[name = name]").val();
	var coordinates = $(this).find("input[name = coordinates]").val();
	var description = $(this).find("input[name = description]").val();
	
	/*var nazivDestinacije = $(this).find("input[name = nazivDestinacije]").val();
	var drzava = $(this).find("input[name = drzava]").val();
	var nazivAerodroma = $(this).find("input[name = nazivAerodroma]").val();
	var kodAerodoma = $(this).find("input[name = kodAerodroma]").val();
	var lokacija = $(this).find("input[name = lokacija]").val();
	var stanjeDestinacije = $(this).find("select[name = stanjeDestinacije]").val();
	var file = $("#slika")[0].files[0];
	if (nazivDestinacije == "" || drzava == "" || nazivAerodroma == "" || kodAerodoma == "" || lokacija == ""){
		alert("Morate popuniti sva polja!");
		return false;
	}*/
	
	
	if (name == "" || coordinates == "" || description == "" ){
		alert("Morate popuniti sva polja!");
		return false;
	}
	$.ajax({
		type : 'POST',
		url : "/api/addDestination",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		//url : '../Projekat/rest/admini/dodajDestinaciju',
		contentType: 'application/json',
		dataType : 'json',
		data: formToJSON_dest(name, coordinates,  description),
		success : function(data){
			alert("Successfully added destination.");
			/*if (data != null){
				if (file == undefined){
					$('.main').empty();
		        	$('.main').append('<p>Uspesno ste dodali novu destinaciju.</p>');
				}
				else{
					uploadImageDest(file);
				}
				
			}
			else{
				alert("destinacija sa tim nazivom vec postoji!");
			}*/
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("ULETEO SAM U AJAX ERROR: " + errorThrown);
		}
	});	
	
})

function formToJSON_dest(name, coordinates,  description){
	return JSON.stringify({
		"name" : name,
		"coordinates" : coordinates,
		"description" : description
	});
}

/*PRIKAZ DESTINACIJA*/
function getDestinations(){
	$.ajax({
		type : 'GET',
		url : "/api/getDestinations",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType: 'json',
		success : prikazDestinacija,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
}

function prikazDestinacija(data){
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	//var tabela = $('<table class = "mainTable"></table>')
	/*zagalvlje tabele*/
	/*var tr_h = $('<tr></tr>');
		
		tr_h.append('<th>Naziv destinacije</th>');
		tr_h.append('<th>Opis destinacije</th>');
		tr_h.append('<th>Koordinate destinacije</th>');
		tr_h.append('<th></th>');
		*/
		/*tr_h.append('<th>Naziv destinacije</th>');
		tr_h.append('<th>Drzava</th>');
		tr_h.append('<th>Naziv aerodroma</th>');
		tr_h.append('<th>Kod</th>');
		tr_h.append('<th>Lokacija</th>');
		tr_h.append('<th>Stanje destinacije</th>');
		tr_h.append('<th></th>');
		tr_h.append('<th></th>');*/
	/*
	var t_head = $('<thead></thead>');
	t_head.append(tr_h);
	tabela.append(t_head);
	//telo tabele
	var t_body = $('<tbody></tbody>')
		var tr = $('<tr></tr>');
		tr.append('<td>'+ destinacija.name + '</td>');
		tr.append('<td>'+ destinacija.description + '</td>');
		tr.append('<td>'+ destinacija.coordinates + '</td>');
		*/
		/*tr.append('<td>'+ '<img src= "' + destinacija.slikaDestinacije + '" alt = "nisam nasao" width= "261px" height= "121">' + '</td>');
		tr.append('<td>'+ destinacija.nazivDestinacije + '</td>');
		tr.append('<td>'+ destinacija.drzava + '</td>');
		tr.append('<td>'+ destinacija.nazivAerodroma + '</td>');
		tr.append('<td>'+ destinacija.kodAerodroma + '</td>');
		tr.append('<td>'+ destinacija.lokacija + '</td>');
		tr.append('<td id = "stanje_' + destinacija.nazivDestinacije + '">'+ destinacija.stanjeDestinacije + '</td>');
		var forma = $('<form class = "arhiviranje"></form>')
		forma.append('<input type = "hidden" value="' + destinacija.nazivDestinacije +'">');
		if (destinacija.stanjeDestinacije == "ARHIVIRANA"){
			
			forma.append('<input type = "submit" id = "arhiviranje_' + destinacija.nazivDestinacije +'" value = "Aktiviraj">')
		}
		else{
			forma.append('<input type = "submit" id = "arhiviranje_' + destinacija.nazivDestinacije +'" value = "Arhiviraj">')
		}*/
	/*
		var forma2 = $('<form class = "izmenaDestinacije"></form>')
		forma2.append('<input type = "hidden" value="' + destinacija.id +'">');
		forma2.append('<input type = "submit" value = "Izmena">');
		//var td = $('<td></td>');
		var td2 = $('<td></td>');
		//td.append(forma);
		td2.append(forma2);
		//tr.append(td);
		tr.append(td2);
		t_body.append(tr);
	*/
	$.each(list, function(index, destinacija){
		var tr1 = $('<tr></tr>');
		tr1.append('<td><h2>'+destinacija.name+'</h2></td><td></td>');
		var tr2 = $('<tr></tr>');
		tr2.append('<td><p>'+destinacija.description+'</p></td>'+'<td align="right"><h3>Coordinates: '+destinacija.coordinates+'</h3></td>');
		var forma2 = $('<tr><td><input type = "button" name="' + destinacija.id +'" class="izmenaDestinacije" value="Edit destination"></td></tr>');
		var tr4=$('<tr></tr>');
		tr4.append('<td><hr /></td><td><hr /></td>');
		$('#destinationsDisp').append(tr1);
		$('#destinationsDisp').append(tr2);
		$('#destinationsDisp').append(forma2);
		$('#destinationsDisp').append(tr4);
	});
	/*
	tabela.append(t_body);
	$('#main').empty();
	$('#main').append(tabela);
	*/
}
/*IZMENA DESTINACIJA*/
$(document).on('click', '.izmenaDestinacije', function(e){	
	e.preventDefault();
	var id = $(this).attr("name");
	//var adresa = '../Projekat/rest/admini/pronadjiDestinaciju/' + nazivDest;
	var adresa = "/api/getDestination/" + id;
	
	$.ajax({
		type : 'GET',
		url : adresa,
        headers : createAuthorizationTokenHeader(TOKEN_KEY),
        dataType: 'json',
        success: prikazDestinacijeZaIzmenu,
        error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: NIJE ULETEO U PRIKAZ JEDNE  DESTINACIJE" + errorThrown);
		}
	});
})

function prikazDestinacijeZaIzmenu(data){
	var tabela = $('<table class="ombre_table"></table>');
	tabela.append('<tr><td> Naziv destinacije:</td></tr><tr><td>' +  '<input type = "text" name = "name" value = "'+ data.name + '"></td></tr>');
	tabela.append('<tr><td> Opis destinacije:</td></tr><tr><td>' +  '<input type = "text" name = "description" value = "'+ data.description + '"</td></tr>');
	tabela.append('<tr><td> Koordinate destinacije:</td></tr><tr><td>' +  '<input type = "text" name = "coordinates" value = "'+ data.coordinates + '"></td></tr>');
	//tabela.append('<tr><td> Kod aerodroma:</td><td>' +  '<input type = "text" name = "kodAerodroma" value = "'+ data.kodAerodroma + '"></td></tr>');
	//tabela.append('<tr><td> Lokacija:</td><td>' +  '<input type = "text" name = "lokacija" value = "'+ data.lokacija + '"></td></tr>');
	//tabela.append( '<tr><td> Nova slika:</td>' + '<td><input type="file" name = "slika" id = "slika" accept="image/*"> </td></tr>');
	tabela.append('<tr><td>' +  '<input type = "submit" value = "Posalji izmene" ></td></tr>');
	var forma = $('<form class = "posaljiIzmeneZaDestinaciju"></form>');
	forma.append('<input type = "hidden" value="' + data.id +'">');
	forma.append(tabela);
	$('#main').empty();
	$('#main').append('<div class="ombre_div" id="destinationEdit"></div>');
	//$('.main').append('<img src = "'+ data.slikaDestinacije + '"width= "461px" height= "321">');
	$('#destinationEdit').append('<h1>Izmena destinacije</h1>');
	$('#destinationEdit').append(forma);
}

$(document).on('submit', '.posaljiIzmeneZaDestinaciju', function(e){
	e.preventDefault();
	var id = $(this).find('input[type=hidden]').val(); 
	var name = $(this).find("input[name = name]").val();
	var description = $(this).find("input[name = description]").val();
	var coordinates = $(this).find("input[name = coordinates]").val();
	//var kodAerodoma = $(this).find("input[name = kodAerodroma]").val();
	//var lokacija = $(this).find("input[name = lokacija]").val();
	//var file = $("#slika")[0].files[0];
	if (name == "" || description == ""  || coordinates == "" ){
		alert("Nijedno polje ne sme ostati prazno!");
		return false;
	}		
	$.ajax({
		type : 'PUT',
		//url : '../Projekat/rest/admini/izmeniDestinaciju',
		url : "/api/updateDestination",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType: 'application/json',
		dataType : 'json',
		data: formToJSON_destIZ(id,name, description,  coordinates),
		success : function(data){
			if (data != null){
				$('#main').empty();
				$('#main').append('<p>Uspesno ste izmenili destinaciju.</p>');
				/*if (file == undefined){
					$('.main').empty();
		        	$('.main').append('<p>Uspesno ste izmenili destinaciju.</p>');
				}
				else{
					changeImageDest(file);
				}	*/
			}
			else{
				alert("Destinacija sa tim nazivom vec postoji!");
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
})

function formToJSON_destIZ(id,name, description,  coordinates){
	return JSON.stringify({
		"id" : id,
		"name" : name,
		"description" : description,
		"coordinates" : coordinates
	});
}


/*DODAVANJE NOVOG LETA*/
$(document).on('click', '#dodajLet_btn', function(e){
	e.preventDefault();
	$.ajax({
		type : 'GET',
		url : "/api/getDestinations",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType: 'json',
		success : prikazFormeZaNoviLet,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
})


function prikazFormeZaNoviLet(data){

	var startDestinationSelect = $('<select name = "startDestination"></select>');
	var endDestinationSelect = $('<select name = "endDestination"></select>');
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	$.each(list, function(index, destinacija){
		startDestinationSelect.append('<option>'+ destinacija.name + '</option>');
		endDestinationSelect.append('<option>'+ destinacija.name + '</option>');
		/*if (destinacija.stanjeDestinacije == "AKTIVNA"){
			pocetnaDestinacijaSelect.append('<option>'+ destinacija.name + '</option>');
			krajnjaDestinacijaSelect.append('<option>'+ destinacija.name + '</option>');
		}*/
	});
	var td1 = $('<td></td>');
	td1.append(startDestinationSelect);
	var tr1 = $('<tr></tr>');
	tr1.append('<td> Pocetna destinacija </td>');
	tr1.append(td1);
	var td2 = $('<td></td>');
	td2.append(endDestinationSelect);
	var tr2 = $('<tr></tr>');
	tr2.append('<td> Krajnja destinacija </td>');
	tr2.append(td2);
	var tabela = $('<table class="ombre_table_flight"></table>');
	tabela.append(tr1);
	tabela.append(tr2);
	tabela.append('<tr><td> Datum poletanja:</td> <td><input type = "date" name = "startDate" ></td></tr>');
	tabela.append('<tr><td> Vreme poletanja:</td> <td><input type = "time" name = "startDate_time" ></td></tr>');
	tabela.append('<tr><td> Datum sletanja:</td> <td><input type = "date" name = "endDate" ></td></tr>');
	tabela.append('<tr><td> Vreme sletanja:</td> <td><input type = "time" name = "endDate_time" ></td></tr>');
	tabela.append('<tr><td> Trajanje leta u minutima:</td> <td><input type = "text" name = "flightDuration"> </td></tr>');
	tabela.append('<tr><td> Duzina leta u kilometrima:</td> <td><input type = "text" name = "flightLength"> </td></tr>');
	tabela.append('<tr><td> Cena karte u eknomskoj klasi:</td> <td><input type = "text" name = "economicPrice" ></td></tr>');
	tabela.append('<tr><td> Cena karte u biznis klasi:</td> <td><input type = "text" name = "businessPrice" ></td></tr>');
	tabela.append('<tr><td> Cena karte u prvoj klasi:</td> <td><input type = "text" name = "firstClassPrice" ></td></tr>');
	//tabela.append('<tr><td> Broj mesta:</td> <td><input type = "text" name = "seats" ></td></tr>');
	
	
	
	tabela.append('<tr><td> Broj redova u ekonomskoj klasi:</td> <td><input type = "text" name = "economicCapacity_rows" ></td></tr>');
	tabela.append('<tr><td> Broj kolona u ekonomskoj klasi:</td> <td><input type = "text" name = "economicCapacity_columns" ></td></tr>');
	tabela.append('<tr><td> Broj redova u biznis klasi:</td> <td><input type = "text" name = "buisinesssCapacity_rows"> </td></tr>');
	tabela.append('<tr><td> Broj kolona u biznis klasi:</td> <td><input type = "text" name = "buisinesssCapacity_columns"> </td></tr>');
	tabela.append('<tr><td> Broj redova u prvoj klasi:</td> <td><input type = "text" name = "firstClassCapacity_rows" ></td></tr>');
	tabela.append('<tr><td> Broj kolona u prvoj klasi:</td> <td><input type = "text" name = "firstClassCapacity_columns" ></td></tr>');
	
	/*tabela.append('<tr><td> Klasa aviona:</td> <td><select name = "klasaAviona">'
			+ '<option>Regionalni</option>'
			+ '<option>Prekookeanski</option>'
			+ '<option>Carter</option>'
			+'</select></td></tr>');*/
	tabela.append('<tr><td></td><td>' +  '<input type = "submit" value = "Posalji" ></td></tr>');
	var forma = $('<form class = "dodajNoviLet"></form>');
	forma.append(tabela);
	$('#main').empty();
	$('#main').append('<div class="ombre_div_66" id="newFlightForm"></div>')
	$('#newFlightForm').append('<h1>New Flight</h1>');
	$('#newFlightForm').append(forma);

}

$(document).on('submit', '.dodajNoviLet', function(e){
	
	e.preventDefault();
	var startDestination = $(this).find("select[name = startDestination]").val();
	var endDestination = $(this).find("select[name = endDestination]").val();
	var economicPrice = $(this).find("input[name = economicPrice]").val();
	var businessPrice = $(this).find("input[name = businessPrice]").val();
	var firstClassPrice = $(this).find("input[name = firstClassPrice]").val();
	var flightDuration = $(this).find("input[name = flightDuration]").val();
	var flightLength = $(this).find("input[name = flightLength]").val();
	var seats = $(this).find("input[name = seats]").val();
	
	var firstClassCapacity_rows = $(this).find("input[name = firstClassCapacity_rows]").val();
	var firstClassCapacity_columns = $(this).find("input[name = firstClassCapacity_columns]").val();
	var buisinesssCapacity_rows = $(this).find("input[name = buisinesssCapacity_rows]").val();
	var buisinesssCapacity_columns = $(this).find("input[name = buisinesssCapacity_columns]").val();
	var economicCapacity_rows = $(this).find("input[name = economicCapacity_rows]").val();
	var economicCapacity_columns = $(this).find("input[name = economicCapacity_columns]").val();
	
	var startDate = $(this).find("input[name = startDate]").val();
	var startDate_time = $(this).find("input[name = startDate_time]").val();
	var endDate = $(this).find("input[name = endDate]").val();
	var endDate_time = $(this).find("input[name = endDate_time]").val();
	//var klasaAviona = $(this).find("select[name = klasaAviona]").val();
	if (economicPrice == "" || businessPrice == "" || flightDuration == "" || flightLength == "" || economicCapacity_rows == "" || economicCapacity_columns == ""|| buisinesssCapacity_rows == ""||  buisinesssCapacity_columns == ""||  firstClassCapacity_rows == ""||  firstClassCapacity_columns == "" || startDate == "" || startDate_time == "" || endDate == "" || endDate_time == ""){
		alert("Morate popuniti sva polja!");
		return false;
	}
	
	/*if (economicPrice == "" || businessPrice == "" || flightDuration == "" || flightLength == "" || seats == ""  || startDate == "" || startDate_time == "" || endDate == "" || endDate_time == ""){
		alert("Morate popuniti sva polja!");
		return false;
	}*/
	if (parseInt(firstClassCapacity_columns) <= 0||parseInt(firstClassCapacity_rows) <= 0||parseInt(buisinesssCapacity_columns) <= 0||parseInt(buisinesssCapacity_rows) <= 0||parseInt(economicCapacity_rows) <= 0 || parseInt(economicCapacity_columns) <= 0 ){
		alert("Morate uneti pozitivan broj veci od nule!");
		return false;
	}
	var startDate_str = startDate + " " + startDate_time;
	var endDate_str = endDate + " " + endDate_time;
	var economicCapacity = economicCapacity_rows + "|" + economicCapacity_columns;
    var buisinesssCapacity = buisinesssCapacity_rows + "|" + buisinesssCapacity_columns;
    var firstClassCapacity = firstClassCapacity_rows + "|" + firstClassCapacity_columns;
	
	alert(startDate_str);
	alert(endDate_str);
	alert(economicCapacity);
	alert(buisinesssCapacity);
	alert(firstClassCapacity);
	
	$.ajax({
		type : 'POST',
		url : "/api/addFlight",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType: 'application/json',
		dataType : 'text',
		data: formToJSON_let(startDestination, endDestination,  economicPrice, businessPrice,firstClassPrice, flightDuration, flightLength, economicCapacity,  buisinesssCapacity, firstClassCapacity,startDate_str,endDate_str),
		//data: formToJSON_let(startDestination, endDestination,  economicPrice, businessPrice,firstClassPrice, flightDuration, flightLength,seats,startDate_str,endDate_str),
		success : function(data){
			$('#main').empty();
        	$('#main').append('<p>Uspesno ste dodali novi let.</p>');
			if (data ==  "uspesno"){
				$('#main').empty();
	        	$('#main').append('<p>Uspesno ste dodali novi let.</p>');
			}
			else{
				alert(data);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR NECE DA MI DODA LET: " + errorThrown);
		}
	});	
	
})

function formToJSON_let(startDestination, endDestination,  economicPrice,businessPrice,firstClassPrice,  flightDuration,flightLength,  economicCapacity,  buisinesssCapacity, firstClassCapacity,startDate_str,endDate_str){
	return JSON.stringify({
		"startDestination" : startDestination,
		"endDestination" : endDestination,
		"economicPrice" : economicPrice,
		"businessPrice" : businessPrice,
		"firstClassPrice" : firstClassPrice,
		"flightDuration" : flightDuration,
		"flightLength" : flightLength,
		"economicCapacity" : economicCapacity,
		"buisinesssCapacity" : buisinesssCapacity,
		"firstClassCapacity" : firstClassCapacity,
		"startDate_str" : startDate_str,
		"endDate_str" : endDate_str
	});
}










function airlineAdminEditToJSON(username, password1, firstName, lastName,
		email) {
	return JSON.stringify({
		"username" : username,
		"password" : password1,
		"firstName" : firstName,
		"lastName" : lastName,
		"email" : email,
		
	})
}



/*PRIKAZ LETOVA*/
function getFlights(){
	$.ajax({
		type : 'GET',
		url : "/api/getFlights",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType: 'json',
		success : prikazFlights,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.bootstrapGrowl("An error occurred while trying to show flights!", {
				  ele: 'body', // which element to append to
				  type: 'danger', // (null, 'info', 'danger', 'success')
				  offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
				  align: 'right', // ('left', 'right', or 'center')
				  width: 'auto', // (integer, or 'auto')
				  delay: 2000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
				  allow_dismiss: false, // If true then will display a cross to close the popup.
				  stackup_spacing: 10 // spacing between consecutively stacked growls.
				});
		}
	});	
}

function prikazFlights(data){
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);

	$.each(list, function(index, flight){
		var tr1 = $('<tr></tr>');
		tr1.append('<td><h2>'+flight.startDestination.name+"-"+flight.endDestination.name+'</h2></td><td></td>');
		var tr2 = $('<tr></tr>');
		var tr3 = $('<tr></tr>');
		tr2.append('<td><p>'+"Departure:"+flight.startDate+'</p></td>'+'<td align="right"><h3>Coordinates: '+flight.coordinates+'</h3></td>');
		tr3.append('<td><p>'+"Arival:"+flight.endDate+'</p></td>'+'<td align="right"><h3>Coordinates: '+flight.coordinates+'</h3></td>');
		var forma2 = $('<tr><td><input type = "button" name="' + flight.id +'" class="editFlight" value="Edit flight"></td><td><input type = "button" name="' + flight.id +'" class="addFastSeatReservation" value="Add fast seat reservation"></td></tr>');
		
		var tr4=$('<tr></tr>');
		tr4.append('<td><hr /></td><td><hr /></td>');
		$('#flightsDisp').append(tr1);
		$('#flightsDisp').append(tr2);
		$('#flightsDisp').append(tr3);
		$('#flightsDisp').append(forma2);
		$('#flightsDisp').append(tr4);
	});
	
}


/*PRIKAZ FAST SEAT RESERVATIONS*/
function getFastSeatReservations(){
	$.ajax({
		type : 'GET',
		url : "/api/getFastSeatReservations",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType: 'json',
		success : prikazFastSeatReservations,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.bootstrapGrowl("An error occurred while trying to show flights!", {
				  ele: 'body', // which element to append to
				  type: 'danger', // (null, 'info', 'danger', 'success')
				  offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
				  align: 'right', // ('left', 'right', or 'center')
				  width: 'auto', // (integer, or 'auto')
				  delay: 2000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
				  allow_dismiss: false, // If true then will display a cross to close the popup.
				  stackup_spacing: 10 // spacing between consecutively stacked growls.
				});
		}
	});	
}

function prikazFastSeatReservations(data){
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);

	$.each(list, function(index, fastSeatReservation){
		var tr1 = $('<tr></tr>');
		tr1.append('<td><h2>'+fastSeatReservation.startDestination+"-"+fastSeatReservation.flight+'</h2></td><td></td>');
		var tr2 = $('<tr></tr>');
		var tr3 = $('<tr></tr>');
		tr2.append('<td><p>'+"Departure:"+fastSeatReservation.startDate+'</p></td>'+'<td align="right"><h3>Coordinates: '+fastSeatReservation.startDate+'</h3></td>');
		tr3.append('<td><p>'+"Arival:"+fastSeatReservation.endDate+'</p></td>'+'<td align="right"><h3>Coordinates: '+fastSeatReservation.startDate+'</h3></td>');
		var forma2 = $('<tr><td><input type = "button" name="' + fastSeatReservation.id +'" class="removeFastSeatReservation" value="Remove Fast Seat Reservation"></td></tr>');
		
		var tr4=$('<tr></tr>');
		tr4.append('<td><hr /></td><td><hr /></td>');
		$('#fastRes').append(tr1);
		$('#fastRes').append(tr2);
		$('#fastRes').append(tr3);
		$('#fastRes').append(forma2);
	
		$('#fastRes').append(tr4);
	});
	
}

/*BRISANJE FAST SEAT RESERVATION*/
$(document).on('click', '.removeFastSeatReservation', function(e){	
	e.preventDefault();
	var id = $(this).attr("name");
	var adresa = "/api/removeFastSeatReservation/" + id;
	
	$.ajax({
		type : 'DELETE',
		url : adresa,
        headers : createAuthorizationTokenHeader(TOKEN_KEY),
        dataType: 'json',
        success: window.location.replace("AirlineAdministrator.html"),
        error : function(XMLHttpRequest, textStatus, errorThrown) {
        	$.bootstrapGrowl("An error occurred while trying to remove fast seat reservations!", {
				  ele: 'body', // which element to append to
				  type: 'danger', // (null, 'info', 'danger', 'success')
				  offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
				  align: 'right', // ('left', 'right', or 'center')
				  width: 'auto', // (integer, or 'auto')
				  delay: 2000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
				  allow_dismiss: false, // If true then will display a cross to close the popup.
				  stackup_spacing: 10 // spacing between consecutively stacked growls.
				});
		}
	});
})







//GENERISANJE BRZE REZERVACIJE SEDISTA OD STRANE AIRLINEADMIN-A
/*$(document).on('click', '#dodajFast_btn', function(e){
	console.log("Kliknuo");
	e.preventDefault();
	alert("USAO JE U PRETRAGU: ");
	var tabela = $('<table></table>');
	tabela.append('<tr><td> Naziv avioprevoznika:</td><td>' +  '<input type = "text" name = "flightCompany" ></td></tr>');
	tabela.append('<tr><td> Pocetna destinacija:</td><td>' +  '<input type = "text" name = "startDestination" ></td></tr>');
	tabela.append('<tr><td> Krajnja destinacija:</td><td>' +  '<input type = "text" name = "endDestination" ></td></tr>');
	
	tabela.append('<tr><td> Datum poletanja:</td><td>' +  '<input type = "date" name = "startDate"> </td></tr>');
	tabela.append('<tr><td> Datum sletanja:</td><td>' +  '<input type = "date" name = "endDate"> </td></tr>');
	tabela.append('<tr><td> Duzina trajanja leta u minutima:</td><td>' +  '<input type = "text" name = "flightDuration" ></td></tr>');
	tabela.append('<tr><td> Duzina leta u kilometrima:</td><td>' +  '<input type = "text" name = "flightLength" ></td></tr>');
	tabela.append('<tr><td> Minimalna cena:</td><td>' +  '<input type = "text" name = "MinPrice" ></td></tr>');
	tabela.append('<tr><td> Maximalna cena:</td><td>' +  '<input type = "text" name = "MaxPrice" ></td></tr>');

	
	tabela.append('<tr><td> Klasa aviona:</td> <td><select name = "klasaAviona">'
			+ '<option>Ekonomska</option>'
			+ '<option>Biznis</option>'
			+ '<option>Prva</option>'
			+'</select></td></tr>');
	
	tabela.append('<tr><td></td><td>' +  '<input type = "submit" value = "Pretrazi" ></td></tr>');
	var forma = $('<form id = "pretragaForma"></form>');
	forma.append(tabela);
	$('#main').empty();
	$('#main').append('<h1>Pretraga</h1>')
	$('#main').append(forma)
	alert("IZSAO JE IZ PRETRAGE: ");
})

$(document).on('submit', '#pretragaForma', function(e){
	e.preventDefault();
	var minBusiness = 0;
	var minEconomic = 0;
	var minFirstClass = 0;
	var maxBusiness = 0;
	var maxEconomic = 0;
	var maxFirstClass = 0;
	
	 
	
	var flightCompany = $(this).find('input[name=flightCompany]').val();
	var startDestination = $(this).find('input[name=startDestination]').val();
	var endDestination = $(this).find('input[name=endDestination]').val();
	
	var startDate = $(this).find('input[name=startDate]').val();
	var endDate = $(this).find('input[name=endDate]').val();
	var flightDuration = $(this).find('input[name=flightDuration]').val();
	var flightLength = $(this).find('input[name=flightLength]').val();
	var MinPrice = $(this).find('input[name=MinPrice]').val();
	var MaxPrice = $(this).find('input[name=MaxPrice]').val();
	
	var klasaAviona = $(this).find("select[name = klasaAviona]").val();
	
	alert(klasaAviona);
	
	
	if (klasaAviona == "Ekonomska") {
		alert("izabrana je ekonomksa klasa");
		minEconomic = MinPrice;
		maxEconomic = MaxPrice;
		
	}
	else if (klasaAviona == "Biznis"){
		alert("izabrana je biznis klasa");
		minBusiness = MinPrice;
		maxBusiness = MaxPrice;
	}else{
		alert("izabrana je Prva klasa");
		minFirstClass = MinPrice;
		maxFirstClass = MaxPrice;
	}
	
	
	$.ajax({
		type : 'POST',
		url : "http://localhost:8080/api/flightSearch",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType: 'application/json',
		dataType: 'json',
		data: formToJSON_pretraga(flightCompany,startDestination,endDestination,startDate,endDate,flightDuration,flightLength,minBusiness,minEconomic,minFirstClass,maxBusiness,maxEconomic,maxFirstClass),
		success : prikazLetova,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
})

*/
/*function prikazLetova(data){
	if (data == null){
		$('#main').empty();
		$('#main').append("Nema pronadjenih letova.");
		return;
	}
	$('#main').empty();
	var filter = $('<table></table>')
	filter.append('<tr><td> Filtriraj po:</td> <td><select name = "filter">'
			+ '<option>Datumu</option>'
			+ '<option>Klasi</option>'
			+ '<option>Broju leta</option>'
			+'</select></td></tr>');
	filter.append('<tr><td>' +  '<input type = "submit" value = "Primeni filter" ></td></tr>');
	var formaZaFilter = $('<form id = "filtriranje"></form>')
	formaZaFilter.append(filter);
	$('#main').append(formaZaFilter);
	$('#main').append('<br><br>')
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	var tabela = $('<table class = "mainTable"></table>')
	var tr_h = $('<tr></tr>');
	
		tr_h.append('<th>Pocetna destinacija</th>');
		tr_h.append('<th>Krajnja destinacija</th>');
		tr_h.append('<th>Cena</th>');
		tr_h.append('<th> Model aviona</th>');
		tr_h.append('<th> Datum Polaska</th>');
		tr_h.append('<th> Datum Dolaska</th>');
		tr_h.append('<th>Klasa Aviona</th>');
		tr_h.append('<th></th>');
	var t_head = $('<thead></thead>');
	t_head.append(tr_h);
	tabela.append(t_head);
	var t_body = $('<tbody></tbody>')
	$.each(list, function(index, let_){
		var tr = $('<tr></tr>');
		
		tr.append('<td>'+ let_.startDestination + '</td>');
		tr.append('<td>'+ let_.endDestination + '</td>');
		tr.append('<td>'+ let_.cenaKarte + '</td>');
		tr.append('<td>'+ let_.modelAviona + '</td>');
		tr.append('<td>'+ let_.startDate_str + '</td>');
		tr.append('<td>'+ let_.endDate_str + '</td>');
		tr.append('<td>'+ let_.klasaAviona + '</td>');
		var forma = $('<form id = "addFastSeatReservation"></form>')
		forma.append('<input type = "hidden" value="' + let_.id +'">');
		forma.append('<input type = "submit" value = "Add fast seat reservation">')
		var td = $('<td></td>');
		td.append(forma);
		tr.append(td);
		t_body.append(tr);
	});
	tabela.append(t_body);
	$('#main').append(tabela);
}

function formToJSON_pretraga(flightCompany,startDestination,endDestination,startDate,endDate,flightDuration,flightLength,minBusiness,minEconomic,minFirstClass,maxBusiness,maxEconomic,maxFirstClass){
	return JSON.stringify({
		"flightCompany" : flightCompany,
		"startDestination" : startDestination,
		"endDestination" : endDestination,
		"startDate" : startDate,
		"endDate" : endDate,
		"flightDuration": flightDuration,
		"flightLength": flightLength,
		
		"minBusiness" : minBusiness,
		"minEconomic" : minEconomic,
		"minFirstClass" : minFirstClass,
		"maxBusiness" : maxBusiness,
		"maxEconomic" : maxEconomic,
		"maxFirstClass" :maxFirstClass
		
	});
}
*/









$(document).on('click', '.addFastSeatReservation', function(e){	
	e.preventDefault();
	var brLeta = $(this).attr("name");
	var adresa = "/api/getFlight/" + brLeta;
	
	
	
	$.ajax({
        type : 'GET',
        url : adresa,
        headers : createAuthorizationTokenHeader(TOKEN_KEY),
        dataType: 'json',
        success: prikazLetaZaRezervaciju,
        error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});
})



var firstSeatLabel = 1;
function prikazLetaZaRezervaciju(data){
	alert("OVO JE ONO STO JE POSLATO IZ BAZE NA FRONT: " + data.id);
	var tabela = $('<table></table>');
	//tabela.append('<tr><td> Broj leta:</td><td>'+ data.brLeta + '</td></tr>');
	
	tabela.append('<tr><td> Pocetna destinacija:</td><td>'+ data.startDestination + '</td></tr>');
	tabela.append('<tr><td> Krajnja destinacija:</td><td>'+ data.endDestination + '</td></tr>');
	/*tabela.append('<tr><td> Cena:</td><td>'+ data.cenaKarte + '</td></tr>');
	tabela.append('<tr><td> Datum:</td><td>'+ data.datumLeta + '</td></tr>');
	tabela.append('<tr><td> Model aviona:</td><td>'+ data.modelAviona + '</td></tr>');
	tabela.append('<tr><td> Klasa aviona:</td><td>'+ data.klasaAviona + '</td></tr>');*/
	tabela.append('<tr><td> Discount:</td><td>' +  '<input type = "text" name = "discount"> </td></tr>');
	
	
	//tabela.append('<tr><td> Maximalna cena:</td><td>' +  '<input type = "text" name = "MaxPrice" ></td></tr>');
	//var economicCapacity_columns = $(this).find("input[name = economicCapacity_columns]").val();
	
	
	
	
	//tabela.append('<tr><td></td><td>' +  '<input type = "submit" value = "Posalji" ></td></tr>');
	//var forma = $('<form id = "posaljiPodatkeZaRezervaciju"></form>');
	//forma.append(tabela);
	var forma = $('<form id = "sedista"></form>')
	forma.append(tabela);
	
	forma.append('<input type = "hidden" value="' + data.id +'">');
	forma.append('<input type = "submit" value = "Prikaz sedista">')
	$('#main').empty();
	$('#main').append('<h1>Rezervacija leta:</h1>')
	$('#main').append(forma)


};

$(document).on('submit', '#sedista', function(e){
	var discount = $(this).find("input[name=discount]").val();
	alert("OVO JE VREDNOST KOJA JE POKUPLJEN SA FROME: " + discount);
	localStorage.setItem("discount", discount);
	e.preventDefault();
	var brLeta = $(this).find('input[type=hidden]').val();
	alert("OVO JE BROJ LETA KOJI HOCEMO DA REZERVISEMO: " + brLeta);
	//var adresa = '../Projekat/rest/letovi/pronadjiLet/' + brLeta;
	localStorage.setItem("flightID", brLeta);
	var adresa = "/api/getSeatsOnFlight/" + brLeta;
	
	
	
	$.ajax({
        type : 'GET',
        url : adresa,
        headers : createAuthorizationTokenHeader(TOKEN_KEY),
        dataType: 'json',
        success: prikazSedistaZaRezervaciju,
        error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});
})



var firstSeatLabel = 1;
function prikazSedistaZaRezervaciju(data){
	
	
	
	
	$('#main').append('<div class="container">'+
			'<h3 id="relacija-leta"></h3>'+
			'<div id="seat-map">'+
				'<div class="front-indicator">Front</div>'+

			'</div>'+
			'<div class="booking-details">'+
				'<h2>Booking Details</h2>'+

				'<h3>'+
					'Selected Seats (<span id="counter">0</span>):'+
				'</h3>'+
				'<ul id="selected-seats"></ul>'+
				
				'Total: <b>$<span id="total">0</span></b>'+

				'<button class="checkout-button">Checkout &raquo;</button>'+
				'<button class=\'next-button\' onclick="$(\'#uzas\').click()">Next &raquo;</button>'+
				'<br><br><br>'+
				'<div id="legend"></div>'+
			'</div>'+
		'</div>');
	 
	
	var firstClassCapacity_rows=data.firstClassCapacity_rows;
	alert("row first: " + firstClassCapacity_rows);
	var firstClassCapacity_columns=data.firstClassCapacity_columns;
	alert("cols first: " + firstClassCapacity_columns);
	
	var economicCapacity_rows=data.economicCapacity_rows;
	alert("row eco: " + economicCapacity_rows);
	var economicCapacity_columns=data.economicCapacity_columns;
	alert("col eco: " + economicCapacity_columns);
	
	var buisinesssCapacity_rows=data.buisinesssCapacity_rows;
	alert("row bus: " + buisinesssCapacity_rows);
	var buisinesssCapacity_columns=data.buisinesssCapacity_columns;
	alert("col bus: " + buisinesssCapacity_columns);
	
	
	
	 var lista=[];
	 for(var i=1; i<=firstClassCapacity_rows; i++){
		var red='';
		for(var j=1; j<=firstClassCapacity_columns; j++){
			red+='f';
		}
		lista.push(red);
	 }
	 for(var i=1; i<=economicCapacity_rows; i++){
		var red='';
		for(var j=1; j<=economicCapacity_columns; j++){
			red+='e';
		}
		lista.push(red);
	 }
	 for(var i=1; i<=buisinesssCapacity_rows; i++){
		var red='';
		for(var j=1; j<=buisinesssCapacity_columns; j++){
			red+='b';
		}
		lista.push(red);
	 }
	 console.log(lista)
	 var $cart = $('#selected-seats'),
     $counter = $('#counter'),
     $total = $('#total'),
     sc = $('#seat-map').seatCharts({
     map: lista,
     seats: {
       f: {
         price   : data.firstClassPrice,
         classes : 'first-class', //your custom CSS class
         category: 'First Class'
       },
       e: {
         price   : data.economicPrice,
         classes : 'economy-class', //your custom CSS class
         category: 'Economy Class'
       },
       
       b: {
			price:data.businessPrice,
			classes:'business-class',
			category:'Business Class'
		}
     
     },
     naming : {
       top : false,
       getLabel : function (character, row, column) {
         return firstSeatLabel++;
       },
     },
     legend : {
       node : $('#legend'),
         items : [
         [ 'f', 'available',   'First Class' ],
         [ 'e', 'available',   'Economy Class'],
         [ 'b', 'available',   'Business Class'],
         [ 'f', 'unavailable', 'Already Booked']
         ]         
     },
     click: function () {
       if (this.status() == 'available') {
         //let's create a new <li> which we'll add to the cart items
         $('<li>'+this.data().category+' Seat # '+this.settings.label+': <b>$'+this.data().price+'</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>')
           .attr('id', 'cart-item-'+this.settings.id)
           .data('seatId', this.settings.id)
           .appendTo($cart);
         alert('duzina: '+$('#selected-seats li').length);
         alert('labela:'+this.settings.label)
         //punim array lab sa labelama
         lab.push(this.settings.label);
         /*
          * Lets up<a href="https://www.jqueryscript.net/time-clock/">date</a> the counter and total
          *
          * .find function will not find the current seat, because it will change its stauts only after return
          * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
          */
         $counter.text(sc.find('selected').length+1);
         $total.text(recalculateTotal(sc)+this.data().price);
         
         return 'selected';
       } else if (this.status() == 'selected') {
         //update the counter
         $counter.text(sc.find('selected').length-1);
         //and total
         $total.text(recalculateTotal(sc)-this.data().price);
       
         //remove the item from our cart
         $('#cart-item-'+this.settings.id).remove();
       
         //seat has been vacated
         
         //ukoliko je odustao od rezervacije sedista moram iz lab da izbacim to sediste(lab)
         var indeks = lab.indexOf(this.settings.label);
         if (indeks > -1) {
             lab.splice(indeks, 1);
         }
         return 'available';
       } else if (this.status() == 'unavailable') {
         //seat has been already booked
         return 'unavailable';
       } else {
         return this.style();
       }
     }
   });

   //this will handle "[cancel]" link clicks
   $('#selected-seats').on('click', '.cancel-cart-item', function () {
     //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
     sc.get($(this).parents('li:first').data('seatId')).click();
     
     
   });

   //let's pretend some seats have already been booked
   //sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');
   
   
	$.each(data.seats, function(index, seat){
		if(seat.taken==true){
			sc.status(seat.seatRow+'_'+seat.seatColumn, 'unvailable');
		}
	})
	

	

};

function recalculateTotal(sc) {
 var total = 0;

 //basically find every selected seat and sum its price
 sc.find('selected').each(function () {
   total += this.data().price;
   
 });
 
 return total;
}

$(document).on('click','.checkout-button',function(e){
	var id = localStorage.getItem("flightID");
	alert("OVO JE BROJ LETA KOJI HOCEMO DA SALJEMO NA SERVER IZ METODE POKUPI SEDISTA: " + id);
	var id = localStorage.getItem("flightID");
	alert("OVO JE BROJ LETA KOJI HOCEMO DA SALJEMO NA SERVER: " + id);
	var discount = localStorage.getItem("discount");
	alert("OVO JE POPUST KOJI HOCEMO DA SALJEMO NA SERVER: " + discount);
	if(lab.length==0){
		$.bootstrapGrowl("You must select at least one seat!", {
			  ele: 'body', // which element to append to
			  type: 'danger', // (null, 'info', 'danger', 'success')
			  offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
			  align: 'right', // ('left', 'right', or 'center')
			  width: 'auto', // (integer, or 'auto')
			  delay: 2000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
			  allow_dismiss: false, // If true then will display a cross to close the popup.
			  stackup_spacing: 10 // spacing between consecutively stacked growls.
			});
		
	}
		
	var total=parseInt($('#total').text(), 10)
	console.log('total: '+total);
	
	
	
	

	$.ajax({
		type:'POST',
		url:"/api/addFastSeatReservation",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data:seatReservationToJSON(id, lab, total),
		success:function(data){
			$.bootstrapGrowl("Fast reservation has been successfully created!", {
				  ele: 'body', // which element to append to
				  type: 'success', // (null, 'info', 'danger', 'success')
				  offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
				  align: 'right', // ('left', 'right', or 'center')
				  width: 'auto', // (integer, or 'auto')
				  delay: 3000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
				  allow_dismiss: false, // If false then will display a cross to close the popup.
				  stackup_spacing: 10 // spacing between consecutively stacked growls.
				});
			
		}
	});
});

function seatReservationToJSON(flight_id, seats, discount){
	return JSON.stringify({
		"seats":seats,
		"flight_id":flight_id,
		"discount":discount,
	});
}





/*$(document).on('click','.addFastSeatReservation',function(e){

	var id = localStorage.getItem("flightID");
	alert("OVO JE BROJ LETA KOJI HOCEMO DA SALJEMO NA SERVER IZ METODE POKUPI SEDISTA: " + id);
	var id = localStorage.getItem("flightID");
	alert("OVO JE BROJ LETA KOJI HOCEMO DA SALJEMO NA SERVER: " + id);
	var discount = localStorage.getItem("discount");
	alert("OVO JE POPUST KOJI HOCEMO DA SALJEMO NA SERVER: " + discount);
	if(lab.length==0){
		$.bootstrapGrowl("You must select at least one seat!", {
			  ele: 'body', // which element to append to
			  type: 'danger', // (null, 'info', 'danger', 'success')
			  offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
			  align: 'right', // ('left', 'right', or 'center')
			  width: 'auto', // (integer, or 'auto')
			  delay: 2000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
			  allow_dismiss: false, // If true then will display a cross to close the popup.
			  stackup_spacing: 10 // spacing between consecutively stacked growls.
			});
		
	}
		
	var total=parseInt($('#total').text(), 10)
	console.log('total: '+total);
	
	
	
	

	$.ajax({
		type:'POST',
		url:"http://localhost:8080/api/addFastSeatReservation",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data:seatReservationToJSON(id, lab, total),
		success:function(data){
			$.bootstrapGrowl("Fast reservation has been successfully created!", {
				  ele: 'body', // which element to append to
				  type: 'success', // (null, 'info', 'danger', 'success')
				  offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
				  align: 'right', // ('left', 'right', or 'center')
				  width: 'auto', // (integer, or 'auto')
				  delay: 3000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
				  allow_dismiss: false, // If false then will display a cross to close the popup.
				  stackup_spacing: 10 // spacing between consecutively stacked growls.
				});
			window.location.replace("cart.html");
		}
	});
});
*/










