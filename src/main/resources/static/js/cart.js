var TOKEN_KEY = 'jwtToken';

$(window).on("load",function(){
	if (window.location.href.match('cart.html') != null){
		var token = getJwtToken(TOKEN_KEY);
		if(token){
			var id = localStorage.getItem("reservation");
			if(id == null || id == undefined || id == ""){
				alert("Flight reservation was not completed. Please reserve seat in order to view cart.");
				return;
			}
			displayFlightReservation(id);
			displayRoomReservation(id);
			displayCarReservation(id);
		}
		else{
			alert("You are not logged in!");
		}
	}
})


function displayFlightReservation(id){
	if(id != null && id != undefined && id != ""){
		$.ajax({
	        type: 'GET',
	        url: '/api/getSeatReservations/'+id,
	        headers : createAuthorizationTokenHeader(TOKEN_KEY),
	        contentType: 'text/plain',
	        success: function(data){
	            //TODO printanje rezervacija sedista...
	        	//ukoliko je lista sedista prazna javiti gresku korisniku
	        	//ukoliko nije prikazati dobavljene rezervacije sedista u tabeli flightResDisplay koja se nalazi u cart.html
	        }, error : function(){
	        	alert("Error.");
	        }
	    })
	}
	
}

function displayRoomReservation(id){
	if(id != null && id != undefined && id != ""){
		$.ajax({
	        type: 'GET',
	        url: '/api/getRoomReservations/'+id,
	        headers : createAuthorizationTokenHeader(TOKEN_KEY),
	        contentType: 'text/plain',
	        success: function(data){
	        	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	        	if(list.length == 0){
	        		$('#roomButtonDisplay').append('<tr><td><h2>You have not reserved rooms. If you want, start your room reservation now. </h2></td><tr/><tr><td><input type="button" class="greenButton" style="padding: 14px 16px;" id="goToRoomRes" value="Start room reservation"/></td></tr>');
	        	}
	    		$.each(list, function(index, room){
	    			var start = room.checkIn.toString().substr(0, 10);
	    			var end = room.checkOu.toString().substr(0, 10);
	    			var tr=$('<tr></tr>');
	    			tr.append('<td><img src='+room.reservedRoom.image+' class="room_display"/></td>');
	    			tr.append('<td><table><tr><td><h3>Price per night: '+room.price+'$ </h3></td></tr>'+'<tr><td><h4>Beds: '+room.reservedRoom.bedNumber+'</h4></td></tr>'+
	    			'<tr><td>Ckeck-in: '+start+'</td></tr>'+'<tr><td>Ckeck-out: '+end+'</td></tr>');
	    			$('#roomResDisplay').append(tr);
	    		})
	        }, error : function(){
	        	alert("Error.");
	        }
	    })
	}
}

function displayCarReservation(id){
	if(id != null && id != undefined && id != ""){
		$.ajax({
	        type: 'GET',
	        url: '/api/getCarReservations/'+id,
	        headers : createAuthorizationTokenHeader(TOKEN_KEY),
	        contentType: 'text/plain',
	        success: function(data){
	        	
	        	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	        	if(list.length == 0){
	        		$('#carButtonDisplay').append('<tr><td><h2>You have not reserved cars. If you want, start your car reservation now. </h2></td><tr/><tr><td><input type="button" class="greenButton" style="padding: 14px 16px;" id="goToCarRes" value="Start car reservation"/></td></tr>');
	        	}
	            //TODO printanje rezervacija automobila...
	        	//ukoliko je lista rezervacija automobila prazna, dodati dugme u carButtonDisplay tabeli koja se nalazi u cart.html, za prelazak na pretragu rac servisa
	        	//ukoliko nije, prikazati rezervacije automobila u tabeli carResDisplay i NE DODAVATI DUGME za prelazak na pretragu
	        }, error : function(){
	        	alert("Error.");
	        }
	    })
	}
}


$(document).on("click", "#goToRoomRes",function(e){
	localStorage.setItem("page", "hotel");
	window.location.href = 'search.html';
})

$(document).on("click", "#goToCarRes",function(e){
	localStorage.setItem("page", "rac");
	window.location.href = 'search.html';
})

//Prikaz poruke da je rezervacija gotova
$(document).on("click", "#finishReservation",function(e){
	var id = localStorage.getItem('reservation');
	$.ajax({
        type: 'GET',
        url: '/api/finishReservation/'+id,
        headers : createAuthorizationTokenHeader(TOKEN_KEY),
        contentType: 'text/plain',
        success: function(data){
        	localStorage.removeItem("reservation");
        	var modal = document.getElementById('fency');
        	modal.style.display = "block";
        	var tr = $('<tr></tr>');
        	tr.append('<td>Reservation was completed successfuly! You can find it in your reservations.</td>');
        	$("#fencyBody").append(tr);
        	var tr2 = $('<tr></tr>');
        	tr2.append('<td></td><td><input type="button" id="ok" value="Ok" class="greenButton"/></td><td></td>');
        	$("#fencyButtons").append(tr2);
        }, error : function(){
        	alert("Error.");
        }
    })
})

$(document).on("click", "#ok",function(e){
	var modal = document.getElementById('fency');
	modal.style.display = "none";
	window.location.replace("RegisteredUser.html");
})