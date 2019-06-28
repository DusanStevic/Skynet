var TOKEN_KEY = 'jwtToken';


$(window).on("load",function(){
	var look = localStorage.getItem("justLook");
	if(window.location.href.match('users-RACProfile.html') != null && look == "1"){
		displayRACProfile();
		displayFastInfo();
		displayBranches();
		displayCars();
	}
	else if (window.location.href.match('users-RACProfile.html') != null){
		var token = getJwtToken(TOKEN_KEY);
		if(token){
			//generateMenu();
		}
		$("#racInfo").empty();
		$("#carDisp").empty();
		
		displayRACProfile();
		displayFastReservations();
		displayBranches();
		displayCars();
	}
})

function displayFastInfo(){
	var tr5=$('<tr></tr>');
	tr5.append('<td><div class="notification">Informations about fast reservation are not available right now. If you are not registered, register and start your search in order to get informations about fast reservations.</div></td>');
	$('#fast').append(tr5);
}

function displayRACProfile(){
	var id = localStorage.getItem("racId1");
	$.ajax({
        type: 'GET',
        url: '/api/racs/'+id,
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
        		$('#racInfo').append(tr1);
        		$('#racInfo').append(tr2);
        		$('#racInfo').append(tr3);
        		$('#racInfo').append(tr4);
            })
        },error: function(){
        	alert("NE VALJA");
        }
    })
}

function displayCars(){
	var id = localStorage.getItem("racId1");
	$.ajax({
		type : 'GET',
		url : "/findConcreteCars/" + id,
		contentType: 'text/plain',
		success : function(data){
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
			$.each(list, function(index, destinacija){
				var tr1 = $('<tr></tr>');
				tr1.append('<td><h2>'+destinacija.name+'</h2></td><td></td>');
				var tr2 = $('<tr></tr>');
				tr2.append('<td><p>Type</p></td>');
				tr2.append('<td><p>'+destinacija.carType+'</p></td>');
				var tr3 = $('<tr></tr>');
				tr3.append('<td><p>Brand</p></td>');
				tr3.append('<td><p>'+destinacija.brand+'</p></td>');
				var tr4 = $('<tr></tr>');
				tr4.append('<td><p>Price</p></td>');
				tr4.append('<td><p>'+destinacija.price+'</p></td>');
				var tr5 = $('<tr></tr>');
				tr5.append('<td><p>Price</p></td>');
				tr5.append('<td><button style="background: #69a7c5; color: white" id="reserveCar">Make reservation</button></td>');
				var tr6=$('<tr></tr>');
				tr6.append('<td><hr /></td><td><hr /></td>');
				$('#carDisp').append(tr1);
				$('#carDisp').append(tr2);
				$('#carDisp').append(tr3);
				$('#carDisp').append(tr4);
				$('#carDisp').append(tr5);
				$('#carDisp').append(tr6);
			});
			
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
}




function displayFastReservations(){
	var id = localStorage.getItem("racId1");
	$.ajax({
		type : 'GET',
		url : "/showCarsOnFastRes/" + id,
		contentType: 'text/plain',
		success : function(data){
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
			$.each(list, function(index, destinacija){
				var tr1 = $('<tr></tr>');
				tr1.append('<td><h2>'+destinacija.name+'</h2></td><td></td>');
				var tr2 = $('<tr></tr>');
				tr2.append('<td><p>Old price</p></td>');
				tr2.append('<td><p>'+destinacija.price+'</p></td>');
				var tr3 = $('<tr></tr>');
				tr3.append('<td><p>New price</p></td>');
				tr3.append('<td><p>'+destinacija.fastResPrice+'</p></td>');
				var tr5=$('<tr></tr>');
				tr5.append('<td><hr /></td><td><hr /></td>');
				$('#fast').append(tr1);
				$('#fast').append(tr2);
				$('#fast').append(tr3);
				$('#fast').append(tr5);

			});
			
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
}

function displayBranches(){
	
	var id = localStorage.getItem("racId1");
	$.ajax({
		type : 'GET',
		url : "/getConcreteBranches/" + id,
		contentType: 'text/plain',
		success : function(data){
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
			$.each(list, function(index, destinacija){
				var tr1 = $('<tr></tr>');
				tr1.append('<td><h2>'+destinacija.city+'</h2></td><td></td>');
				var tr2 = $('<tr></tr>');
				tr2.append('<td><p>'+destinacija.address+'</p></td>');
				var tr4=$('<tr></tr>');
				tr4.append('<td><hr /></td><td><hr /></td>');
				$('#branches').append(tr1);
				$('#branches').append(tr2);
				$('#branches').append(tr4);
			});
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	});	
	
}