var totalPrice;
var clickedBeds;

$(document).on('click','#reserveRoom',function(e){
	e.preventDefault();
	var able = localStorage.getItem("reservation");
	if(able == null || able == undefined || able == ""){
		alert("Room can not be reserved before flight. Please reserve flight first.");
		return;
	}
	var hid = localStorage.getItem("hotelId1");
	var id=$(this).attr("name");
	localStorage.setItem("roomID", id);
    $.ajax({
        type: 'GET',
        url: '/api/getRoom/'+id,
        contentType: 'text/plain',
        success: displayRoomReservation
    });
});

$(document).on('click','#reserveMore',function(e){
	var modal = document.getElementById('fency');
	modal.style.display = "none";
});

$(document).on('click','#nextStep',function(e){
	var modal = document.getElementById('fency');
	modal.style.display = "none";
	window.location.replace("cart.html");
});

$(document).on('click','#makeRes',function(e){
	var offers = [];
	$("input:checkbox[name=offerChoice]:checked").each(function(){
		var x = parseInt(this.id);
		offers.push(x);
	});
	var able = localStorage.getItem("reservation");
	if(able == null || able == undefined || able == ""){
		alert("Room can not be reserved before flight. Please reserve flight first.");
		return;
	}
	var beds = parseInt(localStorage.getItem("guests"));
	var curBeds = parseInt(localStorage.getItem("curBeds"));
	var nowBeds = clickedBeds + curBeds;
	var left = beds - curBeds;
	
	$("#fencyBody").empty();
	$("#fencyButtons").empty();
	var modal = document.getElementById('fency');
	modal.style.display = "block";
	
	var tr = $('<tr></tr>');
	
	if(nowBeds < beds){
		curBeds = curBeds + clickedBeds;
		left = beds - curBeds;
	}
	
	else if(nowBeds > beds){
		left = beds - curBeds;
		var modal2 = document.getElementById('modal2');
		modal2.style.display = "none";
		tr.append('<td>Room could not be reserved. Please select rooms with maximum '+left+' beds or finish your room reservation now and go to next step. You can also book rooms of other hotels. </td>');
		$("#fencyBody").append(tr);
		var tr2 = $('<tr></tr>');
		tr2.append('<td><input type="button" id="reserveMore" value="Reserve another room" class="greenButton"/></td><td><input type="button" id="nextStep" value="Next step" class="blueButton"/></td>');
		$("#fencyButtons").append(tr2);
		return;
	}
	console.log(offers);
	var days = 10;
	var resID = able;
	var roomID = localStorage.getItem("roomID");
	$.ajax({
		type:'POST',
		url:'/api/roomReservation/'+able,
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data:inputToRoomReservation(offers, days, roomID, '1000'),
		success:function(data){
			if(data == null){
				left = beds + curBeds;
				curBeds = curBeds - clickedBeds;
				alert("Room could not be reserved. You have already reservd this room, or you have not completed flight reservation.");
			}
			else{
				var modal2 = document.getElementById('modal2');
				modal2.style.display = "none";
				tr.append('<td>Room is successfuly reserved! You can reserve more rooms for '+left+' persons or you can finish room reservation now and go to next step.</td>');
				$("#fencyBody").append(tr);
				var tr2 = $('<tr></tr>');
				tr2.append('<td><input type="button" id="reserveMore" value="Reserve more rooms" class="greenButton"/></td><td><input type="button" id="nextStep" value="Next step" class="blueButton"/></td>');
				$("#fencyButtons").append(tr2);
				localStorage.setItem("curBeds", curBeds.toString());
			}
		},
		error:function(){
			left = beds + curBeds;
			curBeds = curBeds - clickedBeds;
			alert("Room could not be reserved. You have already reservd this room, or you have not completed flight reservation.");
		}
	});
});

$(document).on('click','#fastReserve',function(e){
	var able = localStorage.getItem("reservation");
	if(able == null || able == undefined || able == ""){
		alert("Room can not be reserved before flight. Please reserve flight first.");
		return;
	}
	var id=$(this).attr("name");
	$.ajax({
		type:'POST',
		url:'/api/fastReserve/'+able,
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data:inputToFastResevre(id),
		success:function(data){
			if(data == null){
				alert("Room could not be reserved. You have already reservd this room, or you have not completed flight reservation.");
			}
			else{
				alert("Room successfuly reserved! Now go to cart to complete your reservation.");
				window.location.replace("cart.html");
			}
		},
		error:function(){
			alert("Room could not be reserved. You have already reservd this room, or you have not completed flight reservation.");
		}
	});
});


