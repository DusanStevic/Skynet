var urlShowRentacars = "http://localhost:8080/showRentACars";
var urlFindRentacars = "http://localhost:8080/findRentacars";
var urlRootFindSuitCars = "http://localhost:8080/findSuitCars";
var urlRootGetAllCars = "http://localhost:8080/getAllCars";
var urlRootCreateCarRes = "http://localhost:8080/createCarReservation";
var urlRootCancelCarRes = "http://localhost:8080/cancelCarReservation";
var urlRootGetMyResCars = "http://localhost:8080/getMyResCars";
var urlRootFindRentacarFromRes = "http://localhost:8080/findRentacarFromRes";
var urlRootFindCarFromRes = "http://localhost:8080/findCarFromRes";
var urlRootGradeRentacar = "http://localhost:8080/gradeRentacar";
var urlRootGradeCar = "http://localhost:8080/gradeCar"
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





function saveGradedRentacar() {
	console.log('save graded rentacar called');
	sessionStorage.removeItem("choosenSeats");
	var rentacarId = document.getElementById("rentacarId").value;
	var carId = document.getElementById("carId").value
	var rentacarGrade = document.getElementById("rentacarGrade").value;
	var carGrade = document.getElementById("carGrade").value;

	console.log(rentacarId);
	console.log(carId);
	console.log(rentacarGrade);
	console.log(carGrade);

	if (rentacarGrade != "") {
		console.log('rentacar grade nije 0');
		if (rentacarGrade < 1 || rentacarGrade > 5) {
			showMessage('Grade must be between 1 and 5',"warning");
		} else {
			$.ajax({
				type : 'GET',
				url : urlRootGradeRentacar + "/" + rentacarId + "/"
						+ rentacarGrade,
				headers : createAuthorizationTokenHeader(TOKEN_KEY),
				dataType : "json",
				success : function(data) {
					showMessage('rentacar successfully graded',"success");
				},
				error : function(jqXHR, textStatus, errorThrown) {
					showMessage(jqXHR.status,"error");
					showMessage(textStatus,"error");
					showMessage(errorThrown,"error");
				}

			})
		}
	}

	if (carGrade != "") {
		console.log('car grade nije 0');
		if (carGrade < 1 || carGrade > 5) {
			showMessage('Grade must be between 1 and 5',"warning");
		} else {
			$.ajax({
				type : 'GET',
				url : urlRootGradeCar + "/" + carId + "/" + carGrade,
				headers : createAuthorizationTokenHeader(TOKEN_KEY),
				dataType : "json",
				success : function(data) {
					showMessage('car successfully graded',"success");
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
function fillGradeRentacarForm(id) {
	console.log('fill grade rentacar form');
	sessionStorage.removeItem("choosenSeats");
	var rentacarName;
	var carName;
	var tabela=document.getElementById("gradeRentacarTable");
	$("#gradeRentacarTable").find("tr").remove();
	var row = tabela.insertRow(0);
	$.ajax({
		type : 'GET',
		url : urlRootFindRentacarFromRes + "/" + id,
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType : "json",
		success : function(data) {

			console.log(data.name);
			rentacarName = data.name;
			$("#rentacarGradeName").append(
					'<h2>Rentacar ' + rentacarName + '</h2>');
			document.getElementById("rentacarId").value = data.id;
			
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML ='<h2>Rentacar: ' + rentacarName + '</h2>';
			cell2.innerHTML ='<td><input type="number" name="" value=""  id="rentacarGrade" /></td>'
			

		},
		error : function(jqXHR, textStatus, errorThrown) {
			showMessage(jqXHR.status,"error");
			showMessage(textStatus,"error");
			showMessage(errorThrown,"error");
		}

	})

	var row2 = tabela.insertRow(1);
	$.ajax({
		type : 'GET',
		url : urlRootFindCarFromRes + "/" + id,
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType : "json",
		success : function(data) {
			console.log(data.name);
			carName = data.name;
			
			document.getElementById("carId").value = data.id;
			var cell1 = row2.insertCell(0);
			var cell2 = row2.insertCell(1);
			cell1.innerHTML ='<h2>Rentacar: ' + carName + '</h2>';
			cell2.innerHTML ='<td><input type="number" name="" value="" id="carGrade" /></td>'

		},
		error : function(jqXHR, textStatus, errorThrown) {
			showMessage(jqXHR.status,"error");
			showMessage(textStatus,"error");
			showMessage(errorThrown,"error");
		}

	})

}

function cancelCarReservation(id) {
	console.log('cancel car resrvation called');
	console.log(id);

	sessionStorage.removeItem("choosenSeats");
	$.ajax({
		type : 'DELETE',
		url : urlRootCancelCarRes + "/" + id,
		dataType : "json",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		success : function(data) {

			showMessage('Reservation successfully deleted.',"success");

			showMyReservationsCars();

		},
		error : function(jqXHR, textStatus, errorThrown) {
			showMessage(jqXHR.status,"error");
			showMessage(textStatus,"error");
			showMessage(errorThrown,"error");
		}

	})

}
function showMyReservationsCars() {
	console.log('show my reservations cars called');
	sessionStorage.removeItem("choosenSeats");
	$
			.ajax({
				type : 'GET',
				url : urlRootGetMyResCars,
				headers : createAuthorizationTokenHeader(TOKEN_KEY),
				contentType : 'application/json',
				success : function(data) {
					$("#tableOfRentacarsRes").find("tr").remove();
					var list = data == null ? []
							: (data instanceof Array ? data : [ data ]);
					if (list.length > 0) {

						var tabela = document
								.getElementById("tableOfRentacarsRes");
						var count = 1
						for ( var res in list) {
							console.log('counter: ' + res);
							var row = tabela.insertRow(res);
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
							
							var oneDay = 24*60*60*1000;
							var days = Math.round(Math.abs((new Date(list[res].endDate).getTime() - new Date(list[res].startDate).getTime())/(oneDay)));
							console.log("days"+days);
							if (days==0){
								days=1;
							}
							
							cell1.innerHTML = list[res].id;
							cell2.innerHTML = new Date(list[res].startDate).toLocaleString();
							cell3.innerHTML = new Date(list[res].endDate).toLocaleString();
							cell4.innerHTML = list[res].numOfPass;
							cell5.innerHTML = list[res].car.name;
							cell6.innerHTML = list[res].rentacarRes.name;
							cell7.innerHTML=Math.round(list[res].price*(list[res].discount+100)/100);
							var discount=0;
							if (list[res].discount!=null){
								discount=list[res].discount;
							}
							cell8.innerHTML=discount+"%";
							cell9.innerHTML=list[res].price;
							cell10.innerHTML=Math.round(days*list[res].price);
							
							var ms = new Date().getTime() + 2*86400000;
							var granica = new Date(ms);
							
							if (new Date(list[res].startDate) >=granica) {
								cell11.innerHTML = '<button style="background: #69a7c5; color: white" id=\"'
										+ list[res].id
										+ '\" class=\"cancelCarResButton\" class="btn btn-primary">Cancel reservation</button>';
							} else if (new Date(list[res].endDate) < new Date()) {
								cell11.innerHTML = '<button style="background: #69a7c5; color: white" id=\"'
										+ list[res].id
										+ '\" class=\"gradeCarResButton\" class="btn btn-primary">Grade service</button>';
							} else {
								cell11.innerHTML = "Cannot cancel";
							}

							count++;

						}
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
						
						
						cell1.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Id</p>';
						cell2.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Start date</p>';
						cell3.innerHTML = '<p style= "font-weight: 200%; font-size:150%">End date</p>';
						cell4.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Num of pass</p>';
						cell5.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Car name</p>';
						cell6.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Rentacar name</p>';
						cell7.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Regular per day</p>';
						cell8.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Discount</p>';
						cell9.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Your price per day</p>';
						cell10.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Total price</p>';
						
					} 
				},
				error : function(jqXHR, textStatus, errorThrown) {
					showMessage(jqXHR.status,"error");
					showMessage(textStatus,"error");
					showMessage(errorThrown,"error");

				}
			})
}






$(document).on('click', '#allReservationsButtton', function(e) {
	console.log('all reservations button clicked');
	e.preventDefault();
	sessionStorage.removeItem("choosenSeats");
	showMyReservationsCars();

});

$(document).on('click', '.gradeCarResButton', function(e) {
	console.log('grade car res button clicked');
	e.preventDefault();
	sessionStorage.removeItem("choosenSeats");
	openCity(e, 'gradeRentacar');
	fillGradeRentacarForm(this.id);

});


$(document).on('click', '.cancelCarResButton', function(e) {
	console.log('cancel car reservation button clicked');
	e.preventDefault();
	sessionStorage.removeItem("choosenSeats");
	cancelCarReservation(this.id);
});



$(document).on('click', '#submitRentacarGrade', function(e) {
	console.log('submit rentacar grade clicked');
	e.preventDefault();
	sessionStorage.removeItem("choosenSeats");
	saveGradedRentacar();
});



