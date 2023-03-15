var offers_block = document.getElementById('block1');

const offer_html = `
<input id="popup-name-input" type="text">
<textarea id="popup-description-input"></textarea>
<input type="file" id="popup-image-upload" name="imageUpload" accept="image/*" onchange="previewImage(event, 'popup-image')">
<img id="popup-image" src="block1-1.png">
`;

function createOfferHTML(id, element, data) {
	element.innerHTML = ""
	let offer_name = document.createElement("input");
	offer_name.disabled = true;
	offer_name.value = data.name;
	let edit_offer = document.createElement("button");
	let delete_offer = document.createElement("button");
	edit_offer.innerHTML = text_edit;
	delete_offer.innerHTML = text_delete;
	edit_offer.onclick = () => { showOffer(id, data.name, data.text, data.img) };
	delete_offer.onclick = () => { deleteOffer(id) };
	element.appendChild(offer_name);
	element.appendChild(edit_offer);
	element.appendChild(delete_offer);
}

function showOfferDone() {
	let id, data
	if ((popup.reason.id == undefined) && (document.getElementById(popup.reason) == null)) {
		addListOffer(
			popup.reason, 
			document.getElementById("popup-name-input").value,
			document.getElementById("popup-description-input").value,
			""
		)
		popup.reason = document.getElementById("offer" + popup.reason)
		id = popup.reason.id;
		data = popup.reason.real_data;
	} else {
		id = popup.reason.id;
		data = popup.reason.real_data;
	}
	data.name = document.getElementById("popup-name-input").value;
	data.text = document.getElementById("popup-description-input").value;
	createOfferHTML(id, popup.reason, data)
	closePopup();
	fetchAuth(`${protocol}://${server}:${port}${url_offer}${url_push_one}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(response => {
		if (!response.ok) {
			console.log("Ты чё пёс", response)
		} else {
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
		}
	});
}

function showOffer(id, name, text, img) {
	showPopup(offer_html, {text: text_save, func: showOfferDone}, document.getElementById(id));
	document.getElementById('popup-name-input').value = name;
	document.getElementById('popup-description-input').value = text;
	document.getElementById('popup-image').src = img;
}

function deleteOffer(id) {
	document.getElementById(id).remove()
	fetchAuth(`${protocol}://${server}:${port}${url_offer}${url_delete_one}`, {
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

function addListOffer(id, name, text, img) {
	addListElement(
		offers_block.getElementsByTagName("ul")[0], 
		"offer" + id,
		{ 
			name: name,
			text: text,
			img: img
		},
		createOfferHTML
	);
}

function addOffer() {
	let offers = offers_block.getElementsByTagName("ul")[0].children;
	let id;
	if (offers.length == 0) id = 0;
	else id = ((+offers[offers.length - 1] || {id:"offer-1"}).id.replace('offer', '')) + 1;
	
	let offer = {
		id: id,
		name: text_offer_name_placeholder,
		text: text_offer_desc_placeholder,
		img: ""
	}
	showPopup(offer_html, {text: text_add, func: showOfferDone}, id);
	document.getElementById('popup-name-input').value = offer.name;
	document.getElementById('popup-description-input').value = offer.text;
	document.getElementById('popup-image').src = offer.img;
}