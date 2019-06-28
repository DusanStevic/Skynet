var TOKEN_KEY = 'jwtToken';

$(document).on('click', '#login', function (e) {
    var modal = document.getElementById('modal');
    var span = document.getElementById("closeLogin");
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

$(document).on('submit', "#loginForm", function(e){
	e.preventDefault();
	var username = $("#username").val();
	var password = $("#password").val();

	$.ajax({
		dataType : 'json',
		url : '/auth/login',
		type : 'POST',
		contentType : 'application/json',
		data : inputToUser(username, password),
		success : function(data) {
			if (data.message != undefined) {
				alert(data.message);
			} else {
				setJwtToken(TOKEN_KEY, data.accessToken);
				console.log(data.userRoleName)
				if (data.userRoleName == "ROLE_HOTEL_ADMIN") {
					localStorage.setItem("pageat", "hotelAdmin");
					window.location.replace("hotelAdmin-hotelProfile.html");
				} else if (data.userRoleName == "ROLE_AIRLINE_ADMIN") {
					localStorage.setItem("pageat", "airlineAdmin");
					window.location.replace("AirlineAdministrator.html");
				} else if (data.userRoleName == "ROLE_RENTACAR_ADMIN") {
					localStorage.setItem("pageat", "racAdmin");
					window.location.replace("rentacaradmin.html");
				} 
				else if (data.userRoleName=="ROLE_USER"){
					localStorage.setItem("pageat", "user");
					window.location.replace("RegisteredUser.html");
				}else{
					localStorage.setItem("pageat", "sys");
					window.location.replace("sysAdmin-home.html");
				}
			}
		},
		error : function(e) {
			alert('Wrong username or password. Please try again.');
		}
	})
})

function inputToUser(username, password){
	return JSON.stringify({
		"username":username,
		"password":password,
	})
}



