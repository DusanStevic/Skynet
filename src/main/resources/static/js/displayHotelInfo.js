var TOKEN_KEY = 'jwtToken';

$(window).on("load",function(){//dodati token provere
	var look = localStorage.getItem("justLook");
	if(window.location.href.match('users-hotelProfile.html') != null && look == "1"){
		displayHotelProfile();
		printHotelOffers();
		getAllRoomsOfHotel();
		displayUnregisteredFast()
	}
	else if (window.location.href.match('users-hotelProfile.html') != null){
		var token = getJwtToken(TOKEN_KEY);
		if(token){
			generateMenu();
		}
		$("#hotelInfo").empty();
		$("#roomsDisp").empty();
		var tab = localStorage.getItem("tab");
		if(tab == null || tab == undefined || tab == ""){
			document.getElementById("defaultOpen").click();
		}
		else{
			document.getElementById(tab).click();
		}
		displayHotelProfile();
		printHotelOffers();
		getFastReservations();
		var s1 = localStorage.getItem("searchCriteria");
		var search;
		if(s1 != null && s1 != undefined && s1 != ""){
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
			findRooms();
			displayCriteria(null);
		}
	}
	else if (window.location.href.match('roomInfo.html') != null){
		var roomID = localStorage.getItem("roomID");
		var image = localStorage.getItem("image");
		var beds = localStorage.getItem("beds");
		var price = localStorage.getItem("price");
		var desc = localStorage.getItem("desc");
		var admin = localStorage.getItem("isAdmin");
    	var tr1=$('<tr></tr>');
        tr1.append('<td><img src="'+image+'" class="image" /></td>');
        var tr2=$('<tr></tr>');
        tr2.append('<td>'+
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
        $('#roomInfo').append(tr1);
        if(admin == "true"){
        	var trd = $('<tr align="center"></tr>');
        	trd.append('<td align="center"><input type="button" id="uploadRoomImg" value="Upload image"/></td>');
        	$('#roomInfo').append(trd);
        }
        $('#roomInfo').append(tr2);
        var tr3=$('<tr></tr>');
        tr3.append('<td><h3><b>Room description:</b></h3></td>');
        var tr4=$('<tr></tr>');
        tr4.append('<td><p>'+desc+'</p></td>');
        var tr5=$('<tr></tr>');
        tr5.append('<td><h3><b>Room offers:</b></h3></td>');
        var tr6=$('<tr></tr>');
        tr6.append('<td><ul id="offers2"></ul></td>');
        $('#roomInfo2').append(tr3);
        $('#roomInfo2').append(tr4);
        $('#roomInfo2').append(tr5);
        $('#roomInfo2').append(tr6);
        $.ajax({
            type: 'GET',
            url: '/api/getRoomOffers/'+roomID,
            contentType: 'text/plain',
            success: function(data){
            	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
                $.each(list, function(index, offer){
                	var tro=$('<li></li>');
                	tro.append('<b>'+offer.offer+'</b>');
                	$('#offers2').append(tro);
                })
            }
        })
        var tr7=$('<tr></tr>');
        tr7.append('<td><h3><b>Bed number: '+beds+'</b></h3></td>');
        var tr8=$('<tr></tr>');
        tr8.append('<td><h3><b>Price per night: '+price+'$</b></h3></td>');
        $('#roomInfo2').append(tr7);
        $('#roomInfo2').append(tr8);
        if(admin == "true"){
        	var trd2 = $('<tr align="center"></tr>');
        	trd2.append('<td align="center"><input type="button" id="editRoom" value="Edit room informations" name="'+roomID+'"/></td>');
        	$('#roomInfo2').append(trd2);
        }
	}
})

/* ---------------------------------------------------- */
function getAllRoomsOfHotel(){
	var id = localStorage.getItem("hotelId1");
	$.ajax({
		type : 'GET',
		url : "/api/getAllRooms/"+id,
		contentType: 'text/plain',
		success : function(data) {
			displayAllRooms(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert(jqXHR.status);
			alert(textStatus);
			alert(errorThrown);
		}

	})
}

function displayAllRooms(data){
	$('#Rooms').empty();
	$('#Rooms').append('<table class="content_table" id="roomsDisp"></table>');
	if(data != null && data != undefined){
		var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
		$.each(list, function(index, room){
			var tr=$('<tr></tr>');
			tr.append('<td><img src='+room.image+' class="room_display"/></td>');
			tr.append('<td><table><tr><td><h3>Price per night: '+room.price+'$ </h3></td></tr>'+'<tr><td><h4>Beds: '+room.bedNumber+'</h4></td></tr><tr><td>Room number: '+room.roomNumber+'</td></tr>'+
			'<tr><td><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></td></tr>'+
			'<tr><td><input type="button" class="blueButton" id="viewRoom" name="'+room.id+'" value="More Details"/></td></tr>');
			$('#roomsDisp').append(tr);
		})
		if(list.length == 0){
			var tr = $('<tr></tr>');
			tr.append('<td><div class="notification">This hotel has no rooms to show.</div></td>')
			$('#roomsDisp').append(tr);
		}
	}
}

function displayUnregisteredFast(){
	var tr = $('<tr></tr>');
	tr.append('<td><div class="notification">Informations about fast room reservation are not available right now. If you are not registered, register and start your search in order to get informations about fast reservations.</div></td>')
	$('#fastDisp').append(tr);
	
	
}
/* ---------------------------------------------------- */

$(document).on('click','#uploadRoomImg',function(e){
    var modal = document.getElementById('roomModal');
	var span = document.getElementById("closeRoom");
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

function getFastReservations(){
	console.log("Usao sam");
	var id = localStorage.getItem("hotelId1");
	var reservation = "login";
	var token = getJwtToken(TOKEN_KEY);
	if(token){
		reservation = "fastReserve";
	}
	var number = localStorage.getItem("nights");
	var arr = [];
	var sort = "1";
	$.ajax({
		type:'POST',
		url:'/api/getfastRooms/'+id,
		contentType:'application/json',
		data: inputToRoomSearchDTO(sort,arr),
		dataType:'json',
		success:function(data){
			console.log(data);
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
			$.each(list, function(index, res){
				var real_price = res.room.price;
				var new_price = res.price;
				var ul = '<ul>';
				$.each(res.offers, function(index2, off){
					ul = ul +'<li><b><h4>'+off.name+'<h4></b></li>';
					real_price = real_price + off.price;
					new_price = new_price + off.price;
				})
				var ul2 = '<ul>';
				$.each(res.room.roomOffers, function(index3, offr){
					ul2 = ul2 +'<li><b><h4>'+offr.offer+'<h4></b></li>';
				})
				ul = ul + '</ul>';
				ul2 = ul2 + '</ul>';
				var tr = $('<tr></tr>');
				if(res.offers.length > 0){
					tr.append('<td><img src=' + res.room.image + ' class="room_display"/></td>');
	                tr.append('<td><table><tr><td><div style="color:red;"><strike><h4>Price per'+number+' night(s): ' + number * real_price + '$</h4></strike></div></td></tr><tr><td><h3>Price per '+number+' night(s): '+new_price * number+'$</h3></td></tr>' + '<tr><td><h4>Beds: ' + res.room.bedNumber + '</h4></td></tr>' +
	                '<tr><td><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></td></tr>'+
	        		'<tr><td><input type = "button" class="greenButton" id="'+reservation+'" value="Reserve room" name="'+res.id+'"></td></tr></table></td><td><div class="blue_box">'+ul2+'<h3>Included hotel\'s offers:</h3>'+ul+'</div></td>');
				}
				else{
					tr.append('<td><img src=' + res.room.image + ' class="room_display"/></td>');
	                tr.append('<td><table><tr><td><div style="color:red;"><strike><h4>Price per'+number+' night(s): ' + number * real_price + '$</h4></strike></div></td></tr><tr><td><h3>Price per '+number+' night(s): '+new_price * number+'<tr><td><h4>Beds: ' + res.room.bedNumber + '</h4></td></tr>' +
	                		'<tr><td><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></td></tr>'+
	        		'<tr><td><input type = "button" class="greenButton" id="'+reservation+'" value="Reserve room" name="'+res.id+'"></td></tr></table></td><td><div class="blue_box">'+ul2+'</div></td>');
				}
                $('#fastDisp').append(tr);
			});
		},error : function(jqXHR, textStatus, errorThrown) {
			alert(jqXHR.status);
			alert(textStatus);
			alert(errorThrown);
		}
	});
}

function printHotelOffers(){
	var id = localStorage.getItem("hotelId1");
	$.ajax({
		type:'GET',
		url:'/api/getHotelOffers/'+id,
		contentType:'application/json',
		dataType:'json',
		success:function(data){
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
			$.each(list, function(index, offer){
				var tr1 = $('<tr></tr>');
				tr1.append('<td><h2>'+offer.name+'</h2></td><td></td>');
				var tr2 = $('<tr></tr>');
				tr2.append('<td><p>'+offer.description+'</p></td>'+'<td align="right"><h1>'+offer.price+'$</h1></td>');
				var tr4=$('<tr></tr>');
				tr4.append('<td><hr /></td><td><hr /></td>');
				$('#hotelOffers').append(tr1);
				$('#hotelOffers').append(tr2);
				$('#hotelOffers').append(tr4);
			});
			
			if(list.length == 0){
				if(list.length == 0){
					var tr = $('<tr></tr>');
					tr.append('<td><div class="notification">This hotel has no offers to show.</div></td>')
					$('#Other_offers').append(tr);
				}
			}
		}
	});
}

function displayCriteria(string_offers){
	var id = localStorage.getItem("hotelId1");
	$.ajax({
		type : 'GET',
		url : "/api/getHotelRoomOffers/"+id,
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

function displayChoosenCriteria(string_offers) {
	var number = localStorage.getItem("nights");
	var token = getJwtToken(TOKEN_KEY);
	var reservation = "login";
	if(token){
		reservation = "reserveRoom";
	}
	var sort = localStorage.getItem("sort");
	if(sort == undefined || sort == null || sort == ""){
		sort = "1";
	}
	var id = localStorage.getItem("hotelId1");
    $.ajax({
        type: 'POST',
        url: '/api/searchRooms/'+id,
        contentType: 'application/json',
        dataType: 'json',
        data: inputToRoomSearchDTO(sort,string_offers),
        success: function (data) {
            $("#roomsDisp").empty();
            var list = data == null ? [] : (data instanceof Array ? data : [data]);
            $.each(list, function (index, room) {
                var tr = $('<tr></tr>');
                tr.append('<td><img src=' + room.image + ' class="room_display"/></td>');
                tr.append('<td><table><tr><td><h3>Price per '+number+' night(s): ' + number * room.price + ' </h3></td></tr>' + '<tr><td><h4>Beds: ' + room.bedNumber + '</h4></td></tr>' +
                '<tr><td><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></td></tr>'+
                '<tr><td><input type = "button" class="blueButton" id="viewRoom" value="More details" name="'+room.id+'"></td></tr>'+
        		'<tr><td><input type = "button" class="greenButton" id="'+reservation+'" value="Reserve room" name="'+room.id+'"></td></tr>');
                $('#roomsDisp').append(tr);
            })
        }
    })
}

function displayHotelProfile(){
	var id = localStorage.getItem("hotelId1");
	$.ajax({
        type: 'GET',
        url: '/api/hotels/'+id,
        contentType: 'text/plain',
        data:{'id': id },
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
        		$('#hotelInfo').append(tr1);
        		$('#hotelInfo').append(tr2);
        		$('#hotelInfo').append(tr3);
        		$('#hotelInfo').append(tr4);
            })
        }
    })
}

function findRooms(){
	var id = localStorage.getItem("hotelId1");
	var sort = localStorage.getItem("sort");
	if(sort == undefined || sort == null || sort == ""){
		sort = "1";
		console.log(sort);
	}
	$.ajax({
		type:'POST',
		url:'/api/getAvailableRooms/'+id,
		dataType:'json',
		data: inputToRoomSearchDTO(sort,null),
		contentType: 'application/json',
		success:displayRooms
	})
}

function displayRooms(data){
	var token = getJwtToken(TOKEN_KEY);
	var number = localStorage.getItem("nights");
	var reservation = "login";
	if(token){
		reservation = "reserveRoom";
	}
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	$.each(list, function(index, room){
		var tr=$('<tr></tr>');
		tr.append('<td><img src='+room.image+' class="room_display"/></td>');
		tr.append('<td><table><tr><td><h3>Price per '+number+' night(s): '+room.price * number+' </h3></td></tr>'+'<tr><td><h4>Beds: '+room.bedNumber+'</h4></td></tr>'+
		'<tr><td><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></td></tr>'+
		'<tr><td><input type = "button" class="blueButton" id="viewRoom" value="More details" name="'+room.id+'"></td></tr>'+
		'<tr><td><input type = "button" class="greenButton" id="'+reservation+'" value="Reserve room" name="'+room.id+'"></td></tr>');
		$('#roomsDisp').append(tr);
	})
}

$(document).on('click','#viewRoom',function(e){
	var hid = localStorage.getItem("hotelId1");
	var id=$(this).attr("name");
    $.ajax({
        type: 'GET',
        url: '/api/getRoom/'+id,
        contentType: 'text/plain',
        success: function(data){
            var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
            $.each(list, function(index, room){
            	localStorage.setItem("roomID", room.id);
            	localStorage.setItem("image", room.image);
            	localStorage.setItem("beds", room.bedNumber);
            	localStorage.setItem("price", room.price);
            	localStorage.setItem("desc", room.description);
            })
            window.location.href = "roomInfo.html";
        }
    });
});

$(document).on('submit','#searchRoomsForm',function(e){
	e.preventDefault();
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
		$("#roomsDisp").empty();
		findRooms();
	}
})

$(document).on('click','#moreInfoHotel',function(e){
	var id=$(this).attr("name");
	localStorage.setItem("hotelId1", id);
	window.location.href = "users-hotelProfile.html";
});

function inputToOffers(offers){
	return JSON.stringify({
		"roomOffers":offers,
	})
}

function inputToSort(sort){
	return JSON.stringify({
		"sort":sort,
		"roomOffers":null,
	})
}

function inputToRoomSearchDTO(sort,roomOffers){
	return JSON.stringify({
		"sort":sort,
		"roomOffers":roomOffers,
		"checkin":localStorage.getItem("checkin"),
		"checkout":localStorage.getItem("checkout"),
		"beds":localStorage.getItem("guests"),
	})
}

function inputToOffersSort(string_offers, sort){
	return JSON.stringify({
		"roomOffers":string_offers,
		"sort": sort,
	})
}

$(document).on('click', "#logout", function (e) {
	removeJwtToken(TOKEN_KEY);
	localStorage.clear();
	window.location.replace("index.html");
});

function generateMenu(){
	$('#menubar').empty();
	$('#menubar').append('<div class="container-fluid">'+
            '<div class="navbar-header">'+
      			'<a class="navbar-brand" href="RegisteredUser.html"><span class="glyphicon glyphicon-plane"></span> SKYNET</a>'+
    		'</div>'+
		    ' <ul class="nav navbar-nav navbar-right">'+
		    	'<li> <a href = "cart.html" id = "cart" > <span class="glyphicon glyphicon-shopping-cart"></span> Cart</a></li>'+
      			'<li> <a id = "logout" href = ""><span class="glyphicon glyphicon-log-out"></span> Log out</a></li>'+
    		'</ul>'+
        '</div>');
}
