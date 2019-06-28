
var urlShowRentacars = "http://localhost:8080/showRentACars";
var urlFindRentacars = "http://localhost:8080/findRentacars";
var urlRootFindSuitCars = "http://localhost:8080/findSuitCars";
var urlRootGetAllCars = "http://localhost:8080/getAllCars";
var urlRootCreateCarRes = "http://localhost:8080/createCarReservation";
var urlRootFindRentacarFromRes = "http://localhost:8080/findRentacarFromRes";
var urlRootFindCarFromRes = "http://localhost:8080/findCarFromRes";
var urlRootCreateCarResFast = "http://localhost:8080/createCarReservationFast";

var urlRootProfile9 = "http://localhost:8080/findConcreteRentacar";
var urlRootProfile12 = "http://localhost:8080/findConcreteCars";


var TOKEN_KEY = 'jwtToken';



function showMessage(message, type) {
	if (type != "success" && type != "error" && type != "warning"
			&& type != "info") {
		type = "info";
	}
	toastr.options = {
		"closeButton" : true,
		"debug" : false,
		"newestOnTop" : false,
		"progressBar" : false,
		"positionClass" : "toast-top-right",
		"preventDuplicates" : false,
		"showDuration" : "300",
		"hideDuration" : "1000",
		"timeOut" : "5000",
		"extendedTimeOut" : "1000",
		"showEasing" : "swing",
		"hideEasing" : "linear",
		"showMethod" : "fadeIn",
		"hideMethod" : "fadeOut"
	}
	toastr[type](message);
}



const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}





function showRentacars(criteria) {
	console.log('showing rentacars');
	sessionStorage.removeItem("choosenSeats");
	$.ajax({
		type : 'GET',
		url : urlShowRentacars + "/" + criteria,
		dataType : "json",
		success : function(data) {
			fillTableRentacars(data);

		},
		error : function(jqXHR, textStatus, errorThrown) {
			showMessage(jqXHR.status,"error");
			showMessage(textStatus,"error");
			showMessage(errorThrown,"error");
		}

	})
}

function fillTableRentacars(data) {
	console.log("FILL TABLE RENTACARS");
	console.log(data)
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	var response = data;
	sessionStorage.removeItem("choosenSeats");
	$("#tableOfRentacars").find("tr").remove();
	var tabela = document.getElementById("tableOfRentacars");
	console.log(tabela);
	
	if (list.length==0){
		console.log('response je []');
		$("#tableOfRentacars").append("<tr><td><h2>No rent-a-cars.</h2></td></tr>")
	}
	else{
		
	
	for ( var counter in response) {
		console.log('counter: ' + counter);
		var row = tabela.insertRow(counter);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);


		cell1.innerHTML = response[counter].name;
		cell2.innerHTML = response[counter].address;


			cell3.innerHTML = '<button style="background: #69a7c5; color: white" id=\"'
				+ response[counter].id
				+ '\" class=\"chooseRentacarSingle\" class="btn btn-primary">Choose</button>';

	}
	var row = tabela.insertRow(0);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);



	cell1.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Name</p>';
	cell2.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Address</p>';
	cell3.innerHTML = '<p style= "font-weight: 200%; font-size:150%"></p>';

	
	}

}

function findRentacars() {
	console.log('find rent a car called');
	sessionStorage.removeItem("choosenSeats");
	var field = document.getElementById("nameLocationRentACar").value;
	console.log('Field: ' + field);
	if (field == "") {
		showMessage("Field is not allowed to be empty, fill it!","warning");
	} else {

		$.ajax({
			type : 'GET',
			url : urlFindRentacars + "/" + field,
			dataType : "json",
			success : function(data) {
				console.log('uslo u success');
				fillTableRentacars(data);

			},
			error : function(jqXHR, textStatus, errorThrown) {
				showMessage(jqXHR.status,"error");
				showMessage(textStatus,"error");
				showMessage(errorThrown,"error");
			}

		})
	}
}



function searchToJson(startDestination, finalDestination, dateOfFlight,
		dateOfArrival, from, to, fromL, toL, name) {
	return JSON.stringify({
		"startDestination" : startDestination,
		"finalDestination" : finalDestination,
		"startDate" : dateOfFlight,
		"endDate" : dateOfArrival,
		"from" : from,
		"to" : to,
		"fromL" : fromL,
		"toL" : toL,
		"name" : name
	})
}


