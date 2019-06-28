$(document)
		.ready(
				function() {

					var currentUser = JSON.parse(localStorage
							.getItem('currentUser'));
					if (currentUser == null) {
						var nav_ul = $('#nav_ul');
						nav_ul
								.append('<li style="border-left:1px solid gray;"><a href="javascript:login_clicked()">Log in</li></a>');
						nav_ul
								.append('<li><a href="javascript:register_clicked()">Register</li></a>');
					} else {
						var nav_ul = $('#nav_ul');
						nav_ul
								.append('<li style="border-left:1px solid gray;"><a href="javascript:homepage_clicked()">'
										+ '<img src="../images/user.png" width=20 height= 20>&nbsp;&nbsp;'
										+ currentUser.username + '</li></a>');
						nav_ul
								.append('<li><a href="javascript:logout()">Log out</li></a>');

					}

				});



function getFormData(formId) {
	var formData = {};
	var s_data = $(formId).serializeArray();

	for (var i = 0; i < s_data.length; i++) {
		var record = s_data[i];
		formData[record.name] = record.value;
	}

	return formData;
}

