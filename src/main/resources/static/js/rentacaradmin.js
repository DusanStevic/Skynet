var urlRoot1 = "http://localhost:8080/api/myRAC";
var urlRoot2 = "http://localhost:8080/api/saveRAC";
var urlRoot3 = "http://localhost:8080/api/addCar";
var urlRoot4 = "http://localhost:8080/api/getCars";
var urlRoot5 = "http://localhost:8080/api/deleteCar";
var urlRoot6 = "http://localhost:8080/api/findCar";
var urlRoot7 = "http://localhost:8080/api/saveEditedCar";
var urlRootCreateBranch="http://localhost:8080/api/createBranch";
var urlRootShowBranches = "http://localhost:8080/api/getBranches";
var urlRootDeleteBranch= "http://localhost:8080/api/deleteBranch";
var urlRootSaveEditedBranch="http://localhost:8080/api/saveEditedBranch";
var urlRootFindBranch = "http://localhost:8080/api/findBranch";
var urlRootPutCarOnFastRes="http://localhost:8080/api/putCarOnFastRes";
var urlRootFindSuitCarsFast =  "http://localhost:8080/api/findSuitCarsFast";
var urlRootReportRentacarAttendance="http://localhost:8080/api/reportRentacarAttendance";
var urlRootFindRentacarAmount="http://localhost:8080/api/findRentacarAmount";
var showCarsOnFastRes="http://localhost:8080/showCarsOnFastRes";
var urlRootDeleteCarOnFast="http://localhost:8080/removeCarOnFastRes";


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

$(document).on('click', '#editRentacarButton', function(e) {
	findRentacar();
});


$(document).on('click', '#findAmountRentacar', function(e) {
	e.preventDefault();
	var startDate = document.getElementById("amountSearchStartDate").value;
	var endDate = document.getElementById("amountSearchEndDate").value;
	if (startDate == "") {
		startDate = "0000-00-00"
	}
	if (endDate == "") {
		endDate = "0000-00-00"
	}
	var finalPath = urlRootFindRentacarAmount + "/" + startDate + "/" + endDate;
	$.ajax({
		type : 'GET',
		url : finalPath,
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType : "json",
		success : function(data) {
			$("#amountRentacarValue").html(data.toFixed(2));
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert(jqXHR.status);
			alert(textStatus);
			alert(errorThrown);
		}

	})

});

