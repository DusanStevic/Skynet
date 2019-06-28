/**
 * 
 */
var TOKEN_KEY = 'jwtToken';
//array labela koje se salju na server
var lab=[];

$(document).ready(function(e){
	if (window.location.href.match('RegisteredUser.html') != null) {
		generateWelcomePage();
	}
	else{
		generateMenu();
	}
})

/*LOGOUT REGISTERED USERA*/
$(document).on('click', '#logout', function(e) {
	e.preventDefault();
	removeJwtToken(TOKEN_KEY);
	localStorage.clear();
	window.location.replace("index.html");
})

/*PRIKAZ PROFILA REGISTERED USERA*/
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


function viewUserProfile(user){
	
	
		$('#main').empty();
		//$('#main').append('<img src = "'+ korisnik.slika + '" width= "409px" height= "318">');
		$('#main').append('<h1>' +"View user profile"+ '</h1>' );
		var tabela1 = $('<table></table>');
		tabela1.append('<tr><td> Name:</td><td>' +  user.name +'</td></tr>');
		tabela1.append('<tr><td> Surname:</td><td>' +  user.surname +'</td></tr>');
		tabela1.append('<tr><td> Username:</td><td>' +  user.username +'</td></tr>');
		tabela1.append('<tr><td> Email:</td><td>' +  user.email +'</td></tr>');
		
		$('#main').append(tabela1);
	
}

/*UPDATE PROFILA REGISTERED USERA*/
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
	var tabela = $('<table></table>');
	tabela.append('<tr><td> Ime:</td><td>' +  '<input type = "text" name = "name" value = "'+ data.name + '"</td></tr>');
	tabela.append('<tr><td> Prezime:</td><td>' +  '<input type = "text" name = "surname" value = "'+ data.surname + '"></td></tr>');
	
	//tabela.append('<tr><td> Korisnicko ime:</td><td>' +  '<input type = "text" name = "username" value = "'+ data.username + '"></td></tr>');
	tabela.append('<tr><td> Lozinka:</td><td>' +  '<input type = "password" name = "password" value = "'+ data.password + '"></td></tr>');
	
	tabela.append('<tr><td> Email:</td><td>' +  '<input type = "text" name = "email" value = "'+ data.email + '"></td></tr>');
	//tabela.append( '<tr><td> Nova slika:</td>' + '<td><input type="file" name = "slika" id = "slika" accept="image/*"> </td></tr>');
	tabela.append('<tr><td></td><td>' +  '<input type = "submit" value = "Posalji izmene" ></td></tr>');
	var forma = $('<form class = "posaljiIzmeneZaProfil"></form>');
	//forma.append('<input type = "hidden" value="' + data.id +'">');
	forma.append(tabela);
	$('#main').empty();
	//$('#main').append('<img src = "'+ data.slika + '" width= "411px" height= "321">');
	$('#main').append('<h1>Izmena profila</h1>')
	$('#main').append(forma)
	
	
	
	
	
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
				$('#main').empty();
	        	$('#main').append('<p>Uspesno ste izmenili podatke.</p>');
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


