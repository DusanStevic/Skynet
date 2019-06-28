var TOKEN_KEY = 'jwtToken';

//array labela koje se salju na server
var lab=[];
$(window).on("load",function(){
	var look = localStorage.getItem("justLook");
	if(window.location.href.match('users-AirlineProfile.html') != null && look == "1"){
		displayAirlineProfile();
		displayAllFlights();
		displayFastInfo();
		displayDestinations();
	}
	else if (window.location.href.match('users-airlineProfile.html') != null){
		var token = getJwtToken(TOKEN_KEY);
		if(token){
			//generateMenu();
		}
		$("#hotelInfo").empty();
		$("#roomsDisp").empty();
		
		displayAirlineProfile();
		displayFlights();
		displayFastReservations();
		displayDestinations();
	}
})

$(document).on('click','#next-button',function(e){
	window.location.replace("cart.html");
});

/* ------------------------------------------------------------- */
function displayAllFlights(){
	var id = localStorage.getItem("airlineid1");
	$.ajax({
		type : 'GET',
		url : "/api/getAllFlights/" + id,
		contentType: 'text/plain',
		success : function(data){
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
			if(list.length > 0){
				var tr = $('<tr></tr>');
				tr.append('<th>Start destination</th><th>End destination</th><th>Departure</th><th>Arrival</th><th>Price</th>');
				$('#flightDisp').append(tr);
			}
			$.each(list, function(index, flight){
				var tr2 = $('<tr></tr>');
				tr2.append('<td>'+flight.startDestination.name+'</td><td>'+flight.endDestination.name+'</td>'+'<td>'+flight.startDate.toString()+'</td>'+'<td>'+flight.endDate.toString()+'</td>'+'<td>'+flight.economicPrice +'-'+flight.firstClassPrice+'</td>');
				$('#flightDisp').append(tr2);
			});
			if(list.length == 0){
				var tr = $('<tr></tr>');
				tr.append('<td><div class="notification">This airline has no flights to display.</div></td>')
				$('#Fligts').append(tr);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
}

function displayFastInfo(){
	var tr = $('<tr></tr>');
	tr.append('<td><div class="notification">Informations about fast reservation are not available right now. If you are not registered, register and start your search in order to get informations about fast reservations.</div></td>')
	$('#FastReservations').append(tr);
}
/* ------------------------------------------------------------- */


function displayAirlineProfile(){
	var id = localStorage.getItem("airlineid1");
	$.ajax({
        type: 'GET',
        url: '/api/airlines/'+id,
        contentType: 'text/plain',
        success: function(data){
            var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
            $.each(list, function(index, hotel){
            	var tr1=$('<tr></tr>');
        		tr1.append('<td><h2>' + hotel.name + '</h2></td>');
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
        		$('#airlineInfo').append(tr1);
        		$('#airlineInfo').append(tr2);
        		$('#airlineInfo').append(tr3);
        		$('#airlineInfo').append(tr4);
            })
        },error: function(){
        	alert("NEVALJA");
        }
    })
}

function displayFlights(){
	var id = localStorage.getItem("airlineid1");
	var departure = localStorage.getItem("checkin");
	var arrival = localStorage.getItem("checkout");
	var passangers = localStorage.getItem("guests");
	var startDestination = localStorage.getItem("start");
	var endDestination = localStorage.getItem("end");
	
	
	$.ajax({
		type : 'POST',
		url : "http://localhost:8080/api/searchedFlights/" + id,
		dataType: 'json',
		contentType: 'application/json',
		data: AirlineSearchDTO2JSON(departure,arrival,passangers,startDestination,endDestination),
		success : function(data){
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
			if(list.length > 0){
				var tr = $('<tr></tr>');
				tr.append('<th>Start destination</th><th>End destination</th><th>Departure</th><th>Arrival</th><th>Price</th>');
				$('#flightDisp').append(tr);
			}
			$.each(list, function(index, flight){
				var tr2 = $('<tr></tr>');
				tr2.append('<td>'+flight.startDestination.name+'</td><td>'+flight.endDestination.name+'</td>'+'<td>'+flight.startDate.toString()+'</td>'+'<td>'+flight.endDate.toString()+'</td>'+'<td>'+flight.economicPrice +'-'+flight.firstClassPrice+'</td>');
				var forma2 = $('<tr><td><input type = "button" name="' + flight.id +'" class="reserve" value="Reserve"></td></tr>');
				$('#flightDisp').append(tr2);
				$('#flightDisp').append(forma2);
				
				
				
				
				
			});
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
	
}

function AirlineSearchDTO2JSON(departure,arrival,passangers,startDestination,endDestination) {
	return JSON.stringify({
		"departure" : departure,
		"arrival" : arrival,
		"passangers" : passangers,
		"startDestination" : startDestination,
		"endDestination" : endDestination
	});
}


$(document).on('click', '.reserve', function(e){	
	e.preventDefault();
	$('#profil').empty();
	var brLeta = $(this).attr("name");
	localStorage.setItem("flightID", brLeta);
	//var adresa = '../Projekat/rest/letovi/pronadjiLet/' + brLeta;
	
	
	
	$.ajax({
        type : 'GET',
        url : "http://localhost:8080/api/getSeatsOnFlight/" + brLeta,
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
	$('#profil').append('<h1>Rezervacija leta:</h1>')
	$('#profil').append(forma)


};

$(document).on('submit', '#sedista', function(e){	
	e.preventDefault();
	var brLeta = localStorage.getItem("flightID");
	alert("OVO JE BROJ LETA KOJI HOCEMO DA REZERVISEMO: " + brLeta);
	//var adresa = '../Projekat/rest/letovi/pronadjiLet/' + brLeta;
	
	
	
	$.ajax({
        type : 'GET',
        url : "http://localhost:8080/api/getSeatsOnFlight/" + brLeta,
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
	
	
	
	
	$('#profil').append('<div class="container">'+
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
				'<button id="next-button" onclick="$(\'#uzas\').click()">Next &raquo;</button>'+
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

/*function pokupiRezervisanaSedista(){
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
		url:"http://localhost:8080/api/seatReservation",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data:seatReservationToJSON(id, lab, total),
		success:function(data){
			localStorage.setItem("reservation", data.id);
			alert("ID REZERVACIJE: " + data.id);
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
		}
	});
	
	
	
	
	
}*/



$(document).on('click','.checkout-button',function(e){
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
		url:"http://localhost:8080/api/seatReservation",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType:'application/json',
		dataType:'json',
		data:seatReservationToJSON(id, lab, total),
		success:function(data){
			localStorage.setItem("reservation", data.id);
			alert("ID REZERVACIJE: " + data.id);
			$.bootstrapGrowl("Seats have been successfully reserved!", {
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

function seatReservationToJSON(flight_id, seats, total){
	return JSON.stringify({
		"seats":seats,
		"flight_id":flight_id,
		"total":total,
	});
}

function displayFastReservations(){
	var id = localStorage.getItem("airlineid1");
	alert("ID LETA AVIONA: " + id);
	$.ajax({                           
		type : 'GET',
		url : "http://localhost:8080/api/getFastSeatReservations/" + id,
		dataType: 'json',
		success : function(data){
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
			$.each(list, function(index, fastSeatReservation){
				var tr1 = $('<tr></tr>');
				tr1.append('<td><h2>'+fastSeatReservation.startDate+'</h2></td><td></td>');
				var tr2 = $('<tr></tr>');
				tr2.append('<td><p>'+fastSeatReservation.description+'</p></td>'+'<td align="right"><h3>Coordinates: '+fastSeatReservation.coordinates+'</h3></td>');
				var tr4=$('<tr></tr>');
				tr4.append('<td><hr /></td><td><hr /></td>');
				var forma2 = $('<tr><td><input type = "button" name="' + fastSeatReservation.id +'" class="makeFastSeatReservation" value="Make fast seat reservation"></td></tr>');
				$('#fastRes').append(tr1);
				$('#fastRes').append(tr2);
				$('#fastRes').append(tr4);
				$('#fastRes').append(forma2);
			});
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
			
}

//ovd dodaj obican upit prema bazi bez iscrtavanja sedista










function displayDestinations(){
	var id = localStorage.getItem("airlineid1");
	$.ajax({
		type : 'GET',
		url : "http://localhost:8080/api/getDestinations/" + id,
		dataType: 'json',
		success : function(data){
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
			$.each(list, function(index, destinacija){
				var tr1 = $('<tr></tr>');
				tr1.append('<td><h2>'+destinacija.name+'</h2></td><td></td>');
				var tr2 = $('<tr></tr>');
				tr2.append('<td><p>'+destinacija.description+'</p></td>'+'<td align="right"><h3>Coordinates: '+destinacija.coordinates+'</h3></td>');
				var tr4=$('<tr></tr>');
				tr4.append('<td><hr /></td><td><hr /></td>');
				$('#destinations').append(tr1);
				$('#destinations').append(tr2);
				$('#destinations').append(tr4);
			});
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
}