function createCarReservationCriteriums(startDate, endDate, startCity, endCity,
		carType, passengers, fromPrice, toPrice) {
	return JSON.stringify({
		"startDate" : startDate,
		"endDate" : endDate,
		"startCity" : startCity,
		"endCity" : endCity,
		"carType" : carType,
		"passengers" : passengers,
		"startPrice" : fromPrice,
		"endPrice" : toPrice
	})
}
function searchForCars(rentacarId) {
	sessionStorage.removeItem("choosenSeats");
	var mainStartDate = document.getElementById("mainStartDate3").value;
	var mainEndDate = document.getElementById("mainEndDate3").value

	var startDate = document.getElementById("pickupDateCar").value;
	var endDate = document.getElementById("endDateCar").value;
	var rentacarId = document.getElementById("rentacarId").value
	
	

	var dozvola = 1;
	if (new Date(startDate) < new Date(mainStartDate)) {
		showMessage("Pickup date must be after (or same day) the first day of reservation of flight","warning");
		dozvola = 0;
	}

	if (new Date(endDate) < new Date(mainStartDate)) {
		showMessage("End date cannot be before the first day of holiday","warning");
		dozvola = 0;
	}
	if (new Date(endDate) < new Date(mainStartDate)) {
		showMessage("End date cannot be before the first day of holiday","warning");
		dozvola = 0;
	}
	if (new Date(endDate) < new Date(mainStartDate)) {
		showMessage("End date cannot be before the first day of holiday","warning");
		dozvola = 0;
	}

	if (new Date(endDate) < new Date(mainStartDate)) {
		showMessage("End date cannot be before the first day of holiday","warning");
		dozvola = 0;
	}

	if (mainEndDate != "") {
		if (new Date(startDate) > new Date(mainEndDate)) {
			showMessage("You cannot rent a car after the holiday ends!","warning");
			dozvola = 0;
		}

		if (new Date(endDate) > new Date(mainEndDate)) {
			showMessage("You cannot rent a car after the holiday ends!","warning");
			dozvola = 0;
		}

	}

	if (fromPrice < 0 || toPrice < 0) {
		dozvola = 0;
		showMessage('Prices must be positive',"warning");
	}
	if (dozvola == 1) {
		var dozvola2 = 1;
		var endCity = document.getElementById("endCity").value;
		var startCity = document.getElementById("pickupCity").value;
		var carType = document.getElementById("carType").value;
		var passengers = document.getElementById("passengers").value;
		if (startDate == "" || endDate == "" || startCity == ""
				|| endCity == "" || carType == "" || passengers == "") {
			dozvola2=0;
			showMessage('None of obligational fileds is allowed to be empty',"warning");
		}
		var fromPrice = document.getElementById("fromPrice").value;
		var toPrice = document.getElementById("toPrice").value;
		if (fromPrice == "") {
			fromPrice = -1;

		}
		if (toPrice == "") {
			toPrice = -1;
		}
		var typeOfRes=document.getElementById("typeOfRes").value;


		if (dozvola2==1){
		$
				.ajax({
					type : 'GET',
					url : urlRootFindSuitCars + "/" + rentacarId + "/"
							+ startDate + "/" + endDate + "/" + startCity + "/"
							+ endCity + "/" + carType + "/" + passengers + "/"
							+ fromPrice + "/" + toPrice,
					dataType : "json",

					headers : createAuthorizationTokenHeader(TOKEN_KEY),
					success : function(data) {

						var response = data;
					

						$("#showSuitableCars").find("tr").remove();
						var tabela = document
								.getElementById("showSuitableCars");

						console.log(tabela);
						var broj = 0;
						for ( var counter in response) {
							broj++;
							console.log('counter: ' + counter);
							var row = tabela.insertRow(counter);
							console.log(row);
							var cell1 = row.insertCell(0);
							var cell2 = row.insertCell(1);
							
							var cell3 = row.insertCell(2);
							
							var cell4 = row.insertCell(3);
							
							var cell5 = row.insertCell(4);
							var cell6 = row.insertCell(5);
							
							var cell7 = row.insertCell(6);
							
							var cell8 = row.insertCell(7);
						
							var cell9 = row.insertCell(8);
							

							var cell10 = row.insertCell(9);
							
							var cell11 = row.insertCell(10);

							cell1.innerHTML = response[counter].id;
							console.log(cell1.innerHTML);
							cell2.innerHTML = response[counter].name;
							console.log(cell2.innerHTML);
							cell3.innerHTML = response[counter].price;
							cell4.innerHTML = response[counter].year;

							cell11.innerHTML = '<button style="background: ##69a7c5; color: white"id=\"'
									+ response[counter].id
									+ '\" class=\"takeCarButton\" class="btn btn-primary">Reserve</button>';

							console.log(response[counter].carType);
							cell5.innerHTML = response[counter].carType;
							cell7.innerHTML = response[counter].brand;
							cell8.innerHTML = response[counter].model;
							cell6.innerHTML = response[counter].seats;
							var grade= response[counter].score / response[counter].number;
							if (response[counter].number==0){
								grade="No grade";
							}
							cell10.innerHTML = grade;
							cell9.innerHTML = response[counter].price * 20;

						}

						if (broj != 0) {
							var row = tabela.insertRow(0);
							var cell1 = row.insertCell(0);
							var cell2 = row.insertCell(1);
							var cell3 = row.insertCell(2);
							var cell4 = row.insertCell(3);
							var cell5 = row.insertCell(4);
							var cell6 = row.insertCell(5);
							var cell7 = row.insertCell(6);
							var cell8 = row.insertCell(7);
							var cell9 = row.insertCell(8);
							var cell10 = row.insertCell(9);
							var cell11 = row.insertCell(10);

							cell1.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Id</p>';
							cell2.innerHTML = '<p style= " font-weight: 200%; font-size:150%">Name</p>';
							;
							cell3.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Price</p>';
							;
							cell4.innerHTML = '<p style= " font-weight: 200%; font-size:150%">Year</p>';
							cell5.innerHTML = '<p style= " font-weight: 200%; font-size:150%">Car type</p>';
							cell7.innerHTML = '<p style= " font-weight: 200%; font-size:150%">Brand</p>';
							cell8.innerHTML = '<p style= " font-weight: 200%; font-size:150%">Model</p>';
							cell6.innerHTML = '<p style= " font-weight: 200%; font-size:150%">Seats</p>';
							cell10.innerHTML = '<p style= " font-weight: 200%; font-size:150%">Grade</p>';
							cell9.innerHTML = '<p style= " font-weight: 200%; font-size:150%">Total price</p>';
							;
							
							
						} else {
							
							$(".messageSuitableCarsTwo").children().remove();
							$(".messageSuitableCarsTwo")
									.append(
											'<h3>No cars found to satisfy your criteria.</p>');
							
						}

					},
					error : function(jqXHR, textStatus, errorThrown) {
						showMessage(jqXHR.status,"error");
						showMessage(textStatus,"error");
						showMessage(errorThrown,"error");
					}

				})
		}

		
	}
}

