var TOKEN_KEY = 'jwtToken';

$(window).on("load",function(e){
	if (window.location.href.match('rentacaradmin.html') != null) {
		checkFirstTime();
		var tab = localStorage.getItem("tab");
		if(tab == null || tab == undefined || tab == ""){
			document.getElementById("defaultOpen").click();
		}
		else{
			document.getElementById(tab).click();
		}
		getHotel();
	}
	
	else if(window.location.href.match('userProfile.html') != null){
		getHotelAdmin();
	}
})


function getHotelAdmin() {
	var token = getJwtToken(TOKEN_KEY);
	if (token) {
		$.ajax({
			type : 'GET',
			url : "/api/getRegUser",
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			dataType : "json",
			success : function(data) {
				if (data == null) {
					alert('Some error occurred. Please try again later.');
				} else {
					displayAdmin(data);
				}
			},
			error : function() {
				alert('Some error occurred. Please try again later.');
			}
	
		})
	}
}



function getHotel() {
	var token = getJwtToken(TOKEN_KEY);
	if (token) {
		$.ajax({
			type : 'GET',
			url : "/api/myRAC",
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			dataType : "json",
			success : function(data) {
				if (data == null) {
					alert('Error while loading page!');
				} else {
					displayHotel(data);
					
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


function displayAdmin(data){
	$('#userInfo').append('<table class="ombre_table">'+
			'<tr><td><input type="hidden" id="adminID" value="'+data.id+'"/></td></tr>'+
            '<tr><td><h1>Your profile:</h1></td></tr>'+
            '<tr><td><h4>Name:</h4></td><td><h4>'+data.name+'</h4></td></tr>'+
            '<tr><td><h4>Surname:</h4></td><td><h4>'+data.surname+'</h4></td></tr>'+
            '<tr><td><h4>Username:</h4></td><td><h4>'+data.username+'</h4></td></tr>'+
            '<tr><td><h4>Email:</h4></td><td><h4>'+data.email+'</h4></td></tr>'+
            '<tr><td colspan="2"><input type="button" id="editAdminProfile" value="Edit profile"/></td></tr></table>');
	$('#nameEdit').val(data.name);
	$('#surnameEdit').val(data.surname);
	$('#usernameEdit').val(data.username);
	$('#emailEdit').val(data.email);
}


$(document).on('click','#editAdminProfile',function(e){
	var modal = document.getElementById('HAModal');
    var span = document.getElementById("closeAdmin");
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

function displayHotel(data){
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	$.each(list, function(index, hotel){
		localStorage.setItem("hotelid", hotel.id);
		var tr1=$('<tr></tr>');
		tr1.append('<td><h2>' + hotel.name + '</h2></td>');
		tr1.append('<td><div class="edit_input"><input type="button" value="Edit info" id="edit" /></div></td><td></td>');
		var tr2=$('<tr></tr>');
		tr2.append('<td><h4>'+ hotel.address +'</h4></td>');
		var tr3=$('<tr></tr>');
		tr3.append('<td colspan="2"><div class="middle_container"><p>'+ hotel.description +'</p></div></td>');
		var tr4=$('<tr></tr>');
		tr4.append('<td><div><img src='+ hotel.image + ' class="image" /></div></td>');
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
		$('#hotelInfo').append(tr1);
		$('#hotelInfo').append(tr2);
		$('#hotelInfo').append(tr3);
		$('#hotelInfo').append(tr4);
		$('#hotelInfo').append(tr5);
		
	})
}



$(document).on('click','#uploadImage',function(e){
    var modal = document.getElementById('modal3');
	var span = document.getElementsByClassName("close")[0];
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



$(document).on('click','#edit',function(e){
	var token = getJwtToken(TOKEN_KEY);
    $.ajax({
		type:'GET',
		url:'/api/myRAC',
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType:'json',
		success:function(data){
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
            $.each(list, function(index, hotel){
            	$('#hotelName').val(hotel.name);
            	$('#hotelAdress').val(hotel.address);
            	$('#hotelDesc').val(hotel.description);
            })
		}
	})
	var modal = document.getElementById('modal');
	var span = document.getElementsByClassName("close")[0];
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

$(document).on('submit','#editHotelForm',function(){
	var token = getJwtToken(TOKEN_KEY);
	var name = $('#hotelName').val();
	var adress = $('#hotelAdress').val();
	var desc = $('#hotelDesc').val();
	var image = $('#hotelImg').val();
	if(name == "" || adress == "" || desc == ""){
		alert("All fields must be filled!");
	}
	$.ajax({
		type:'PUT',
		url:'/api/saveRAC',
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data:inputToCompany(name, adress, desc, image),
		success:function(data){
			alert("Rent-a-car info successfully edited!");
			location.reload();
		}
	})
})

$(document).on('submit', "#uploadImageForm", function(event){
	 event.preventDefault();
	 var formElement = this;
	 var formData = new FormData(formElement);
	 uploadImage(formElement, formData, "/api/editImage");
	 event.preventDefault();
})



$(document).on('click', "#logout", function (e) {
	removeJwtToken(TOKEN_KEY);
	localStorage.clear();
	window.location.replace("index.html");
});



function hotelToJSON(name, adress, desc, image){
	return JSON.stringify({
		"name":name,
		"address":adress,
		"description":desc,
		"image": image,
	})
}

function inputToCompany(name, adress, desc, image){
	return JSON.stringify({
		"name":name,
		"adress":adress,
		"description":desc,
		"image": image,
	})
}


function inputToUser(email, name, surname, username, password, id){
	return JSON.stringify({
		"adminId":id,
		"firstName":name,
		"lastName":surname,
		"username":username,
		"password":password,
		"email":email,
	})
}