function saveSubmitFast(id){
	console.log('save submit fast called '+id);
	var startDate=document.getElementById("startDateFast").value;
	var endDate=document.getElementById("endDateFast").value;
	var price=document.getElementById("priceFast").value;
	
	
	console.log(startDate);
	console.log(endDate);
	console.log(price);
	
	if (startDate=="" || endDate == "" || price==""){
		showMessage('None of the fields is allowed to be empty',"warning");
	}else if (price < 0){
		showMessage('Price is not allowed to be null',"warning");
	}else if(new Date > new Date(startDate) || new Date() > new Date(endDate)) {
		showMessage('Date is not allowed to be in the past',"warning");
	}else {
		$.ajax({
			type : 'PUT',
			url : urlRootPutCarOnFastRes+"/"+id+"/"+startDate+"/"+endDate+"/"+price,
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			dataType : "json",
			success : function(data) {
				
					if (data.message != undefined) {
						showMessage(data.message,"warning");
					}else{
						showMessage("successful","success");
						document.getElementById("priceFast").value="";
						document.getElementById("endDateFast").value="";
						document.getElementById("startDateFast").value="";
						
						
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

function showGrades(){
	
	
	$
	.ajax({
		type : 'GET',
		url : urlRoot1,
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType : "json",
		success : function(data) {
			$("#globalScore").append('<h2>Global score: '+data.score/data.number+'</h2>')
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert(jqXHR.status);
			alert(textStatus);
			alert(errorThrown);
		}
		
	})
		$.ajax({
			type : 'GET',
			url : urlRoot4,
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			dataType : "json",
			success : function(data) {

				var response = data;
				$("#messageCarsGrades").children().remove();

				$("#carsGradesTable").find("tr").remove();
				
				var tabela= document.getElementById("carsGradesTable");
				

				console.log(tabela);
				var broj = 0;
				for ( var counter in response) {
					broj++;
					console.log('counter: ' + counter);
					var row = tabela.insertRow(counter);
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					

					cell1.innerHTML = response[counter].name;
					cell2.innerHTML = response[counter].score/response[counter].number;
					

				}

				if (broj != 0) {
					var row = tabela.insertRow(0);
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					

					cell1.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Name</p>';
					cell2.innerHTML = '<p style= " font-weight: 200%; font-size:150%">Average grade</p>';
					
				}else {
					$("#messageCarsGrades").append("<h2>No cars found</h2>");
				}
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert(jqXHR.status);
				alert(textStatus);
				alert(errorThrown);
			}

	})
	$.ajax({
		type : 'GET',
		url : urlRootReportRentacarAttendance,
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType : "json",
		success : function(data) {
			createChart("myChart1", data.dailyLabels, data.dailyValues)
			createChart("myChart2", data.weeklyLabels, data.weeklyValues)
			createChart("myChart3", data.monthlyLabels, data.monthlyValues)
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert(jqXHR.status);
			alert(textStatus);
			alert(errorThrown);
		}

	})
	
}

function createChart(canvasId, labelNames, data) {
	var ctx = document.getElementById(canvasId).getContext('2d');
	var myChart = new Chart(ctx, {
		type : 'bar',
		data : {
			labels : labelNames,
			datasets : [ {
				label : 'attendance',
				data : data,
				backgroundColor : Array(data.length).fill(' #0099ff'),
				borderColor : Array(data.length).fill('black'),
				borderWidth : 1
			} ]
		},
		options : {
			scales : {
				yAxes : [ {
					ticks : {
						beginAtZero : true
					}
				} ]
			}
		}
	});
}




function saveEditedCar() {
	console.log('save edited car called');
	var id = document.getElementById("carIdEdit").value;
	var name = document.getElementById("carNameEdit").value;
	var price = document.getElementById("carPriceEdit").value;
	var year = document.getElementById("carYearEdit").value;
	var carType = document.getElementById("editCarType").value;
	var brand = document.getElementById("carBrandEdit").value;
	var model = document.getElementById("carModelEdit").value;
	var seats = document.getElementById("carSeatsEdit").value;
	console.log(name + ' ' + price + ' ' + year);

	if (name == "" || price == "" || year == "" || brand=="" || model=="" || seats=="") {
		showMessage('None of the fields is allowed to be empty!',"warning");
	} else if (price <= 0) {
		showMessage('Price of car must be positive number!',"warning");
	} else if (year < 1900 || year > 2019) {
		showMessage('Year must be in a range [1900, 2019] !',"warning");
	} else if (seats < 0) {
		showMessage('Number of seats must be postiive !',"warning");
	} else {

		$.ajax({
			type : 'PUT',
			url : urlRoot7,
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			data : carToJson(id, name, price, year, carType, brand, model, seats),
			dataType : "json",
			contentType : 'application/json',
			success : function(data) {
				showMessage("Car successfully edited, congratulations!","success");
				showCars("forEdit");

			},
			error : function(jqXHR, textStatus, errorThrown) {
				showMessage(jqXHR.status,"error");
				showMessage(textStatus,"error");
				showMessage(errorThrown,"error");

			}

		})

	}

}

function saveEditedBranch() {
	console.log('save edited branch called');
	var id = document.getElementById("branchIdEdit").value;
	var branchCityEdit = document.getElementById("branchCityEdit").value;
	var branchAddressEdit = document.getElementById("branchAddressEdit").value;
	

	if (branchCityEdit == "" || branchAddressEdit == "" ) {
		showMessage('None of the fields is allowed to be empty!',"warning");
	}  else {

		$.ajax({
			type : 'PUT',
			url : urlRootSaveEditedBranch,
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			data : createBranchDTO(id, branchCityEdit, branchAddressEdit),
			dataType : "json",
			contentType : 'application/json',
			success : function(data) {
				
				showBranches("branchesForEdit");

			},
			error : function(jqXHR, textStatus, errorThrown) {
				showMessage(jqXHR.status,"error");
				showMessage(textStatus,"error");
				showMessage(errorThrown,"error");

			}

		})

	}

}

function editCar(carId) {
	console.log('Edit cars called');

	urlRoot6 = urlRoot6 + "/" + carId;
	$.ajax({
		type : 'GET',
		url : urlRoot6,
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType : "json",
		success : function(data) {
			if (data == null) {
				console.log('Car not found');

			} else {

				document.getElementById("carIdEdit").value = data.id;
				document.getElementById("carNameEdit").value = data.name;
				document.getElementById("carPriceEdit").value = data.price;
				document.getElementById("carYearEdit").value = data.year;
				document.getElementById("carBrandEdit").value = data.brand;
				document.getElementById("carModelEdit").value = data.model;
				document.getElementById("carSeatsEdit").value = data.seats;
				console.log('Car successfully edited.');

			}

			urlRoot6 = "http://localhost:8080/findCar";
			showCars("forEdit");
		},
		error : function(jqXHR, textStatus, errorThrown) {
			showMessage(jqXHR.status,"error");
			showMessage(textStatus,"error");
			showMessage(errorThrown,"error");

		}

	})

}

function editBranch(id) {
	console.log('Edit branch called');
	
	$.ajax({
		type : 'GET',
		url : urlRootFindBranch+"/"+id,
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		dataType : "json",
		success : function(data) {
			if (data == null) {
				console.log('Branch not found');

			} else {

				document.getElementById("branchCityEdit").value = data.city;
				document.getElementById("branchAddressEdit").value = data.address;
				document.getElementById("branchIdEdit").value = data.id;
				
				
			}

			
			showBranches("branchesForEdit");
		},
		error : function(jqXHR, textStatus, errorThrown) {
			showMessage(jqXHR.status,"error");
			showMessage(textStatus,"error");
			showMessage(errorThrown,"error");

		}

	})

}

function deleteCarOnFastRes(carId) {
	console.log('Delete car on fast res called');

	
	$.ajax({
		type : 'PUT',
		url : urlRootDeleteCarOnFast+"/"+carId,
		dataType: "json",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		success : function(data) {
			if (data.message != undefined) {
				showMessage(data.message,"warning");
			}  else {
				showMessage('Car is no longer on fast reservation!.',"success");
			}

			
			showCarsOnFastReservation();

		},
		error : function(jqXHR, textStatus, errorThrown) {
			showMessage(jqXHR.status,"error");
			showMessage(textStatus,"error");
			showMessage(errorThrown,"error");

		}

	})

}


function deleteCar(carId) {
	console.log('Delete cars called');

	urlRoot5 = urlRoot5 + "/" + carId;
	$.ajax({
		type : 'DELETE',
		url : urlRoot5,
		dataType: "json",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		success : function(data) {
			if (data.message != undefined) {
				showMessage(data.message,"warning");
			}  else {
				showMessage('Car successfully deleted.',"success");
			}

			urlRoot5 = "http://localhost:8080/deleteCar";
			showCars("forDelete");

		},
		error : function(jqXHR, textStatus, errorThrown) {
			showMessage(jqXHR.status,"error");
			showMessage(textStatus,"error");
			showMessage(errorThrown,"error");

		}

	})

}

function deleteBranch(id){
	console.log('Delete branch called');

	
	$.ajax({
		type : 'DELETE',
		url : urlRootDeleteBranch+"/"+id,
		dataType : "json",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		success : function(data) {
			if (data == null) {
				console.log('Branch not found');
			} else {
				console.log('Branch successfully deleted.');
			}

			
			showBranches("branchesForDelete");

		},
		error : function(jqXHR, textStatus, errorThrown) {
			showMessage(jqXHR.status,"error");
			showMessage(textStatus,"error");
			showMessage(errorThrown,"error");

		}

	})
}

function findRentacar() {
	$
			.ajax({
				type : 'GET',
				url : urlRoot1,
				headers : createAuthorizationTokenHeader(TOKEN_KEY),
				dataType : "json",
				success : function(data) {
					if (data == null) {
						console.log('profile not found');
					} else {
						document.getElementById("rentacarNameEdit").value = data.name;
						document.getElementById("rentacarAddressEdit").value = data.address;
						document.getElementById("rentacarCityEdit").value = data.city;
						document
								.getElementById("rentacarPromotionalDescriptionEdit").value = data.promotionalDescription;
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					showMessage(jqXHR.status,"error");
					showMessage(textStatus,"error");
					showMessage(errorThrown,"error");
				}

			})

}

$(document)
		.on(
				"submit",
				"#form1",
				function(e) {
					e.preventDefault();
					var name = document.getElementById("rentacarNameEdit").value;
					var address = document
							.getElementById("rentacarAddressEdit").value;
					var city = document
					.getElementById("rentacarCityEdit").value;
					var promotionalDescription = document
							.getElementById("rentacarPromotionalDescriptionEdit").value;

					if (name == "" || address == ""
							|| promotionalDescription == "" || city=="") {
						showMessage('None of the fields is allowed to be empty!',"warning");
					} else {

						$
								.ajax({
									type : 'PUT',
									url : urlRoot2,
									headers : createAuthorizationTokenHeader(TOKEN_KEY),
									data : rentACarToJson(name, address,
											promotionalDescription, city),
									dataType : "json",
									contentType : 'application/json',
									success : function(data) {
										showMessage("Successful editing!","success");

									},
									error : function(jqXHR, textStatus, errorThrown) {
										showMessage(jqXHR.status,"error");
										showMessage(textStatus,"error");
										showMessage(errorThrown,"error");
									}

								})
					}

				});

function showCarsOnFastReservation(){
	console.log('showing cars on fast reservation');
	
	$
	.ajax({
		type : 'GET',
		url : showCarsOnFastRes,
		dataType : "json",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		success : function(data) {

			var response = data;
			$(".message").children().remove();
								
			
			$("#tableOfCarsOnFastRes").find("tr").remove();
			var	tabela = document.getElementById("tableOfCarsOnFastRes");
			
			var broj = 0;
			for ( var counter in response) {
				broj++;
				
				var row = tabela.insertRow(counter);
				
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				var cell6 = row.insertCell(5);
				var cell7 = row.insertCell(6);
				var cell8 = row.insertCell(7);
				var cell9 = row.insertCell(8);

				cell1.innerHTML = response[counter].id;
				cell2.innerHTML = response[counter].name;
				cell3.innerHTML = response[counter].price;
				cell4.innerHTML = response[counter].year;
				
				cell9.innerHTML = '<button style="background: #69a7c5; color: white"id=\"'
							+ response[counter].id
							+ '\" class=\"deleteCarOnFastResButton\" class="btn btn-primary">Delete</button>';
				
				
				cell5.innerHTML = response[counter].carType;
				cell7.innerHTML = response[counter].brand;
				cell8.innerHTML = response[counter].model;
				cell6.innerHTML = response[counter].seats;

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
				;
			} else {
				$(".message").append('<h3>No cars on fast reservation.</p>')
			}

		},
		error : function(jqXHR, textStatus, errorThrown) {
			showMessage(jqXHR.status,"error");
			showMessage(textStatus,"error");
			showMessage(errorThrown,"error");
		}

	})
}
function showCars(type) {
	console.log('show cars for deleting called');

	$
			.ajax({
				type : 'GET',
				url : urlRoot4,
				dataType : "json",
				headers : createAuthorizationTokenHeader(TOKEN_KEY),
				success : function(data) {

					var response = data;
					$(".message").children().remove();
										
					$("#tableOfCarsForDelete").find("tr").remove();
					$("#tableOfCarsForEdit").find("tr").remove();
					$("#tableOfCarsForFastRes").find("tr").remove();
					var tabela;
					if (type == "forDelete") {
						tabela = document
								.getElementById("tableOfCarsForDelete");
					} else if (type=="forEdit"){
						tabela = document.getElementById("tableOfCarsForEdit");
					}else {
						tabela = document.getElementById("tableOfCarsForFastRes");
					}

					console.log(tabela);
					var broj = 0;
					for ( var counter in response) {
						broj++;
						console.log('counter: ' + counter);
						var row = tabela.insertRow(counter);
						console.log(row);
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						cell2.id = "name";
						var cell3 = row.insertCell(2);
						cell3.id = "price";
						var cell4 = row.insertCell(3);
						cell3.id = "year";
						var cell5 = row.insertCell(4);
						var cell6 = row.insertCell(5);
						cell5.id="carType";
						var cell7 = row.insertCell(6);
						cell7.id="brand";
						var cell8 = row.insertCell(7);
						cell8.id="model";
						var cell9 = row.insertCell(8);
						cell6.id="seats";

						cell1.innerHTML = response[counter].id;
						cell2.innerHTML = response[counter].name;
						console.log(cell2.innerHTML);
						cell3.innerHTML = response[counter].price;
						cell4.innerHTML = response[counter].year;
						if (type == "forDelete") {
							cell9.innerHTML = '<button style="background: #69a7c5; color: white"id=\"'
									+ response[counter].id
									+ '\" class=\"deleteCarButton\" class="btn btn-primary">Delete</button>';
						} else if (type == "forEdit") {
							cell9.innerHTML = '<button style="background: #69a7c5; color: white" id=\"'
									+ response[counter].id
									+ '\" class=\"editCarButton\" class="btn btn-primary" >Edit</button>';
						} else if (type=="forFastRes"){
							cell9.innerHTML = '<button style="background: #69a7c5; color: white" id=\"'
								+ response[counter].id
								+ '\" class=\"fastResCarButton\" class="btn btn-primary" >Choose</button>';
						}
						console.log(response[counter].carType);
						cell5.innerHTML = response[counter].carType;
						cell7.innerHTML = response[counter].brand;
						cell8.innerHTML = response[counter].model;
						cell6.innerHTML = response[counter].seats;

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
						;
					} 

				},
				error : function(jqXHR, textStatus, errorThrown) {
					showMessage(jqXHR.status,"error");
					showMessage(textStatus,"error");
					showMessage(errorThrown,"error");
				}

			})
}


function showBranches(type) {
	console.log('show branches called');

	$
			.ajax({
				type : 'GET',
				url : urlRootShowBranches,
				dataType : "json",
				headers : createAuthorizationTokenHeader(TOKEN_KEY),
				success : function(data) {

					var response = data;
					$(".messageBranchesDelete").children().remove();

					$("#tableOfBranchesForDelete").find("tr").remove();
					$("#tableOfBranchesForEdit").find("tr").remove();
					var tabela;
					if (type == "branchesForDelete") {
						tabela = document
								.getElementById("tableOfBranchesForDelete");
					} else {
						tabela = document.getElementById("tableOfBranchesForEdit");
					}

					console.log(tabela);
					var broj = 0;
					for ( var counter in response) {
						broj++;
						console.log('counter: ' + counter);
						var row = tabela.insertRow(counter);
						console.log(row);
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						cell2.id = "city";
						var cell3 = row.insertCell(2);
						cell3.id = "address";
						var cell4 = row.insertCell(3);


						cell1.innerHTML = response[counter].id;
						cell2.innerHTML = response[counter].city;
						cell3.innerHTML = response[counter].address;
						
						if (type == "branchesForDelete") {
							cell4.innerHTML = '<button style="background: #69a7c5; color: white"id=\"'
									+ response[counter].id
									+ '\" class=\"deleteBranchButton\" class="btn btn-primary">Delete</button>';
						} else if (type == "branchesForEdit") {
							cell4.innerHTML = '<button style="background: #69a7c5; color: white" id=\"'
									+ response[counter].id
									+ '\" class=\"editBranchButton\" class="btn btn-primary" >Edit</button>';
						}
					

					}

					if (broj != 0) {
						var row = tabela.insertRow(0);
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						var cell3 = row.insertCell(2);
						var cell4 = row.insertCell(3);
						

						cell1.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Id</p>';
						cell2.innerHTML = '<p style= " font-weight: 200%; font-size:150%">City</p>';
						;
						cell3.innerHTML = '<p style= "font-weight: 200%; font-size:150%">Address</p>';
						;
						
						
					}

				},
				error : function(jqXHR, textStatus, errorThrown) {
					showMessage(jqXHR.status,"error");
					showMessage(textStatus,"error");
					showMessage(errorThrown,"error");
				}

			})
}
$(document).on("click", "#removeCarsButton", function(e) {

	showCars("forDelete");
})

$(document).on("click", "#editCarsButton", function(e) {

	showCars("forEdit");
})

$(document).on("submit", "#form2", function(e) {
	e.preventDefault();

	var name = document.getElementById("addCarName").value;
	var price = document.getElementById("addCarPrice").value;
	var year = document.getElementById("addCarYear").value;
	var carType = document.getElementById("addCarType").value;
	var brand = document.getElementById("addCarBrand").value;
	var model = document.getElementById("addCarModel").value;
	var seats = document.getElementById("addCarSeats").value;
	console.log("Car type:"+carType);
	if (name == "" || price == "" || year == "" || brand=="" || model=="" || seats=="") {
		showMessage('None of the fields is allowed to be empty!',"warning");
	} else if (price <= 0) {
		showMessage('Price of car must be positive number!',"warning");
	} else if (year < 1900 || year > 2019) {
		showMessage('Year must be in a range [1900, 2019] !',"warning");
	} else if (seats<0) {
		showMessage('Number of seats must be positive number !',"warning");
	}else {

		$.ajax({
			type : 'POST',
			url : urlRoot3,
			contentType : 'application/json',
			dataType : "json",
			data : createCarDTOToJson(name, price, year, carType, brand, model, seats),
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			success : function(data) {
				showMessage("Successful adding car, congratulations!","success");
				document.getElementById("addCarName").value = "";
				document.getElementById("addCarPrice").value = "";
				document.getElementById("addCarYear").value = "";
				document.getElementById("addCarBrand").value = "";
				document.getElementById("addCarModel").value = "";
				document.getElementById("addCarSeats").value = "";
				openCity(e, 'addCar');
			},
			error : function(jqXHR, textStatus, errorThrown) {
				showMessage(jqXHR.status,"error");
				showMessage(textStatus,"error");
				showMessage(errorThrown,"error");

			}
		})
	}

})

function saveBranch(){
	console.log('save branch called');
	
	var branchCity = document.getElementById("branchCity").value
	var branchAddress = document.getElementById("branchAddress").value
	
	if (branchCity=="" || branchAddress==""){
		showMessage('Branch city and branch address cannot be empty',"warning");
	}else {
		console.log(branchCity + ' '+ branchAddress);

		$.ajax({
			type : 'POST',
			url : urlRootCreateBranch,
			contentType : 'application/json',
			dataType : "json",
			data : createBranchDTO(1, branchCity, branchAddress),
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			success : function(data) {
				showMessage("Successful adding car, congratulations!","success");
				document.getElementById("branchCity").value = "";
				document.getElementById("branchAddress").value = "";
				
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				showMessage(jqXHR.status,"error");
				showMessage(textStatus,"error");
				showMessage(errorThrown,"error");

			}
		})
	}
}

function createBranchDTO(id, city, address){
	return JSON.stringify({
		"id": id,
		"city" : city,
		"address" : address
		
	})
}

function rentACarToJson(name, address, promotionalDescription, city) {
	return JSON.stringify({
		"rentacarNameRegister" : name,
		"rentacarAddressRegister" : address,
		"rentacarPromotionalDescription" : promotionalDescription,
		"city": city,
	})
}

function carToJson(id, name, price, year, carType, brand, model, seats) {
	return JSON.stringify({
		"id" : id,
		"name" : name,
		"price" : price,
		"year" : year,
		"carType": carType,
		"brand": brand,
		"model": model,
		"seats": seats
	})
}

function createCarDTOToJson(name, price, year, carType, brand, model, seats) {
	return JSON.stringify({
		"name" : name,
		"price" : price,
		"year" : year,
		"carType": carType,
		"brand": brand,
		"model": model,
		"seats": seats

	})
}

$(document).on('click', '.deleteCarButton', function(e) {
	// e.preventDefault();
	var _this = $(this);
	console.log('car number' + '   ' + this.id);
	deleteCar(this.id);

});

$(document).on('click', '.deleteCarOnFastResButton', function(e) {
	// e.preventDefault();
	var _this = $(this);
	deleteCarOnFastRes(this.id);

});

$(document).on('click', '.editCarButton', function(e) {
	// e.preventDefault();
	var _this = $(this);

	console.log('car number' + '   ' + this.id);
	openCity(e, 'editCarFormular');
	editCar(this.id);

});

$(document).on('submit', '#editCarForm', function(e) {
	e.preventDefault();

	saveEditedCar();
	openCity(e, 'editCar');
	showCars('forEdit');

});


$(document).on('submit', '#addBranchForm', function(e) {
	e.preventDefault();
	saveBranch();
	openCity(e, 'addBranch');

});




$(document).on('click', '#removeBranchesButton', function(e) {
	e.preventDefault();

	showBranches("branchesForDelete");

});

$(document).on('click', '#editBranchesButton', function(e) {
	e.preventDefault();

	showBranches("branchesForEdit");

});


$(document).on('click', '.deleteBranchButton', function(e) {
	var _this = $(this);
	deleteBranch(this.id);

});
$(document).on('click', '.editBranchButton', function(e) {
	var _this = $(this);
	openCity(e, "editBranchFormular");
	editBranch(this.id);

});


$(document).on('click', '#buttonSubmitEditBranch', function(e) {
	var _this = $(this);
	
	saveEditedBranch(this.id);
	openCity(e, 'editBranch');
	showBranches("branchesForEdit");
	

});


$(document).on('click', '#reportsButton', function(e) {
	console.log('reports button clicked');
	openCity(e, 'reports');
	
	showGrades();
	

});


$(document).on('click', '#fastResButton', function(e) {
	console.log('fast res button clicked');
	
	openCity(e, 'fastRes');
	
	showCars("forFastRes");
	

});



$(document).on('click', '#backToFastResCars', function(e) {
	console.log('fast res button clicked');
	document.getElementById("priceFast").value="";
	document.getElementById("endDateFast").value="";
	document.getElementById("startDateFast").value="";
	openCity(e, 'fastRes');
	
	showCars("forFastRes");
	

});
$(document).on('click', '.fastResCarButton', function(e) {
	console.log('fast res car button clicked');
	var idCar = this.id
	openCity(e, 'fastResFormular');
	document.getElementById("priceFast").value="";
	document.getElementById("endDateFast").value="";
	document.getElementById("startDateFast").value="";
	document.getElementById("carId").value = idCar;
	
	

});


$(document).on('click', '#submitFastFormular', function(e) {
	console.log('button submit fast formular clicked');
	saveSubmitFast(document.getElementById("carId").value);
});



$(document).on('click', '#showCarsOnFastResButton', function(e) {
	openCity(e, 'carsOnFastRes');
	showCarsOnFastReservation();
});