$(document).on('click','.custom_checkbox',function(e){
	var price = parseFloat(this.value);
	if(this.checked == true){
		totalPrice = totalPrice + price;
	}
	else{
		totalPrice = totalPrice - price;
	}
	$('#submitReservation').empty();
	$('#TotPrice').empty();
	$('#TotPrice').append('<tr><td><h4><b>Total price: '+totalPrice+'</b></h4></td></tr>');
    $('#submitReservation').append('<tr><td><input type="button" id="makeRes" value = "Reserve Room" class="greenButton"/></td></tr>');
});

function displayRoomReservation(room){
	totalPrice=room.price;
	$('#roomShow').empty();
	$('#submitReservation').empty();
	$('#TotPrice').empty();
	var tr2=$('<tr></tr>');
    tr2.append('<td><img src="'+room.image+'" class="modal_picture"/></td>');
    tr2.append('<td align="top"><table id="roomResInfo"></table></td>');
    $('#roomShow').append(tr2);
    $('#roomResInfo').append('<tr><td><b>Beds:&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp'+room.bedNumber+'</b></td></tr>');
    clickedBeds = room.bedNumber;
    var name = "";
    var date1 = localStorage.getItem("checkin");
	var date2 = localStorage.getItem("checkout");
	var guests = localStorage.getItem("guests");
	var address = localStorage.getItem("address");
    
    displayResInfo();
    dispHotelOffers();
    
    
    
    var modal = document.getElementById('modal2');
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
}

function displayResInfo(res){
	var number = localStorage.getItem("nights");
	totalPrice = totalPrice * number;
	
    $('#roomResInfo').append('<tr><td><b>Checkin:&nbsp &nbsp &nbsp'+localStorage.getItem("checkin")+'</b></td></tr>');
    $('#roomResInfo').append('<tr><td><b>Checkout:&nbsp &nbsp'+localStorage.getItem("checkout")+'</b></td></tr>');
    $('#roomResInfo').append('<tr><td><b>Price:&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp'+totalPrice+'</b></td></tr>');
    $('#TotPrice').append('<tr><td><h4><b>Total price: '+totalPrice+'</b></h4></td></tr>');
    $('#submitReservation').append('<tr><td><input type="button" id="makeRes" value = "Reserve Room" class="greenButton"/></td></tr>');
}

function dispHotelOffers(){
	var number = localStorage.getItem("nights");
	$('#offersShow').empty();
	var id = localStorage.getItem("hotelId1");
	$.ajax({
		type:'GET',
		url:'/api/getHotelOffers/'+id,
		contentType:'application/json',
		dataType:'json',
		success:function(data){
			if(data != null){
				$('#offersShow').append('<tr><td><table id="offersTab" class="reservation_table"></table></td></tr>');
				$('#offersTab').append('<tr><th>Offer name</th><th>Price</th></tr>');
				var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
				$.each(list, function(index, offer){
					$('#offersTab').append('<tr><td>'+offer.name+'</td><td>'+offer.price * number+'<input type="checkbox" class="custom_checkbox" value="'+offer.price * number+'" id="'+offer.id+'" name="offerChoice" /></td></tr>');
				});
			}
		}
	});
}

function inputToRoomReservation(offers, days, roomID, resID){
	return JSON.stringify({
		"hotelOffers":offers,
		"days": days,
		"roomId":roomID,
		"reservationId":resID,
		"checkin":localStorage.getItem("checkin"),
		"checkout":localStorage.getItem("checkout"),
	})
}

function inputToFastResevre(resID){
	return JSON.stringify({
		"fastId":resID,
		"startDate":localStorage.getItem("checkin"),
		"endDate":localStorage.getItem("checkout"),
	})
}

function searchToHotel2(name,checkin,checkout,beds, address){
	return JSON.stringify({
		"name":name,
		"checkin":checkin,
		"checkout":checkout,
		"beds":beds,
		"address":address,
	})
}

