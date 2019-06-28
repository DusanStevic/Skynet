var TOKEN_KEY = 'jwtToken';

$(document).on('submit', "#dateInput", function(e){
	var date1 = $(this).find("input[id = start]").val();
	var date2 = $(this).find("input[id = end]").val();
	if(date1 == "" || date2 == ""){
		alert("All fields must be filled.");
		return;
	}
	$.ajax({
		type : 'POST',
		url : "/api/HotelIncome",
		headers : createAuthorizationTokenHeader(TOKEN_KEY),
		contentType: 'application/json',
		data: inputToReport(date1, date2),
		dataType: 'json',
		success : function(data) {
			localStorage.setItem("income", data.income);
			window.location.replace("hotelAdmin-report2.html");
		},error : function() {
			alert("ERROR OCCURRED!!!");
		}
	});	
})

function inputToReport(date1, date2){
	return JSON.stringify({
		"date1":date1,
		"date2":date2,
	})
}