var requests_block = document.getElementById('requests');

const request_html = `
<input id="popup-user-input" type="text">
<input id="popup-text-input" type="text">
<input id="popup-status-input" type="text">
<input id="popup-response-input" type="text">
`;

function createRequestHTML(id, element, data) {
	element.innerHTML = ""
	let request_name = document.createElement("input");
	request_name.disabled = true;
	request_name.value = data.user;
	let edit_request = document.createElement("button");
	let delete_request = document.createElement("button");
	edit_request.innerHTML = text_edit;
	delete_request.innerHTML = text_delete;
	edit_request.onclick = () => { showRequest(id, data.user, data.text, data.status, data.response) };
	delete_request.onclick = () => { deleteRequest(id) };
	element.appendChild(request_name);
	element.appendChild(edit_request);
	element.appendChild(delete_request);
}

function showRequestDone() {
	let id, data
	if ((popup.reason.id == undefined) && (document.getElementById(popup.reason) == null)) {
		addListRequest(
			popup.reason, 
			document.getElementById("popup-user-input").value,
			document.getElementById("popup-text-input").value,
			document.getElementById("popup-status-input").value,
			document.getElementById("popup-response-input").value
		)
		popup.reason = document.getElementById("request" + popup.reason)
		id = popup.reason.id;
		data = popup.reason.real_data;
	} else {
		id = popup.reason.id;
		data = popup.reason.real_data;
	}
	data.user = document.getElementById("popup-user-input").value
	data.text = document.getElementById("popup-text-input").value
	data.status = document.getElementById("popup-status-input").value;
	data.response = document.getElementById("popup-response-input").value;
	createRequestHTML(id, popup.reason, data)
	closePopup();
	fetchAuth(`${protocol}://${server}:${port}${url_request}${url_push_one}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(response => {
		if (!response.ok) {
			console.log("Ты чё пёс", response)
		}
	});
}

function showRequest(id, user, text, status, response) {
	showPopup(request_html, {text: text_save, func: showRequestDone}, document.getElementById(id));
	document.getElementById('popup-user-input').value = user;
	document.getElementById('popup-text-input').value = text;
	document.getElementById('popup-status-input').value = status;
	document.getElementById('popup-response-input').value = response;
}

function deleteRequest(id) {
	document.getElementById(id).remove()
	fetchAuth(`${protocol}://${server}:${port}${url_request}${url_delete_one}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({id: id})
	}).then(response => {
		if (!response.ok) {
			console.log("Ты чё пёс", response)
		}
	});
}

function addListRequest(id, user, text, status, response) {
	addListElement(
		requests_block.getElementsByTagName("ul")[0], 
		"request" + id,
		{
			user: user,
			text: text,
			status: status,
			response: response
		},
		createRequestHTML
	);
}

function addRequest() {
	let requests = requests_block.getElementsByTagName("ul")[0].children;
	let id;
	if (requests.length == 0) id = 0;
	else id = (+requests[requests.length - 1].id.replace('request', '')) + 1;
	let request = {
		id: id,
		user: text_request_user_placeholder,
		text: text_request_text_placeholder,
		status: text_request_status_placeholder,
		response: text_request_response_placeholder
	}
	showPopup(request_html, {text: text_add, func: showRequestDone}, id);
	document.getElementById('popup-user-input').value = request.user;
	document.getElementById('popup-text-input').value = request.text;
	document.getElementById('popup-status-input').value = request.status;
	document.getElementById('popup-response-input').value = request.response;
}