/*PRETRAGA LETOVA*/
$(document).on('click', '#pretraga_btn', function(e){
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
		url : "/api/flightSearch",
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


function prikazLetova(data){
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
		var forma = $('<form id = "rezervacija"></form>')
		forma.append('<input type = "hidden" value="' + let_.id +'">');
		forma.append('<input type = "submit" value = "Rezervisi">')
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

/*DODAVANJE FRIENDSA*/
$(document).on('click', '#addFriends_button', function(e){
	console.log("ULETEO SAM U DODAVANJE PRIJATELJA");
	e.preventDefault();
	var tabela = $('<table></table>');
	tabela.append('<tr><td> First name:</td><td>' +  '<input type = "text" name = "firstName" ></td></tr>');
	tabela.append('<tr><td> Last name:</td><td>' +  '<input type = "text" name = "lastName" ></td></tr>');
	
	
	
	tabela.append('<tr><td></td><td>' +  '<input type = "submit" value = "Posalji" ></td></tr>');
	var forma = $('<form id = "addFriendsForm" enctype="multipart/form-data"></form>');
	forma.append(tabela);
	$('#main').empty();
	$('#main').append('<h1>Dodavanje prijatelja </h1>')
	$('#main').append(forma)
})

$(document).on('submit', '#addFriendsForm', function(e){
	e.preventDefault();
	var firstName = $(this).find("input[name = firstName]").val();
	var lastName = $(this).find("input[name = lastName]").val();
	
	
	
	
	if (firstName == "" || lastName == ""  ){
		alert("Morate popuniti sva polja!");
		return false;
	}
	$.ajax({
		type : 'POST',
		url : "/api/potentialFriends",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType: 'application/json',
		dataType : 'json',
		data: addFriendsForm2JSON(firstName, lastName),
		success : prikazRegisteredUsers,
		
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("ULETEO SAM U AJAX ERROR: " + errorThrown);
		}
	});	
	
})

function addFriendsForm2JSON(firstName, lastName){
	return JSON.stringify({
		"firstName" : firstName,
		"lastName" : lastName
	});
}

function prikazRegisteredUsers(data){
	
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	var tabela = $('<table class = "mainTable"></table>')
	/*zagalvlje tabele*/
	var tr_h = $('<tr></tr>');
		
		tr_h.append('<th>First Name</th>');
		tr_h.append('<th>Last Name</th>');
		tr_h.append('<th>Status</th>');
		tr_h.append('<th></th>');
	
	var t_head = $('<thead></thead>');
	t_head.append(tr_h);
	tabela.append(t_head);
	/*telo tabele*/
	var t_body = $('<tbody></tbody>')
	$.each(list, function(index, destinacija){
		var tr = $('<tr></tr>');
		tr.append('<td>'+ destinacija.user.name + '</td>');
		tr.append('<td>'+ destinacija.user.surname + '</td>');
		tr.append('<td>'+ destinacija.status + '</td>');
		
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
		var forma2 = $('<form class = "addFriend"></form>')
		forma2.append('<input type = "hidden" value="' + destinacija.user.id +'">');
		forma2.append('<input type = "submit" value = "Add Friend">')
		//var td = $('<td></td>');
		var td2 = $('<td></td>');
		//td.append(forma);
		td2.append(forma2);
		//tr.append(td);
		tr.append(td2);
		t_body.append(tr);
	});
	tabela.append(t_body);
	$('#main').empty();
	$('#main').append(tabela);
}






$(document).on('submit', '.addFriend', function(e){	
	e.preventDefault();
	var id = $(this).find('input[type=hidden]').val(); 
	//var adresa = '../Projekat/rest/admini/pronadjiDestinaciju/' + nazivDest;
	var adresa = "/api/addFriend/" + id;
	
	$.ajax({
		type : 'POST',
		url : adresa,
        headers : createAuthorizationTokenHeader(TOKEN_KEY),
        dataType: 'json',
        //success: prikazDestinacijeZaIzmenu,
        success : function(data) {
        	
        	$.bootstrapGrowl("Friend request has been successfully sent!", {
				  ele: 'body', // which element to append to
				  type: 'success', // (null, 'info', 'danger', 'success')
				  offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
				  align: 'right', // ('left', 'right', or 'center')
				  width: 'auto', // (integer, or 'auto')
				  delay: 3000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
				  allow_dismiss: false, // If false then will display a cross to close the popup.
				  stackup_spacing: 10 // spacing between consecutively stacked growls.
				});
			
			//$("button[name='" + name + "']").attr('disabled', 'disabled');
			//$("button[name='" + name + "']").text('Request sent');
		},
        error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.bootstrapGrowl("An error occurred while trying to add friend!", {
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

/*VIEW FRIEND REQUESTS*/
$(document).on('click', '#viewFriendRequests_button', function(e){
	e.preventDefault();
	$.ajax({
		type : 'GET',
		url : "/api/getMyRequests",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType: 'json',
		success : prikazPodatakaFriendsRequests,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.bootstrapGrowl("An error occurred while trying to view friend requests!", {
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

function prikazPodatakaFriendsRequests(data){
	
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	var tabela = $('<table class = "mainTable"></table>')
	/*zagalvlje tabele*/
	var tr_h = $('<tr></tr>');
		
		tr_h.append('<th>First Name</th>');
		tr_h.append('<th>Last Name</th>');
		tr_h.append('<th>Status</th>');
		tr_h.append('<th></th>');
	
	var t_head = $('<thead></thead>');
	t_head.append(tr_h);
	tabela.append(t_head);
	/*telo tabele*/
	var t_body = $('<tbody></tbody>')
	$.each(list, function(index, friendRequest){
		var tr = $('<tr></tr>');
		tr.append('<td>'+ friendRequest.sent.name + '</td>');
		tr.append('<td>'+ friendRequest.sent.surname + '</td>');
		//tr.append('<td>'+ destinacija.status + '</td>');
		
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
		
		
		
		var forma2 = $('<form class = "accept"></form>')
		forma2.append('<input type = "hidden" value="' + friendRequest.sent.id +'">');
		forma2.append('<input type = "submit" value = "Accept">')
		
		var forma3 = $('<form class = "reject"></form>')
		forma3.append('<input type = "hidden" value="' + friendRequest.sent.id +'">');
		forma3.append('<input type = "submit" value = "Reject">')
		
		
		
		//var td = $('<td></td>');
		var td2 = $('<td></td>');
		var td3 = $('<td></td>');
		//td.append(forma);
		td2.append(forma2);
		td3.append(forma3);
		//tr.append(td);
		tr.append(td2);
		tr.append(td3);
		t_body.append(tr);
	});
	tabela.append(t_body);
	$('#main').empty();
	$('#main').append(tabela);
}






$(document).on('submit', '.accept', function(e){	
	e.preventDefault();
	var id = $(this).find('input[type=hidden]').val(); 
	var adresa = "/api/acceptRequest/" + id;
	
	$.ajax({
		type : 'PUT',
		url : adresa,
        headers : createAuthorizationTokenHeader(TOKEN_KEY),
        dataType: 'json',
        //success: prikazDestinacijeZaIzmenu,
        success : function(data) {
			$.bootstrapGrowl("Friend request has been successfully accepted!", {
				  ele: 'body', // which element to append to
				  type: 'success', // (null, 'info', 'danger', 'success')
				  offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
				  align: 'right', // ('left', 'right', or 'center')
				  width: 'auto', // (integer, or 'auto')
				  delay: 3000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
				  allow_dismiss: false, // If false then will display a cross to close the popup.
				  stackup_spacing: 10 // spacing between consecutively stacked growls.
				});
			//$("button[name='" + name + "']").attr('disabled', 'disabled');
			//$("button[name='" + name + "']").text('Request sent');
		},
        error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.bootstrapGrowl("An error occurred while trying to accept friend request!", {
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


$(document).on('submit', '.reject', function(e){	
	e.preventDefault();
	var id = $(this).find('input[type=hidden]').val(); 
	//var adresa = '../Projekat/rest/admini/pronadjiDestinaciju/' + nazivDest;
	var adresa = "/api/rejectRequest/" + id;
	
	$.ajax({
		type : 'DELETE',
		url : adresa,
        headers : createAuthorizationTokenHeader(TOKEN_KEY),
        dataType: 'json',
        success : function(data) {
			$.bootstrapGrowl("Friend request has been successfully rejected!", {
				  ele: 'body', // which element to append to
				  type: 'success', // (null, 'info', 'danger', 'success')
				  offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
				  align: 'right', // ('left', 'right', or 'center')
				  width: 'auto', // (integer, or 'auto')
				  delay: 3000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
				  allow_dismiss: false, // If false then will display a cross to close the popup.
				  stackup_spacing: 10 // spacing between consecutively stacked growls.
				});
			//$("button[name='" + name + "']").attr('disabled', 'disabled');
			//$("button[name='" + name + "']").text('Request sent');
		},
        error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.bootstrapGrowl("An error occurred while trying to reject friend request!", {
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







/*VIEW FRIENDS*/
$(document).on('click', '#viewFriends_button', function(e){
	e.preventDefault();
	$.ajax({
		type : 'GET',
		url : "/api/getMyFriends",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType: 'json',
		success : prikazPodatakaFriends,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.bootstrapGrowl("An error occurred while trying to view friends list!", {
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

function prikazPodatakaFriends(data){
	
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	var tabela = $('<table class = "mainTable"></table>')
	/*zagalvlje tabele*/
	var tr_h = $('<tr></tr>');
		
		tr_h.append('<th>First Name</th>');
		tr_h.append('<th>Last Name</th>');
		tr_h.append('<th>Status</th>');
		tr_h.append('<th></th>');
	
	var t_head = $('<thead></thead>');
	t_head.append(tr_h);
	tabela.append(t_head);
	/*telo tabele*/
	var t_body = $('<tbody></tbody>')
	$.each(list, function(index, friend){
		var tr = $('<tr></tr>');
		tr.append('<td>'+ friend.name + '</td>');
		tr.append('<td>'+ friend.surname + '</td>');
		//tr.append('<td>'+ destinacija.status + '</td>');
		
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
		var forma2 = $('<form class = "remove"></form>')
		forma2.append('<input type = "hidden" value="' + friend.id +'">');
		forma2.append('<input type = "submit" value = "Remove">')
		//var td = $('<td></td>');
		var td2 = $('<td></td>');
		//td.append(forma);
		td2.append(forma2);
		//tr.append(td);
		tr.append(td2);
		t_body.append(tr);
	});
	tabela.append(t_body);
	$('#main').empty();
	$('#main').append(tabela);
}






$(document).on('submit', '.remove', function(e){	
	e.preventDefault();
	var id = $(this).find('input[type=hidden]').val(); 
	var adresa = "/api/removeFriend/" + id;
	
	$.ajax({
		type : 'DELETE',
		url : adresa,
        headers : createAuthorizationTokenHeader(TOKEN_KEY),
        dataType: 'json',
        //success: prikazDestinacijeZaIzmenu,
        success : function(data) {
			$.bootstrapGrowl("Friend has been successfully removed!", {
				  ele: 'body', // which element to append to
				  type: 'success', // (null, 'info', 'danger', 'success')
				  offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
				  align: 'right', // ('left', 'right', or 'center')
				  width: 'auto', // (integer, or 'auto')
				  delay: 3000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
				  allow_dismiss: false, // If false then will display a cross to close the popup.
				  stackup_spacing: 10 // spacing between consecutively stacked growls.
				});
			//$("button[name='" + name + "']").attr('disabled', 'disabled');
			//$("button[name='" + name + "']").text('Request sent');
		},
        error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.bootstrapGrowl("An error occurred while trying to remove friends!", {
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



/*DODAVANJE NOVE REZERVACIJE*/

/*$(document).on('submit', '#filtriranje', function(e){
	e.preventDefault();
	var filter = $(this).find('select[name=filter]').val();
	var adresa = '../Projekat/rest/letovi/filtriranje/' + filter;
	alert(filter);
	$.ajax({
		type : 'GET',
		url : adresa,
		dataType: 'json',
		success : prikazLetova,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
})*/


$(document).on('submit', '#rezervacija', function(e){	
	e.preventDefault();
	var brLeta = $(this).find('input[type=hidden]').val();
	alert("OVO JE BROJ LETA KOJI HOCEMO DA REZERVISEMO: " + brLeta);
	//var adresa = '../Projekat/rest/letovi/pronadjiLet/' + brLeta;
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
	tabela.append('<tr><td> Broj putnika:</td><td>' +  '<input type = "number" name = "brPutnika"> </td></tr>');
	tabela.append('<tr><td> Klasa leta:</td> <td><select name = "klasa">'
			+ '<option>Prva</option>'
			+ '<option>Biznis</option>'
			+ '<option>Ekonomska</option>'
			+'</select></td></tr>');
	
	
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
	var id = localStorage.getItem("flightID");
	alert("OVO JE BROJ LETA KOJI HOCEMO DA SALJEMO NA SERVER: " + id);
	
	
	
	
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

				'<button class="checkout-button"'+
					'onclick="pokupiRezervisanaSedista()">Checkout &raquo;</button>'+
				'<button class=\'next-button\' onclick="$(\'#hotels-tab\').click()">Next &raquo;</button>'+
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

function pokupiRezervisanaSedista(){
	var id = localStorage.getItem("flightID");
	alert("OVO JE BROJ LETA KOJI HOCEMO DA SALJEMO NA SERVER IZ METODE POKUPI SEDISTA: " + id);
	var lista_sedista=$('#selected-seats li');
	if(lista_sedista.length==0){
		console.log("nece moci");
		notify("Could not proceed reservation. You should reserve at least one seat!", 'info');
		return;
	}
	
	
	

	
	
	var total=parseInt($('#total').text(), 10)
	console.log('total: '+total);
	
	
	
	

	$.ajax({
		type:'POST',
		url:'api/seatReservation',
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data:seatReservationToJSON(id, lab, total),
		success:function(data){
			localStorage.setItem("reservation", data.id);
			$.bootstrapGrowl("uspesno !!", {
				  ele: 'body', // which element to append to
				  type: 'success', // (null, 'info', 'danger', 'success')
				  offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
				  align: 'right', // ('left', 'right', or 'center')
				  width: 'auto', // (integer, or 'auto')
				  delay: 3000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
				  allow_dismiss: false, // If true then will display a cross to close the popup.
				  stackup_spacing: 10 // spacing between consecutively stacked growls.
				});
			window.location.replace("cart.html");
		}
	});
	
	
	
	
	
}

function seatReservationToJSON(flight_id, seats, total){
	return JSON.stringify({
		"seats":seats,
		"flight_id":flight_id,
		"total":total,
	});
}

	






/*$(document).on('submit','#posaljiPodatkeZaRezervaciju', function(e){
	e.preventDefault();
	var brPutnika = $(this).find("input[name=brPutnika]").val();
	var klasa = $(this).find("select[name=klasa]").val();
	if (brPutnika == "" || klasa == ""){
		alert("Morate popuniti sva polja!");
		return false;
	}
	if (parseInt(brPutnika) <= 0 ){
		alert("Morate uneti pozitivan broj veci od nule!");
		return false;
	}
	$.ajax({
		type : 'POST',
		url : '../Projekat/rest/letovi/rezervacija',
		contentType: 'application/json',
		dataType : 'text',
		data: formToJSON_rez(brPutnika, klasa),
		success : function(data){
			if (data == "uspesno"){
				$('#main').empty();
	        	$('#main').append('<p>Uspesno ste rezervisali let.</p>');
			}
			else
			{
				alert(data)
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});		
});



function formToJSON_pretraga(pocetna,krajnja,datum,drzava){
	return JSON.stringify({
		"pocetnaDest" : pocetna,
		"krajnjaDest" : krajnja,
		"datumLeta" : datum,
		"drzava": drzava
	});
}

function formToJSON_rez(brPutnika, klasa) {
	return JSON.stringify({
		"brPutnika" : brPutnika,
		"klasa" : klasa.toUpperCase()
	});
}*/



/*PRIKAZ REZERVACIJA REGISTERED USERA*/
/*$(document).on('click', '#mojeRezervacije_btn', function(e){
	e.preventDefault();
	$.ajax({
		type : 'GET',
		url : '../Projekat/rest/korisnici/korisnikoveRezervacije',
		dataType: 'json',
		success : prikazRezervacija,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
})

function prikazRezervacija(data){
	if (data == null){
		$('#main').empty();
		$('#main').append('Vas nalog je blokiran');
	}
	else{
		$('#main').empty();
		$('#main').append('<h1>Vase rezervacije: <h1>');
		var tabela = $('<table class = "mainTable" border = "1"></table>')
		var tr_h = $('<tr></tr>');
			tr_h.append('<th>Broj rezervacije</th>');
			tr_h.append('<th>Datum rezervacije</th>');
			tr_h.append('<th>Klasa</th>');
			tr_h.append('<th>Broj putnika</th>');
			tr_h.append('<th>Pocetna destinacija:</th>');
			tr_h.append('<th>Krajnja destinacija:</th>');
			tr_h.append('<th>Datum leta:</th>');
			tr_h.append('<th></th>');
		tabela.append(tr_h);
		var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
		$.each(list, function(index, rezervacija){
			var tr = $('<tr></tr>');
			tr.append('<td>'+ rezervacija.brRezervacije + '</td>');
			tr.append('<td>'+ rezervacija.datumIvreme + '</td>');
			tr.append('<td>'+ rezervacija.klasa + '</td>');
			tr.append('<td>'+ rezervacija.brPutnika + '</td>');
			tr.append('<td>'+ rezervacija.pocetnaDest + '</td>');
			tr.append('<td>'+ rezervacija.krajnjaDest + '</td>');
			tr.append('<td>'+ rezervacija.datumLeta + '</td>');
			var forma = $('<form class = "otkazivanjeRezervacije"></form>')
			forma.append('<input type = "hidden" value="' + rezervacija.brRezervacije +'">');
			forma.append('<input type = "submit" value = "Otkazi">')
			var td = $('<td></td>');
			td.append(forma);
			tr.append(td);
			tabela.append(tr);
		});
		$('#main').append(tabela);
	}
}*/

/*BRISANJE REZERVACIJA REGISTERED USERA*/
/*$(document).on('submit', '.otkazivanjeRezervacije', function(e){
	e.preventDefault();
	var brRez = $(this).find('input[type=hidden]').val();
	var adresa = '../Projekat/rest/letovi/otkaziRezervaciju/' + brRez;
	$.ajax({
		type : 'GET',
		url : adresa,
        dataType: 'text',
        success: function(data){
        	if (data == 'uspesno'){
        		$('#main').empty();
            	$('#main').append('<p>Uspesno ste otkazali rezervaciju.</p>');
        	}
        	else{
        		$('#main').empty();
            	$('#main').append('<p>' + data + '</p>');
        	}
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});
})*/

function generateMenu(){
	$('#menubar').empty();
	$('#menubar').append('<div class="container-fluid">'+
            '<div class="navbar-header">'+
      			'<a class="navbar-brand" href="RegisteredUser.html"><span class="glyphicon glyphicon-plane"></span> SKYNET</a>'+
    		'</div>'+
            '<ul class="nav navbar-nav ">'+
                '<li><a href="RegisteredUser.html"><span class="glyphicon glyphicon-home"></span> Home</a></li>'+
                '<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-user"></span> Profile<span class="caret"></span></a>'+
		        '<ul class="dropdown-menu">'+
		        	'<li><a href = "#" id = "viewUserProfile_button" > View user profile </a></li>'+
		  			'<li><a href = "#" id = "izmenaProfila_btn" > Edit user profile </a></li>'+
		        '</ul>'+
		        '<li> <a href = "#" id = "korisnici_btn" > <span class="glyphicon glyphicon-list-alt"></span> Korisnici</a></li>'+
      			'<li> <a href = "#" id = "pretraga_btn"><span class="glyphicon glyphicon-search"></span> Pretraga</a></li>'+
		        '<li>'+
		      		'<a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-thumbs-up"></span> Friends <span class="caret"></span></a>'+
			        '<ul class="dropdown-menu">'+
			        	'<li><button   onclick="openCity(event, \'listOfFriends\')" id="listOfFri">List of friends</button></li>'+
			            '<li><button   onclick="openCity(event, \'addFriends\')" id="addFrie">Add friends</button></li>'+
			            '<li><button   onclick="openCity(event, \'friendRequests\')" id="friendR">Friend requests</button></li>'+
			        '</ul>'+
		       ' </li>'+
		       ' <li>'+
		      		'<a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-book"></span> Reservations <span class="caret"></span></a>'+
			        '<ul class="dropdown-menu">'+
			        	'<li><a href = "#" id = "mojeRezervacije_btn" > View reservations </a></li>'+
			        	'<!-- <li><a href="sysAdmin-addHotel.html" id="addHotel"> View reservations </a></li> -->'+
			            '<li><a href="sysAdmin-addHotel.html" id="addHotel"> Delete reservations </a></li>'+
			        '</ul>'+
		       ' </li>'+
		     '</ul>'+
		    ' <ul class="nav navbar-nav navbar-right">'+
      			'<li> <a id = "logout" href = ""><span class="glyphicon glyphicon-log-out"></span> Log out</a></li>'+
    		'</ul>'+
        '</div>');
}

function generateWelcomePage(){
	$('#menubar').empty();
	$('#main').append('<div class="blue_middle_container">'+
			'<table class="middle_table">'+
	        '<tr>'+
	            '<td>'+
	                '<table>'+
	                    '<tr><td><h1>Welcome to Skynet!</h1></td></tr>'+
	                    '<tr><td><p>To start the search on our site, choose whether you want to search information about airline companies, hotels or rent-a-car services registered on our site.</p></td></tr>'+
	                    '<tr><td><p>You can now book flights, hotel rooms and vehicles, as well as to access our full offer, just start yout search!.</p></td></tr>'+
	                '</table>'+
	            '</td>'+
	        '</tr>'+
	        '<tr>'+
	            '<td>'+
	                '<table class="middle_table">'+
	                    '<tr>'+
	                        '<td><div class="hover_image"><a href="search.html" id="airlineSearch"><img src="images/plane.png" class="hover_image" /></a></div></td>'+
	                        '<td><div class="hover_image"><a href="search.html" id="hotelSearch"><img src="images/hotel.png" class="hover_image" /></a></div></td>'+
	                        '<td><div class="hover_image"><a href="search1.html" id="racSearch"><img src="images/rac.png" class="hover_image" /></a></div></td>'+
	                    '</tr>'+
	                    '<tr>'+
	                        '<td class="central"><h4><b>Airline</b></h4></td>'+
	                        '<td class="central"><h4><b>Hotel</b></h4></td>'+
	                        '<td class="central"><h4><b>Rent-A-Car Service</b></h4></td>'+
	                    '</tr>'+
	                '</table>'+
	            '</td>'+
	        '</tr> '+
	    '</table>'+
	'</div>' );
}


