var users_block = document.getElementById('users');

const user_html = `
<input id="popup-firstname-input" type="text">
<input id="popup-lastname-input" type="text">
<input id="popup-fathername-input" type="text">
<input id="popup-phone-input" type="tel">
<input id="popup-address-input" type="text">
`;

function createUserHTML(id, element, data) {
	element.innerHTML = "";
	let user_name = document.createElement("input");
	user_name.disabled = true;
	user_name.value = `${data.FLF.firstname} ${data.FLF.lastname}, ${data.phone}`;
	let edit_user = document.createElement("button");
	let delete_user = document.createElement("button");
	edit_user.innerHTML = text_edit;
	delete_user.innerHTML = text_delete;
	edit_user.onclick = () => { showUser(id, data.FLF, data.phone, data.address) };
	delete_user.onclick = () => { deleteUser(id) };
	element.appendChild(user_name);
	element.appendChild(edit_user);
	element.appendChild(delete_user);
}

function showUserDone() {
	let id, data
	if ((popup.reason.id == undefined) && (document.getElementById(popup.reason) == null)) {
		addListUser(
			popup.reason, 
			{
				firstname: document.getElementById("popup-firstname-input").value,
				lastname: document.getElementById("popup-lastname-input").value,
				fathername: document.getElementById("popup-firstname-input").value
			},
			document.getElementById("popup-phone-input").value,
			document.getElementById("popup-address-input").value
		)
		popup.reason = document.getElementById("user" + popup.reason)
		id = popup.reason.id;
		data = popup.reason.real_data;
	} else {
		id = popup.reason.id;
		data = popup.reason.real_data;
	}
	data.FLF = {
		firstname: document.getElementById("popup-firstname-input").value,
		lastname: document.getElementById("popup-lastname-input").value,
		fathername: document.getElementById("popup-fathername-input").value
	}
	data.phone = document.getElementById("popup-phone-input").value;
	data.address = document.getElementById("popup-address-input").value;
	createUserHTML(id, popup.reason, data)
	closePopup();
	fetchAuth(`${protocol}://${server}:${port}${url_user}${url_push_one}`, {
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

function showUser(id, _FLF, phone, address) {
	showPopup(user_html, {text: text_save, func: showUserDone}, document.getElementById(id));
	document.getElementById('popup-firstname-input').value = _FLF.firstname;
	document.getElementById('popup-lastname-input').value = _FLF.lastname;
	document.getElementById('popup-fathername-input').value = _FLF.fathername;
	document.getElementById('popup-phone-input').value = phone;
	document.getElementById('popup-address-input').value = address;
}

function deleteUser(id) {
	document.getElementById(id).remove()
	fetchAuth(`${protocol}://${server}:${port}${url_user}${url_delete_one}`, {
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

function addListUser(id, FLF, phone, address) {
	addListElement(
		users_block.getElementsByTagName("ul")[0], 
		"user" + id,
		{ 
			FLF: FLF,
			phone: phone,
			address: address
		},
		createUserHTML
	);
}

function addUser() {
	let users = users_block.getElementsByTagName("ul")[0].children;
	let id;
	if (users.length == 0) id = 0;
	else id = (+users[users.length - 1].id.replace('user', '')) + 1;
	let user = {
		id: id,
		FLF: {
			firstname: text_user_firstname_placeholder,
			lastname: text_user_lastname_placeholder,
			fathername: text_user_fathername_placeholder
		},
		phone: text_user_phone_placeholder,
		address: text_user_address_placeholder
	}
	showPopup(user_html, {text: text_add, func: showUserDone}, id);
	document.getElementById('popup-firstname-input').value = user.FLF.firstname;
	document.getElementById('popup-lastname-input').value = user.FLF.lastname;
	document.getElementById('popup-fathername-input').value = user.FLF.fathername;
	document.getElementById('popup-phone-input').value = user.phone;
	document.getElementById('popup-address-input').value = user.address;
}