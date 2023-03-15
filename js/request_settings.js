const server = "127.0.0.1";
const protocol = "http";
const port = "8080";


const url_login = "/login";

const url_offer = "/offer";
const url_service = "/service";
const url_user = "/user";
const url_request = "/request";

const url_image = "/image";
const url_image_upload = "/upload/image";

const url_receive_list = "/getAll";
const url_receive_one = "/get";
const url_push_list = "/setAll";
const url_push_one = "/set";
const url_delete_one = "/delete";


function logIn(phone, password) {
	fetch(`${protocol}://${server}:${port}${url_login}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({phone: phone, password: password})
	})
	.then(response => {
		if (response.ok) {
			return response.json().then(data => {
				localStorage.setItem('token', data.token);
			});
		} else {
			throw new Error('Failed to login');
		}
	})
	.catch(error => {
		console.error(error);
		handleError();
	});
}

async function fetchAuth(url, settings) {
	if (localStorage.getItem('token') == null)
		return await fetch(url, settings)
	if (settings.headers == undefined)
		settings.headers = new Headers();
	if (headers.get('Authorization') == null)
		headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
	return await fetch()
}

function handleError() {
	alert("Произошла ошибка!");
	location.reload(true);
}