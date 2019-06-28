var TOKEN_KEY = 'jwtToken';

function checkFirstTime(){
	var token = getJwtToken(TOKEN_KEY);
	if (token) {
		$.ajax({
			type : 'GET',
			url : "/api/getRegUser",
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			dataType : "json",
			success : function(data) {
				if(data.firstTime){
					window.location.href = "changePassword.html";
				}
			},
			error : function() {
				//alert('Some error occurred. Please try again later.');
			}
	
		})
	}
}

$(document).on('submit', "#changePassword", function(e){
	e.preventDefault();
	var token = getJwtToken(TOKEN_KEY);
	var p1 = $('#newPassword').val();
	var p2 = $('#confirmPassword').val();
	
	if(p1 == ""){
		alert("Password must contain at least 1 character!");
	}
	else if(p1 != p2){
		alert("You did not validate the password correctly!");
	}
	else{
		$.ajax({
			type : 'PUT',
			url : "/auth/changePassword",
			data: inputToUser(p1),
			headers : createAuthorizationTokenHeader(TOKEN_KEY),
			dataType : "json",
			success : function(data) {
				if(data){
					setJwtToken(TOKEN_KEY, data.accessToken);
					window.history.back();
				}
				else{
					//alert('Some error occurred. Please try again later.');
				}
			},
			error : function() {
				//alert('Some error occurred. Please try again later.');
			}
	
		})
	}
})

function inputToUser(password){
	return JSON.stringify({
		"name":"",
		"surname":"",
		"username":"",
		"email": "",
		"company":"",
		"password":password,
	})
}