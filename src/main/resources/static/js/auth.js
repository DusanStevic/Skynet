var TOKEN_KEY = 'jwtToken';

function getJwtToken() {
	return localStorage.getItem(TOKEN_KEY);
};

function setJwtToken(token) {
	localStorage.setItem(TOKEN_KEY, token);
};

function removeJwtToken() {
	localStorage.removeItem(TOKEN_KEY);
};

function logout() {
	localStorage.clear();
	window.location.replace("index.html");
}