$(document).on('click','#showLocation',function(e){
	e.preventDefault();
	var modal = document.getElementById('mapModal');
	modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    var addr=$(this).attr("name");
    var coordinates;
    $.ajax({
		type : 'GET',
		url : "https://geocode-maps.yandex.ru/1.x/?apikey=18116907-79b6-47b3-97aa-0db7c335b7e0&format=json&geocode="
				+ addr + "&lang=en_US",
		dataType : "json",
		async : false,
		success : function(data) {
			var found = data.response.GeoObjectCollection.featureMember;
			if (found.length != 0) {
				coordinates = found[0].GeoObject.Point.pos.split(" ");
				ymaps.ready(init(coordinates));
			} else {
				coordinates = [ -1, -1 ];
				alert("Location could not be found. Maybe this address does not exist?");
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert(jqXHR.status);
			alert(textStatus);
			alert(errorThrown);
		}

	})
})

function takeCar(id, startDate, endDate, passengers, typeOfRes) {
	sessionStorage.removeItem("choosenSeats");


	$.ajax({
		type : 'POST',
		url : urlRootCreateCarRes + "/" + id + "/" + startDate + "/" + endDate
				+ "/" + passengers+"/"+typeOfRes,
		contentType : 'application/json',
		dataType : "json",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		success : function(data) {
			showMessage("Successful reservation of a car!","success");
			
		},
		error : function(jqXHR, textStatus, errorThrown) {
			showMessage(jqXHR.status,"error");
			showMessage(textStatus,"error");
			showMessage(errorThrown,"error");

		}
	})
}

function rentacarReservation(id) {
	sessionStorage.removeItem("choosenSeats");
}



$(document).on('submit', '#carReservationForm', function(e) {
	console.log('car reservation form submitted');
	e.preventDefault();
	sessionStorage.removeItem("choosenSeats");
	searchForCars();

});



$(document).on('click', '#BackReservationButton', function(e) {
	e.preventDefault();
	$("#pickRoomAndHcs").hide();
	$("#roomReservationStartDate").prop('disabled', false);
	$("#roomReservationEndDate").prop('disabled', false);
	$("#roomReservationLowestPrice").prop('disabled', false);
	$("#roomReservationHighestPrice").prop('disabled', false);
});

$(document).on('click', '#rentACarButton', function(e) {
	console.log('rent a car button clicked');
	// e.preventDefault();
	sessionStorage.removeItem("choosenSeats");
	$(".sortByNameRentACars").show();
	$(".sortByAddressRentACars").show();
	showRentacars("bez");

});


$(document).on('click', '.sortByAddressRentACars', function(e) {
	sessionStorage.removeItem("choosenSeats");
	showRentacars("sortByAddressRentACars");

});

$(document).on('click', '.searchRentACarButton', function(e) {

	findRentacars();
	sessionStorage.removeItem("choosenSeats");
	$(".sortByNameRentACars").hide();
	$(".sortByAddressRentACars").hide();

});


$(document).on('click', '.chooseRentacar', function(e) {
	// e.preventDefault();
	var _this = $(this);
	sessionStorage.removeItem("choosenSeats");
	var mainStartDate3 = document.getElementById("mainStartDate2").value;
	var mainEndDate3 = document.getElementById("mainEndDate2").value;
	openCity(e, 'rentacarReservation');
	$("#singleRentacar").children().remove();
	$(".messageSuitableCars").children().remove();
	$(".messageSuitableCarsTwo").children().remove();
	var rentacarId = this.id;
	document.getElementById("mainStartDate3").value = mainStartDate3
	document.getElementById("mainEndDate3").value = mainEndDate3;
	document.getElementById("rentacarId").value = rentacarId;
	document.getElementById("typeOfRes").value="1";
	
	document.getElementById("pickupDateCar").value="";
	document.getElementById("endDateCar").value="";
	document.getElementById("pickupCity").value="";
	document.getElementById("endCity").value="";
	document.getElementById("passengers").value="";
	document.getElementById("fromPrice").value="";
	document.getElementById("toPrice").value="";
	
	$("#singleRentacar").children().remove();
	$(".messageSuitableCars").children().remove();
	$(".messageSuitableCars").append('<button style=\"background: #69a7c5; color: white\" type=\"submit\" class=\"btn btn-default\" id=\"offerRentacarsButton\">Back</button>');
		$(".messageSuitableCars")
		.append(
				'<br><br><button type="submit" style="background: #69a7c5;align: center; color: white" id="offerHotelsButton" style="float: left;/">Reserve hotel</button>');
		$(".messageSuitableCars")
		.append(
				'<br><button type="submit" style="background: #69a7c5;align: center; color: white" id="finishReservation" style="float: left;/">Finish reservation </button>');

});

$(document).on('click', '.chooseRentacarSingle', function(e) {
	console.log("choose rentacar single called")
	// e.preventDefault();
	var _this = $(this);
	sessionStorage.removeItem("choosenSeats");
	console.log('car number' + '   ' + this.id);
	var rentacarId = this.id;
	openCity(e, 'rentacarReservation');
	document.getElementById("rentacarId").value = rentacarId;
	document.getElementById("typeOfRes").value="0";
	document.getElementById("pickupDateCar").value="";
	document.getElementById("endDateCar").value="";
	document.getElementById("pickupCity").value="";
	document.getElementById("endCity").value="";
	document.getElementById("passengers").value="";
	document.getElementById("fromPrice").value="";
	document.getElementById("toPrice").value="";
	$("#singleRentacar").children().remove();
	$(".messageSuitableCars").children().remove();
	$("#singleRentacar").append('<br><button type="submit" style="background: #69a7c5;align: center; color: white" id="backToSingleResList" style="float: left;/">Back</button>');

});

$(document).on('click', '#backToSingleResList', function(e) {
	document.getElementById("pickupDateCar").value="";
	document.getElementById("endDateCar").value="";
	document.getElementById("pickupCity").value="";
	document.getElementById("endCity").value="";
	document.getElementById("passengers").value="";
	document.getElementById("fromPrice").value="";
	document.getElementById("toPrice").value="";
	
	
	openCity(e, 'rentACars');
	$(".sortByNameRentACars").show();
	$(".sortByAddressRentACars").show();
	document.getElementById("nameLocationRentACar").value="";
	showRentacars("bez");
});



$(document).on('click', '.takeCarButtonFast', function(e) {

	var mainStartDate = $("#mainStartDate3").val();
	var mainEndDate = $("#mainEndDate3").val();
	var carId = this.id;
	
	var ime = "startDateFastt"+carId;
	var startDateFastt= document.getElementById(ime).innerHTML;
	console.log('start date faaast: '+startDateFastt);
	var endDateFastt= document.getElementById("endDateFastt"+carId).innerHTML;
	sessionStorage.removeItem("choosenSeats");
	openCity(e, 'fastResDateDiv');
	document.getElementById("mainStartDate").value = mainStartDate;
	document.getElementById("mainEndDate").value = mainEndDate;
	document.getElementById("carId").value = carId;
	document.getElementById("startDateFastt").value = startDateFastt;
	document.getElementById("endDateFastt").value = endDateFastt;
});


$(document).on('click', '.takeCarButton', function(e) {
	console.log('take car button  clicked');
	// e.preventDefault();
	sessionStorage.removeItem("choosenSeats");
	var startDate = document.getElementById("pickupDateCar").value;
	var endDate = document.getElementById("endDateCar").value;
	var passengers = document.getElementById("passengers").value;
	var _this = $(this);
	var typeOfRes = document.getElementById("typeOfRes").value;
	takeCar(this.id, startDate, endDate, passengers, typeOfRes);

});



function createCarResDTO(id, startDate, endDate, passengers) {
	return JSON.stringify({
		"id" : id,
		"startDate" : startDate,
		"endDate" : endDate,
		"passengers" : passengers

	})
}




$(document).on("click", "#hotelBack", function(e) {
	e.preventDefault();
	openCity(event, 'hotels')
});

$(document).on("click", "#rentacarBack", function(e) {
	e.preventDefault();
	openCity(event, 'rentACars')
});

$(document).on("click", "#backToRentacarReservation", function(e) {
	e.preventDefault();
	
	document.getElementById("pickupDateFast").value="";
	document.getElementById("endDateFast").value="";
	openCity(event, 'rentacarReservation');
	
	document.getElementById("pickupDateCar").value="";
	document.getElementById("endDateCar").value="";
	document.getElementById("pickupCity").value="";
	document.getElementById("endCity").value="";
	document.getElementById("passengers").value="";
	document.getElementById("fromPrice").value="";
	document.getElementById("toPrice").value="";
	
});

function fillTableCars(data, table) {
	var response = data;
	$("#" + table).find("tr").remove();
	var tabela = document.getElementById(table);

	var index = 0;
	for ( var counter in response) {
		var row = tabela.insertRow(counter);
		var cell0 = row.insertCell(0);
		var cell1 = row.insertCell(1);
		var cell2 = row.insertCell(2);
		var cell3 = row.insertCell(3);
		var cell4 = row.insertCell(4);
		var cell5 = row.insertCell(5);
		var cell6 = row.insertCell(6);
		var cell7 = row.insertCell(7);
		var cell8 = row.insertCell(8);
		var cell9 = row.insertCell(9);

		cell0.innerHTML = ++index;
		cell1.innerHTML = response[counter].rentacar.name;
		cell2.innerHTML = response[counter].name;
		cell3.innerHTML = response[counter].price;
		cell4.innerHTML = response[counter].year;
		cell5.innerHTML = response[counter].seats;
		cell6.innerHTML = response[counter].carType;
		cell7.innerHTML = response[counter].brand;
		cell8.innerHTML = response[counter].model;
		cell9.innerHTML = response[counter].score;

	}
	var row = tabela.insertRow(0);
	var cell0 = row.insertCell(0);
	var cell1 = row.insertCell(1);
	var cell2 = row.insertCell(2);
	var cell3 = row.insertCell(3);
	var cell4 = row.insertCell(4);
	var cell5 = row.insertCell(5);
	var cell6 = row.insertCell(6);
	var cell7 = row.insertCell(7);
	var cell8 = row.insertCell(8);
	var cell9 = row.insertCell(9);

	cell0.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">#</p>';
	cell1.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Rentacar it belongs to</p>';
	cell2.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Name</p';
	cell3.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Price</p>';
	cell4.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Car year</p>';
	cell5.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Number of seats</p>';
	cell6.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Car type</p';
	cell7.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Brand</p>';
	cell8.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Model</p>';
	cell9.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Grade</p>';
}

