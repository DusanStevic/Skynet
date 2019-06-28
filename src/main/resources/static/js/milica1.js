var urlRoot18 = "http://localhost:8080/searchCarUnregistered";

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

		cell0.innerHTML = response[counter].name;
		cell1.innerHTML = response[counter].price;
		cell2.innerHTML = response[counter].year;
		cell3.innerHTML = response[counter].seats;
		cell4.innerHTML = response[counter].carType;
		cell5.innerHTML = response[counter].brand;
		cell6.innerHTML = response[counter].model;

	}
	var row = tabela.insertRow(0);
	var cell0 = row.insertCell(0);
	var cell1 = row.insertCell(1);
	var cell2 = row.insertCell(2);
	var cell3 = row.insertCell(3);
	var cell4 = row.insertCell(4);
	var cell5 = row.insertCell(5);
	var cell6 = row.insertCell(6);

	cell0.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Name</p';
	cell1.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Price</p>';
	cell2.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Year</p>';
	cell3.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Seats</p>';
	cell4.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Car type</p';
	cell5.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Brand</p>';
	cell6.innerHTML = '<p style= "color:#002699; font-weight: 200%; font-size:150%">Model</p>';

}

$(document)
		.on(
				"click",
				".searchCarButton",
				function(e) {
					e.preventDefault();
					var lowestPrice = document
							.getElementById("carSearchLowestPrice").value;
					if (lowestPrice == "") {
						lowestPrice = -1;
					} else {
						if (lowestPrice < 0) {
							lowestPrice = 0;
						}
					}
					var highestPrice = document
							.getElementById("carSearchHighestPrice").value;
					if (highestPrice == "") {
						highestPrice = -1;
					} else {
						if (highestPrice < 0) {
							highestPrice = 0;
						}
					}
					var id = localStorage.getItem("racId1");
					var finalPath = urlRoot18  + "/" + lowestPrice
							+ "/" + highestPrice + "/" + id;
					$.ajax({
						type : 'GET',
						url : finalPath,
						headers : createAuthorizationTokenHeader(TOKEN_KEY),
						dataType : "json",
						success : function(data) {
							fillTableCars(data,"tableAllCar");

						},
						error : function(jqXHR, textStatus, errorThrown) {
							showMessage(jqXHR.status,"error");
							showMessage(textStatus,"error");
							showMessage(errorThrown,"error");
						}

					})
				})

