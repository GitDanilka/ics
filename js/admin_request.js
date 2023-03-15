var requests_block = document.getElementById('requests');

const request_html = `
<input id="popup-username-input" type="text">
<input id="popup-phone-input" type="tel">
<textarea id="popup-text-input" type="text">
`;

function createRequestHTML(id, element, data) {
	element.innerHTML = "";
	let request_name = document.createElement("input");
	request_name.disabled = true;
	request_name.value = `${data.username}, ${data.phone}, ${data.text}`;
	// let edit_request = document.createElement("button");
	let delete_request = document.createElement("button");
	// edit_request.innerHTML = text_edit;
	delete_request.innerHTML = text_delete;
	// edit_request.onclick = () => { showRequest(id, data.username, data.phone, data.text) };
	delete_request.onclick = () => { deleteRequest(id) };
	element.appendChild(request_name);
	// element.appendChild(edit_request);
	element.appendChild(delete_request);
}

function showRequestDone() {
	let id, data
	if ((popup.reason.id == undefined) && (document.getElementById(popup.reason) == null)) {
		addListRequest(
			popup.reason, 
			document.getElementById("popup-username-input").value,
			document.getElementById("popup-phone-input").value,
			document.getElementById("popup-text-input").value
		)
		popup.reason = document.getElementById("request" + popup.reason)
		id = popup.reason.id;
		data = popup.reason.real_data;
	} else {
		id = popup.reason.id;
		data = popup.reason.real_data;
	}
	data.username = document.getElementById("popup-username-input").value
	data.phone = document.getElementById("popup-phone-input").value;
	data.text = document.getElementById("popup-text-input").value;
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

function showRequest(id, username, phone, text) {
	showPopup(request_html, {text: text_save, func: showRequestDone}, document.getElementById(id));
	document.getElementById('popup-username-input').value = username;
	document.getElementById('popup-phone-input').value = phone;
	document.getElementById('popup-text-input').value = text;
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

function addListRequest(id, username, phone, text) {
	addListElement(
		requests_block.getElementsByTagName("ul")[0], 
		"request" + id,
		{
			username: username,
			phone: phone,
			text: text
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
		username: text_request_username_placeholder,
		phone: text_request_text_placeholder,
		text: text_request_response_placeholder
	}
	showPopup(request_html, {text: text_add, func: showRequestDone}, id);
	document.getElementById('popup-username-input').value = request.username;
	document.getElementById('popup-phone-input').value = request.phone;
	document.getElementById('popup-text-input').value = request.text;
}