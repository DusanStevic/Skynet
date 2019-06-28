$(document).on('submit', "#registrationForm", function(e){
	e.preventDefault();
	var email = $('#email').val();
	var name = $('#name').val();
	var surname = $('#surname').val();
	var username = $('#username').val();
	var password = $('#password').val();
	var passwordConfirm = $('#passwordConfirm').val();
	if(password == "" || password != passwordConfirm){
		alert("Please enter a password and confirm it!");
		return;
	}
	if(password == "" || name == "" || surname == "" || username == ""){
		alert("All fields must be filled!");
		return;
	}
    $.ajax({
        type: "POST",
        url: '/auth/registerUser',
        contentType: "application/json",
        data: userToJSON(username, password, name, surname, email),
        dataType: 'json',
        success: function (data) {
			if (data==null || data==undefined) {
				alert("This username is already taken. Please choose another one.");
			} else {
				alert("Registration completed successfully. Please go to your email to verify registration.");
				sendEmail(email, data.id);
			}	
        },
        error : function(jqXHR, textStatus,
				errorThrown) {
			alert(jqXHR.status);
			alert(textStatus);
			alert(errorThrown);

		}
    })
})

function sendEmail(email, user_id){
	var text = "Thanks for registering on Skynet! To confirm your registration, follow this <a href='http://localhost:8080/auth/confirmRegistration/"+user_id+"'>link<a>.";
	var body = "<html><head></head><body>"+text+"</body></html>";
	var subject = "Skynet: Confirm your registration";
	$.ajax({
		type : 'POST',
		url : "/sendEmail",
		contentType : 'application/json',
		data : emailToJSON(subject, body, email),
		success : function(data) {
			
		},
		error : function(jqXHR, textStatus, errorThrown) {

		}
	})
}

function userToJSON(username, password, name, surname, email) {
	return JSON.stringify({
		"username" : username,
		"password" : password,
		"firstName" : name,
		"lastName" : surname,
		"email" : email,
	})
}

function emailToJSON(subject, body, email) {
	return JSON.stringify({
		"subject" : subject,
		"body" : body,
		"email" : email,
	})
}