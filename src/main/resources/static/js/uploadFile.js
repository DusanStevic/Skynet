var TOKEN_KEY = 'jwtToken';

function uploadImage(formElement, formData, url_root){
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/uploadFile",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
        	var token = getJwtToken(TOKEN_KEY);
        	var name = response.fileName;
        	$.ajax({
        		type:'PUT',
        		url: url_root,
        		headers : createAuthorizationTokenHeader(TOKEN_KEY),
        		contentType: 'json',
        		data:inputToImage(name),
        		success:function(data){
        			location.reload();
        		}
        	})
        },
        error: function (error) {
            alert("Error");
        }
    })
}

function inputToImage(image){
	return JSON.stringify({
		"url":image,
	})
}