/**
 * 
 */
var TOKEN_KEY = 'jwtToken';

$(document).ready(function(e){
	checkFirstTime();
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
		url : "http://localhost:8080/api/viewUserProfile",
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
		url : "http://localhost:8080/api/viewUserProfile",
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
	tabela.append('<tr><td> Name:</td></tr>' +  '<tr><td><input type = "text" name = "name" value = "'+ data.name + '"</td></tr>');
	tabela.append('<tr><td> Surname:</td></tr>' +  '<tr><td><input type = "text" name = "surname" value = "'+ data.surname + '"></td></tr>');
	
	//tabela.append('<tr><td> Korisnicko ime:</td><td>' +  '<input type = "text" name = "username" value = "'+ data.username + '"></td></tr>');
	tabela.append('<tr><td> Password:</td></tr>' +  '<tr><td><input type = "password" name = "password" value = "'+ data.password + '"></td></tr>');
	
	tabela.append('<tr><td> Email:</td></tr><tr><td>' +  '<input type = "text" name = "email" value = "'+ data.email + '"></td></tr>');
	//tabela.append( '<tr><td> Nova slika:</td>' + '<td><input type="file" name = "slika" id = "slika" accept="image/*"> </td></tr>');
	tabela.append('<tr><td></td></tr><tr><td>' +  '<input type = "submit" value = "Save" ></td></tr>');
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
		url : 'http://localhost:8080/api/updateUserProfile',
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType: 'application/json',
		data: formToJSON_profilIZ(password,name,surname,  email),
		success : function(data){
			$('#main').empty();
			setJwtToken(TOKEN_KEY, data.accessToken);
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