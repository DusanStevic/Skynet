var page = localStorage.getItem("pageat");
if(page == "hotelAdmin"){
	window.location.replace("hotelAdmin-hotelProfile.html");
}
else if(page == "airlineAdmin"){
	window.location.replace("AirlineAdministrator.html");
}
else if(page == "racAdmin"){
	window.location.replace("racAdmin-home.html");
}
else if(page == "user"){
	window.location.replace("RegisteredUser.html");
}
else if(page == "sys"){
	window.location.replace("sysAdmin-home.html");
}