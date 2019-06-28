$( document ).ready(function() {
	findVehicles();
});


function findVehicles() {
	var value = localStorage.getItem('showVeh');
	if(localStorage.getItem('vehicleBegin') != null){
		$('#racIdHidden').val(value);
		$('#vehpickup').val(localStorage.getItem('vehicleBegin'));
		$('#vehdropoff').val(localStorage.getItem('vehicleEnd'));
		
		var formData = getFormData("#formsrcvehs");
		var jsonData = JSON.stringify(formData);
		$.ajax({
			type : 'POST',
			url : '/rentacars/vehicles/search',
			contentType : 'application/json',
			dataType : 'json',
			data : jsonData,
			beforeSend : function(xhr) {
				/* Authorization header */
				xhr.setRequestHeader("Authorization", "Bearer " + getJwtToken());
			},
			success : fillTable
		});
		
		localStorage.removeItem('vehicleBegin');
		localStorage.removeItem('vehicleEnd');
	}else{
	
	
	$.ajax({
		type : 'GET',
		url : "/rentacars/" + value + "/vehicles",
		dataType : "json",
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + getJwtToken());
		},
		success : fillTable,
		error : function(data) {
			alert(data);
		}
	});}
}

function fillTable(data) {
	var veh_list = data == null ? []
			: (data instanceof Array ? data : [ data ]);

	var vehsDiv = $('#vehsDiv');
	vehsDiv.empty();
	var counter = 0;

	$
			.each(
					veh_list,
					function(index, veh) {
						var vehDiv = $('<div class="company-div" id="vehDiv_'
								+ counter
								+ '" style="bottom:'
								+ (60 - counter * 40)
								+ '%; top:'
								+ (3 + counter * 40)
								+ '%;"'
								+ '>'
								+ '<img src="../images/cars.jpg" height = 90% width= 18%>'
								+ '<h3>' + veh.registrationNumber + '</h3>');

						vehDiv
								.append('<p style="position: absolute;top:65%;"> Gear: '
										+ veh.gear + '</p>');
						vehDiv
						.append('<p style="position: absolute;top:80%;"> Type: '
								+ veh.type + '</p>');
						vehDiv
								.append('<button class="show_details_btn reserve_veh" id="reserve_veh' + veh.id + '">Make reservation</button>');

						counter++;
						vehsDiv.append(vehDiv);

					});
	$('.reserve_veh').on('click', function(e) {
		e.preventDefault();
		
		if(localStorage.getItem('currentUser') === null){
			alertify.error('Please, log in');
			return;
		}
		
		var vehId = this.id.substring(11);
		var vrData = collectVehicleReservationData(vehId);


		reserveVehicle(vrData);

	});
}


$(document).on('submit', '#formsrcvehs', function(e) {
	e.preventDefault();
	$('#racIdHidden').val(localStorage.getItem('showVeh'));
	var formData = getFormData("#formsrcvehs");
	var jsonData = JSON.stringify(formData);
	$.ajax({
		type : 'POST',
		url : '/rentacars/vehicles/search',
		contentType : 'application/json',
		dataType : 'json',
		data : jsonData,
		beforeSend : function(xhr) {
			/* Authorization header */
			xhr.setRequestHeader("Authorization", "Bearer " + getJwtToken());
		},
		success : fillTable
	});

});

// reservations
function reserveVehicle(vrData) {

	alertify.set('notifier', 'position', 'top-right');

	var racId = localStorage.getItem('showVeh');
	
	if(vrData['checkInDate'] === "" || vrData['checkOutDate'] === ""){
		alertify.error('Please, choose dates.');
		return;
	}

	var jsonData = JSON.stringify(vrData);
	// alert('rr ' + jsonData);
	$.ajax({
		type : 'POST',
		url : '/vehicles/' + vrData.vehicle_id + '/reservations',
		contentType : 'application/json',
		dataType : 'json',
		data : jsonData,
		beforeSend : function(xhr) {
			/* Authorization header */
			xhr.setRequestHeader("Authorization", "Bearer " + getJwtToken());
		},
		success : function() {
			alertify.notify('Vehicle reserved!');
		},
		statusCode : {
			403 : function() {

				alertify.error('You must first log in!');
			}
		}
	});
}

function collectVehicleReservationData(vehicleId) {

	var vrData = {};
	vrData['vehicle_id'] = vehicleId;
	vrData['racId'] = localStorage.getItem('showVeh');
	vrData['checkInDate'] = $('#vehpickup').val();
	vrData['checkOutDate'] = $('#vehdropoff').val();
	
	
	if (JSON.parse(localStorage.getItem('currentUser')) != null)
		vrData['user_id'] = JSON.parse(localStorage.getItem('currentUser')).id;

	//rrData['totalPrice'] = localStorage.getItem('currentPrice');

	return vrData;

}
