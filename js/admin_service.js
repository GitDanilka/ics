var services_block = document.getElementById('block2');

const service_html = `
<input id="popup-name-input" type="text">
<textarea id="popup-description-input"></textarea>
<input type="file" id="imageUpload" name="imageUpload" accept="image/*" onchange="previewImage(event, 'popup-image')">
<img id="popup-image" src="block1-1.png">
`;

function createServiceHTML(id, element, data) {
	element.innerHTML = ""
	let service_name = document.createElement("input");
	service_name.disabled = true;
	service_name.value = data.name;
	let edit_service = document.createElement("button");
	let delete_service = document.createElement("button");
	edit_service.innerHTML = text_edit;
	delete_service.innerHTML = text_delete;
	edit_service.onclick = () => { showService(id, data.name, data.text, data.img) };
	delete_service.onclick = () => { deleteService(id) };
	element.appendChild(service_name);
	element.appendChild(edit_service);
	element.appendChild(delete_service);
}

function showServiceDone() {
	let id, data
	if ((popup.reason.id == undefined) && (document.getElementById(popup.reason) == null)) {
		addListService(
			popup.reason, 
			document.getElementById("popup-name-input").value,
			document.getElementById("popup-description-input").value,
			""
		)
		popup.reason = document.getElementById("service" + popup.reason)
		id = popup.reason.id;
		data = popup.reason.real_data;
	} else {
		id = popup.reason.id;
		data = popup.reason.real_data;
	}
	data.name = document.getElementById("popup-name-input").value;
	data.text = document.getElementById("popup-description-input").value;
	if (image_changed) {
		let formData = new FormData();
		formData.append('image', file);
		fetchAuth(`${protocol}://${server}:${port}${url_image_upload}`, {
			method: 'POST',
			body: formData
		}).then(response => response.json())
		.then(res_data => {
			data.image = res_data.link;
		})
		.catch(error => {
			console.error(error);
		});
	}
	data.img = document.getElementById("popup-description-input").value;
	createServiceHTML(id, popup.reason, data)
	closePopup();
	fetchAuth(`${protocol}://${server}:${port}${url_service}${url_push_one}`, {
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

function showService(id, name, text, img) {
	showPopup(service_html, {text: text_save, func: showServiceDone}, document.getElementById(id));
	document.getElementById('popup-name-input').value = name;
	document.getElementById('popup-description-input').value = text;
	document.getElementById('popup-image').src = img;
}

function deleteService(id) {
	document.getElementById(id).remove()
	fetchAuth(`${protocol}://${server}:${port}${url_service}${url_delete_one}`, {
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

function addListService(id, name, text, img) {
	addListElement(
		services_block.getElementsByTagName("ul")[0], 
		"service" + id,
		{ 
			name: name,
			text: text,
			img: img
		},
		createServiceHTML
	);
}

function addService() {
	let services = services_block.getElementsByTagName("ul")[0].children;
	let id;
	if (services.length == 0) id = 0;
	else id = (+services[services.length - 1].id.replace('service', '')) + 1;
	let service = {
		id: id,
		name: text_service_name_placeholder,
		text: text_service_desc_placeholder,
		img: ""
	}
	showPopup(service_html, {text: text_add, func: showServiceDone}, id);
	document.getElementById('popup-name-input').value = service.name;
	document.getElementById('popup-description-input').value = service.text;
	document.getElementById('popup-image').src = service.img;
}