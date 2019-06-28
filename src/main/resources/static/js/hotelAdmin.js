var TOKEN_KEY = 'jwtToken';

$(window).on("load",function(e){
	if (window.location.href.match('hotelAdmin-hotelProfile.html') != null) {
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
	else if(window.location.href.match('hotelAdmin-changeRoom.html') != null){
		$.ajax({
	        type: 'GET',
	        url: '/api/getRoom/'+localStorage.getItem("roomID"),
	        headers : createAuthorizationTokenHeader(TOKEN_KEY),
	        contentType: 'text/plain',
	        success: function(data){
	            var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	            $.each(list, function(index, room){
	            	$('#editId').val(room.id);
	            	$('#editBeds').val(room.bedNumber);
	            	$('#editPrice').val(room.price);
	            	$('#editRoomDesc').val(room.description);
	            	fillAddRoomOffers(room.roomOffers);
	            })
	        }
	    })
	}
	else if(window.location.href.match('userProfile.html') != null){
		getHotelAdmin();
	}
})

function fillRoomNumbers(){
	var sort = "5";
	var token = getJwtToken(TOKEN_KEY);
	if (token) {
		$.ajax({
			type : 'POST',
			url : "/api/getRooms",
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			dataType : "json",
			data: inputToSort(sort),
			success : function(data) {
				if (data == null) {
					alert('Error while finding loged one!');
				} else {
					var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
					$.each(list, function(index, room){
						var opt=$('<option value="'+room.id+'">'+room.roomNumber+'</option>');
						$('#roomNum').append(opt);
					})
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

function fillHotelOffers(){
	$.ajax({
		type:'GET',
		url:'/api/getHotelOffers',
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		success:function(data){
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
			$.each(list, function(index, offer){
				var tr = $('<tr></tr>');
		        tr.append('<td><input type="checkbox" class="offers" name="offer" value="'+offer.id+'"/><b>' + offer.name + '</b></td>');
		        $('#hotelOffersRes').append(tr);
			});
		}
	});
}

$(document).on('submit','#fastRoomReservation',function(e){
	e.preventDefault();
	var roomid = $("#roomNum :selected").val();
	var disc = $("#discount").val();
	var start = $("#start").val();
	var end = $("#end").val();
	var string_offers = [];
	$("input:checkbox[name=offer]:checked").each(function(){
		string_offers.push($(this).val());
	});
	$.ajax({
		type : 'POST',
		url : "/api/fastRoomReservation",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		data: inputToFast(roomid, disc, start, end, string_offers, null),
		dataType : "json",
		success : function(data) {
			if (data == null) {
				alert('Fast reservation could not be added. There is another fast reservation added for this room in defined time period. Choose another time period or delete fast reservation that is added before.');
			} else {
				alert('Fast reservation successfuly added!');
				 window.location.href = "hotelAdmin-hotelProfile.html";
			}
		},
		error : function() {
			alert('Fast reservation could not be added. There is another fast reservation added for this room in defined time period. Choose another time period or delete fast reservation that is added before.');
		}

	})
	
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
					alert("Informations updated successfuly! Log out to start using application with new data.");
					removeJwtToken(TOKEN_KEY);
					localStorage.clear();
					window.location.replace("index.html");
				} else {
					displayAdmin(data);
				}
			},
			error : function() {
				alert("Informations updated successfuly! Log out to start using application with new data.");
				removeJwtToken(TOKEN_KEY);
				localStorage.clear();
				window.location.replace("index.html");
			}
	
		})
	}
}

function fillAddRoomOffers(selected){
	console.log(selected);
	$.ajax({
		type : 'GET',
		url : "/api/getAllRoomOffers",
		success : function(data) {
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
			$.each(list, function(index, offer){
				var list2 = selected == null ? [] : (selected instanceof Array ? selected : [ selected ]);
				var checked = false;
				$.each(list2, function(index2, check){
					if(check.offer == offer.offer){
						checked = true;
					}
				})
				var tr = $('<tr></tr>');
				if(checked == true){
					tr.append('<td><input type="checkbox" class="offers" value="'+offer.offer+'" name="choice" checked/><b>'+offer.offer+'</b></td>');
				}
				else{
					tr.append('<td><input type="checkbox" class="offers" value="'+offer.offer+'" name="choice"/><b>'+offer.offer+'</b></td>');
				}
				$('#roomOffers').append(tr);
			})
		},
		error : function() {
			alert('Some error occurred. Please try again later.');
		}

	})
}

function getHotel() {
	var token = getJwtToken(TOKEN_KEY);
	if (token) {
		$.ajax({
			type : 'GET',
			url : "/api/getHotel",
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			dataType : "json",
			success : function(data) {
				if (data == null) {
					alert('Error while loading page!');
				} else {
					displayHotel(data);
					printHotelOffers();
					getFastRooms();
					var search;
					var s1 = localStorage.getItem("searchCriteria");
					if(s1 != "" && s1 != null && s1 != undefined){
						search = JSON.parse(localStorage.getItem("searchCriteria"));
					}
					else{
						search = null;
					}
					console.log(search);
					if(search != null && search != undefined && search != ""){
						displayChoosenCriteria(search);
						displayCriteria(search);
					}
					else{
						getRooms();
						displayCriteria(null);
					}
				}
			},
			error : function() {
				alert("Session expiered.");
				removeJwtToken(TOKEN_KEY);
				localStorage.clear();
				window.location.replace("index.html");
			}
	
		})
	}
}

function getFastRooms() {
	var token = getJwtToken(TOKEN_KEY);
	if (token) {
		$.ajax({
			type : 'GET',
			url : "/api/getfastRooms",
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			dataType : "json",
			success : function(data) {
				displayFastRooms(data);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert(jqXHR.status);
				alert(textStatus);
				alert(errorThrown);
			}
	
		})
	}
}

function getRooms() {
	var sort = localStorage.getItem("sort");
	if(sort == undefined || sort == null || sort == ""){
		sort = "1";
		console.log(sort);
	}
	var token = getJwtToken(TOKEN_KEY);
	if (token) {
		$.ajax({
			type : 'POST',
			url : "/api/getRooms",
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			dataType : "json",
			data: inputToSort(sort),
			success : function(data) {
				if (data == null) {
					alert('Error while finding loged one!');
				} else {
					displayRooms(data);
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

function displayFastRooms(rooms){
	if(rooms != null && rooms != undefined){
		var list = rooms == null ? [] : (rooms instanceof Array ? rooms : [ rooms ]);
		$.each(list, function(index, room){
			var tr=$('<tr></tr>');
			tr.append('<td><img src='+room.image+' class="room_display"/></td>');
			tr.append('<td><table><tr><td><input type="button" id="viewFastRes" name="'+room.id+'" value="Display fast reservations for this room" class="blueButton"/></td></tr><tr><td>Original price: '+room.price+'$</td></tr><tr><td>Beds: '+room.bedNumber+'</td></tr><tr><td>Room number: '+room.roomNumber+'</td></tr>'+
			'<tr><td><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></td></tr>'+
			'</table></td>');
			$('#fastRoomsDisp').append(tr);
		})
	}
	else{
		alert("NO FAST ROOMS");
	}
}

$(document).on('click','#viewFastRes',function(e){
	var id=$(this).attr("name");
	var modal = document.getElementById('fastModal');
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
	$.ajax({
		type : 'GET',
		url : "/api/getfastRoomReservations/" + id,
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType : "json",
		success : function(data) {
			displayFastReservations(data);
		},
		error : function(){
			alert("ERROR");
		}
	})
})

function displayFastReservations(data){
	$("#fastInfoShow").empty();
	if(data != null && data != undefined){
		var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
		$.each(list, function(index, res){
			
			var div=$('<div class="blue_box"></div>');
			if(index % 2 == 0){
				div=$('<div class="green_box"></div>');
			}
			
			var d1 = res.startDate.toString().substr(0, 10);
			var d2 = res.endDate.toString().substr(0, 10);

			div.append('<h3><b>Fast reservation from '+d1 + ' to '+ d2 +'</b></h3>');
			var price = res.price;
			
			
			var list2 = res.offers == null ? [] : (res.offers instanceof Array ? res.offers : [ res.offers ]);
			if(res.offers.length > 0){
				div.append('<p><b>Discount: '+ res.discount +'%<br/>New room prce (per night): '+price+'$' + 
				'<br/>Included hotel offers:</b><br/></p>');
				var ul = $('<ul id="foffers'+res.id+'"></ul>');
				$.each(res.offers, function(index2, off){
					ul.append('<li><b>'+off.name+' ('+off.price+'$ per night)</b></li>');
					price = price + off.price;
				})
				div.append(ul);
			}
			else {
				div.append('<b><p>Discount: '+ res.discount +'<br/>New room prce (per night): '+price+'$' + 
				'<br/>No included hotel offers for this fast reservation.</b><br/></p>');
			}
			
			div.append('<p><b>Total price per night: '+price+'$</b></p>');
			div.append('<input type="button" class="redButton" id="deleteFastRes" name="'+res.id+'" value="Delete fast reservation"/>');
			var tr = $('<tr></tr>');
			tr.append(div);
			$("#fastInfoShow").append(tr);
		})
	}
}

$(document).on('click','#deleteFastRes',function(e){
	var id=$(this).attr("name");
	$.ajax({
		type : 'DELETE',
		url : "/api/deleteFastReservation/" + id,
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType : "json",
		success : function(data) {
			if(data != null){
				alert("Fast room reservation removed successfuly!");
				location.reload();
			}
			else{
				alert("Could not remove fast room reservation right now because it is booked by some user.");
			}
		},
		error : function(){
			alert("Could not remove fast room reservation right now because it is booked by some user.");
		}
	})
})

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

$(document).on('submit','#editHAInfo',function(e){
	var name = $('#nameEdit').val();
	var surname = $('#surnameEdit').val();
	var email = $('#emailEdit').val();
	if(name == "" || surname == "" || email == ""){
		alert("All fields must be filled (except password).");
		return;
	}
	var newPass = $('#newPasswordEdit').val();
	$.ajax({
		type : 'PUT',
		url : 'http://localhost:8080/api/updateUserProfile',
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType: 'application/json',
		data: formToJSON_profilIZ(newPass,name,surname,  email),
		success : function(data){
			setJwtToken(TOKEN_KEY, data.accessToken);
			alert("Informations updated successfuly!");
			location.reload();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Informations updated successfuly! Log out to start using application with new data.");
		}
	});	
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

function displayRooms(data){
	if(data != null && data != undefined){
		var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
		$.each(list, function(index, room){
			var tr=$('<tr></tr>');
			tr.append('<td><img src='+room.image+' class="room_display"/></td>');
			tr.append('<td><table><tr><td><h3>Price per night: '+room.price+'$ </h3></td></tr>'+'<tr><td><h4>Beds: '+room.bedNumber+'</h4></td></tr><tr><td>Room number: '+room.roomNumber+'</td></tr>'+
			'<tr><td><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></td></tr>'+
			'<tr><td><a href="#" id="viewRoom" name="'+room.id+'">More details</a></td></tr>'+
			'<tr><td><a href="#" id="deleteRoom" name="'+room.id+'">Delete room</a></td></tr></table></td>');
			$('#roomsDisp').append(tr);
		})
	}
}

function displayCriteria(string_offers){
	var token = getJwtToken(TOKEN_KEY);
	if (token) {
		$.ajax({
			type : 'GET',
			url : "/api/getHotelRoomOffers",
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			dataType : "json",
			success : function(data) {
				var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	            $.each(list, function(index, criteria){
	            	var checked = false;
	            	var list2 = string_offers == null ? [] : (string_offers instanceof Array ? string_offers : [ string_offers ]);
	            	$.each(list2, function(index2, selected){
	            		if(selected == criteria.offer){
	            			checked = true;
	            		}
	            	})
	            	var of1 = $('<tr></tr>');
	            	if(checked == true){
	            		of1.append('<td><input type="checkbox" value="'+criteria.offer+'" class="offers" name="criteria" checked/><b>'+criteria.offer+'</b></td>');
	            	}
	            	else{
	            		of1.append('<td><input type="checkbox" value="'+criteria.offer+'" class="offers" name="criteria"/><b>'+criteria.offer+'</b></td>');
	            	}
					$('#offersCriteria').append(of1);
	            })
	            var sort = $('<tr></tr>');
				sort.append('<td></br><b>Sort by:</b></br> <select id="sortRooms"><option value="1">Price (lowest to highest)</option><option value="2">Price (highest to lowest)</option><option value="3">Rating (highest to lowest)</option></select></td>');
				$('#offersCriteria').append(sort);
	            var search = $('<tr></tr>');
				search.append('<td><div><input type="submit" value="Search"></div></td>');
				$('#offersCriteria').append(search);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert(jqXHR.status);
				alert(textStatus);
				alert(errorThrown);
			}
	
		})
	}
}

$(document).on('submit','#searchRoomsForm',function(e){
	e.preventDefault();
	var token = getJwtToken(TOKEN_KEY);
	var string_offers = [];
	$("input:checkbox[name=criteria]:checked").each(function(){
		string_offers.push($(this).val());
	});
	var sort = $("#sortRooms :selected").val();
	localStorage.setItem("sort", sort);
	if(string_offers.length > 0){
		localStorage.setItem('searchCriteria', JSON.stringify(string_offers));
		displayChoosenCriteria(string_offers);
	}
	else{
		localStorage.setItem('searchCriteria', "");
		$("#roomsDisp").empty();
		getRooms();
	}
})

function displayChoosenCriteria(string_offers){
	var sort = localStorage.getItem("sort");
	if(sort == undefined || sort == null || sort == ""){
		sort = "1";
	}
	$.ajax({
		type:'POST',
		url:'/api/searchForRooms',
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data:inputToOffersSort(string_offers, sort),
		success:function(data){
			$("#roomsDisp").empty();
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
			$.each(list, function(index, room){
				var tr=$('<tr></tr>');
				tr.append('<td><img src='+room.image+' class="room_display"/></td>');
				tr.append('<td><table><tr><td><h3>Price per night: '+room.price+'$ </h3></td></tr>'+'<tr><td><h4>Beds: '+room.bedNumber+'</h4></td></tr><tr><td>Room number: '+room.roomNumber+'</td></tr>'+
				'<tr><td><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></td></tr>'+
				'<tr><td><a href="#" id="viewRoom" name="'+room.id+'">More details</a></td></tr>'+
				'<tr><td><a href="#" id="deleteRoom" name="'+room.id+'">Delete room</a></td></tr></table></td>');
				$('#roomsDisp').append(tr);
			})
		}
	})
}

$(document).on('submit','#updateRoom',function(){
	var token = getJwtToken(TOKEN_KEY);
	var id = $('#editId').val();
	var beds = $('#editBeds').val();
	var price = $('#editPrice').val();
	var desc = $('#editRoomDesc').val();
	var image = "a";
	if(isNaN(beds) || isNaN(price)){
		alert("Number of beds and price must be numbers!");
		return;
	}
	$.ajax({
		type:'POST',
		url:'/api/editRoom',
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data:inputToHotelRoomID(id, image, beds, price, desc, ""),
		success:function(data){
			alert("Room successfully edited!");
			location.reload();
		}
	})
	setRoomOffers();
})

$(document).on('click','#editRoom',function(e){
	var token = getJwtToken(TOKEN_KEY);
    var id=$(this).attr("name");
    localStorage.setItem("roomID", id);
    window.location.href = "hotelAdmin-changeRoom.html";
})

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

$(document).on('click','#deleteRoom',function(e){
    var id=$(this).attr("name");
    $.ajax({
        type: 'DELETE',
        url: '/api/deleteRoom/'+id,
        contentType: 'text/plain',
        success: function(data){
            var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
            location.reload();
            e.preventDefault();
        }
    })
})

$(document).on('click','#viewRoom',function(e){
	var token = getJwtToken(TOKEN_KEY);
	var id=$(this).attr("name");
    $.ajax({
        type: 'GET',
        url: '/api/getRoom/'+id,
        headers : createAuthorizationTokenHeader(TOKEN_KEY),
        contentType: 'text/plain',
        success: function(data){
            var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
            $.each(list, function(index, room){
            	localStorage.setItem("roomID", room.id);
            	localStorage.setItem("image", room.image);
            	localStorage.setItem("beds", room.bedNumber);
            	localStorage.setItem("price", room.price);
            	localStorage.setItem("desc", room.description);
            	localStorage.setItem("isAdmin", "true");
            })
            window.location.href = "roomInfo.html";
        }
    })
})

$(document).on('submit', "#roomImage", function(event){
	 var formElement = this;
	 var field = $("#fileIM").val();
	 if(field != ""){
		 var formData = new FormData(formElement);
		 var id = localStorage.getItem("roomID");
		 uploadImage(formElement, formData, "/api/addRoomImage/"+id);
	 }
	 event.preventDefault();
	 alert("Room successfuly added!");
	 window.location.href = "hotelAdmin-hotelProfile.html";
})

$(document).on('click','#edit',function(e){
	var token = getJwtToken(TOKEN_KEY);
    $.ajax({
		type:'GET',
		url:'/api/getHotel',
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
		url:'/api/editHotel',
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data:inputToCompany(name, adress, desc, image),
		success:function(data){
			alert("Hotel info successfully edited!");
			location.reload();
		}
	})
})

$(document).on('submit', "#uploadImageForm", function(event){
	 event.preventDefault();
	 var formElement = this;
	 var formData = new FormData(formElement);
	 uploadImage(formElement, formData, "/api/editHotelImage");
	 event.preventDefault();
})

$(document).on('click', "#goToDescription", function (e) {
	e.preventDefault();
	var beds = $('#beds').val();
	var price = $('#price').val();
	var number = $('#roomNumber').val();
	if(beds == "" || price == "" || number == ""){
		alert("All fields must be filled!");
		return;
	}
	if(isNaN(beds) || isNaN(price)){
		alert("Number of beds and price must be numbers!");
		return;
	}
	if(beds < 1 || beds > 10){
		alert("Minimal bed numner is 1, maximal is 10.");
		return;
	}
	if(price < 5){
		alert("Minimal price is 5$.");
		return;
	}
	if(price > 40000){
		alert("Maximal price is 40000$.");
		return;
	}
    var page1 = document.getElementById("view1");
    var page2 = document.getElementById("view3");
    page1.style.display = "none";
    page2.style.display = "none";
    var page3 = document.getElementById("view2");
    page3.style.display = "block";
    e.preventDefault();
});

$(document).on('click', "#goToBasic", function (e) {
    var page1 = document.getElementById("view2");
    var page2 = document.getElementById("view3");
    page1.style.display = "none";
    page2.style.display = "none";
    var page3 = document.getElementById("view1");
    page3.style.display = "block";
    e.preventDefault();
});

$(document).on('submit', "#newRoomForm", function(e){
	e.preventDefault();
    var page1 = document.getElementById("view1");
    var page2 = document.getElementById("view2");
    page1.style.display = "none";
    page2.style.display = "none";
    var page3 = document.getElementById("view3");
    page3.style.display = "block";
    e.preventDefault();

	var token = getJwtToken(TOKEN_KEY);
	var image = "images/room.png";
	var beds = $('#beds').val();
	var price = $('#price').val();
	var number = $('#roomNumber').val();
	var description = $('#roomDesc').val();
	
	$.ajax({
		type:'POST',
		url:'/api/room',
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data:inputToHotelRoom(image, beds, price, description, number),
		success:function(data){
			e.preventDefault();
			localStorage.setItem("roomID", data.id);
			setRoomOffers();
		}
	})
});

function setRoomOffers(){
	var token = getJwtToken(TOKEN_KEY);
	var offers = document.getElementsByClassName('offers');
	var string_offers = [];
	$("input:checkbox[name=choice]:checked").each(function(){
		string_offers.push($(this).val());
	});
	console.log(string_offers);

	var id2 = localStorage.getItem("roomID");
	$.ajax({
		type:'POST',
		url:'/api/setRoomOffers/'+id2,
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data:inputToOffers(string_offers),
		success:function(data){

		}
	})
}

$(document).on('click', "#newRoomOffer", function (e) {
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
    e.preventDefault();
});

$(document).on('click', "#addHotelOffer", function (e) {
    var modal = document.getElementById('modal4');
    var span = document.getElementById("close4");
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    e.preventDefault();
});

$(document).on('submit', "#addHotelOfferForm", function (e) {
	e.preventDefault();
	var name = $('#hotelOfferName').val();
	var price = $('#hotelOfferPrice').val();
	var desc = $('#hotelOfferDesc').val();
	
	$.ajax({
		type:'POST',
		url:'/api/addHotelOffer',
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data:inputToHotelOffer(name, price, desc),
		success:function(offer){
			var tr1 = $('<tr></tr>');
			tr1.append('<td><h2>'+offer.name+'</h2></td>');
			var tr2 = $('<tr></tr>');
			tr2.append('<td><p>'+offer.description+'</p></td>'+'<td><h1>'+offer.price+'$</h1></td>');
			var tr3 = $('<tr></tr>'); 
			tr3.append('<td><input type="button" id="deleteOffer" name="'+offer.id+'" value="Delete offer"/>'+'<input type="button" id="editOffer" name="'+offer.id+'" value="Edit offer"/></td>');
			$('#hotelOffers').append(tr1);
			$('#hotelOffers').append(tr2);
			$('#hotelOffers').append(tr3);
			e.preventDefault();
		}
	});
});

$(document).on('click', "#deleteOffer", function (e) {
	var token = getJwtToken(TOKEN_KEY);
	var id=$(this).attr("name");
	$.ajax({
		type:'DELETE',
		url:'/api/deleteHotelOffer/'+id,
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		success:function(offer){
		}
	});
	location.reload();
})

$(document).on('submit', "#editOfferForm", function (e) {
	var name = $('#hotelOfferNameEdit').val();
	var desc = $('#hotelOfferDescEdit').val();
	var price = $('#hotelOfferPriceEdit').val();
	var id = localStorage.getItem("offerID");
	if(name == "" || desc == "" || price == ""){
		alert("All fileds must be filled!");
		return;
	}
	if(isNaN(price)){
		alert("Price must be a number!");
		return;
	}
	$.ajax({
		type:'PUT',
		url:'/api/editHotelOffer',
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data: inputToHotelOfferDTO(name, desc, price, id),
		success:function(data){
			
		}
	});
	location.reload();
})

$(document).on('click', "#editOffer", function (e) {
	e.preventDefault();
	var id=$(this).attr("name");
	var modal = document.getElementById('modal5');
    var span = document.getElementById("close5");
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
	
	$.ajax({
		type:'GET',
		url:'/api/getHotelOffer/'+id,
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		success:function(data){
			$('#hotelOfferNameEdit').val(data.name);
			$('#hotelOfferPriceEdit').val(data.price);
			$('#hotelOfferDescEdit').val(data.description);
			localStorage.setItem("offerID", data.id);
		}
	});
	
})

function printHotelOffers(){
	$('#Other_offers').append('<input class="addOffRight" type="button" value="Add hotel offer" id="addHotelOffer" />');
	$.ajax({
		type:'GET',
		url:'/api/getHotelOffers',
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		success:function(data){
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
			$.each(list, function(index, offer){
				var tr1 = $('<tr></tr>');
				tr1.append('<td><h2>'+offer.name+'</h2></td><td></td>');
				var tr2 = $('<tr></tr>');
				tr2.append('<td><p>'+offer.description+'</p></td>'+'<td align="right"><h1>'+offer.price+'$</h1></td>');
				var tr3 = $('<tr></tr>'); 
				tr3.append('<td><input type="button" id="deleteOffer" name="'+offer.id+'" value="Delete offer"/>'+'<input type="button" id="editOffer" name="'+offer.id+'" value="Edit offer"/></td><td></td>');
				var tr4=$('<tr></tr>');
				tr4.append('<td><hr /></td><td><hr /></td>');
				$('#hotelOffers').append(tr1);
				$('#hotelOffers').append(tr2);
				$('#hotelOffers').append(tr3);
				$('#hotelOffers').append(tr4);
			});
		}
	});
}

$(document).on('submit', "#editOfferForm2", function (e) {
    var modal = document.getElementById('modal');
    var off_name = $('#offerName').val();
    if (off_name != "") {
        var tr = $('<tr></tr>');
        tr.append('<td><input type="checkbox" class="offers" name="choice" checked value="'+off_name+'"/><b>' + off_name + '</b></td>');
        $('#roomOffers').append(tr);
    }
    modal.style.display = "none";
    e.preventDefault();
});

$(document).on('click', "#logout", function (e) {
	removeJwtToken(TOKEN_KEY);
	localStorage.clear();
	window.location.replace("index.html");
});

function inputToHotelRoom(image, beds, price, desc, number){
	return JSON.stringify({
		"image":image,
		"bedNumber":beds,
		"price":price,
		"description":desc,
		"roomNumber":number,
	})
}

function inputToHotelRoomID(id, image, beds, price, desc, number){
	return JSON.stringify({
		"id" : id,
		"image":image,
		"beds":beds,
		"price":price,
		"description":desc,
		"roomNumber":number,
	})
}

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

function inputToOffers(offers){
	return JSON.stringify({
		"roomOffers":offers,
	})
}

function inputToOffersSort(string_offers, sort){
	return JSON.stringify({
		"roomOffers":string_offers,
		"sort": sort,
	})
}

function inputToHotelOffer(name, price, desc){
	return JSON.stringify({
		"name":name,
		"price":price,
		"description":desc,
	})
}

function inputToHotelOfferDTO(name, desc, price, id){
	return JSON.stringify({
		"id":id,
		"name":name,
		"price":price,
		"description":desc,
	})
}

function inputToSort(sort){
	return JSON.stringify({
		"sort":sort,
		"roomOffers":null,
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

function inputToFast(roomId, disc, start, end, string_offers, id){
	return JSON.stringify({
		"roomID":roomId,
		"id":id,
		"discount":disc,
		"start":start,
		"end":end,
		"hotelOffers":string_offers,
	})
}


function formToJSON_profilIZ(password,name,surname,  email) {
	return JSON.stringify({
		"password" : password,
		"name" : name,
		"surname" : surname,
		"email" : email
	});
}
