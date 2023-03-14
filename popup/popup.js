var popup = document.getElementById('popup-bg');
var popup_body = document.getElementById('popup-body');


function closePopup() {
	popup.style.display = 'none';
	image_changed = false;
}

function showPopup(content, button_done, reason) {
	popup.style.display = 'flex';
	popup_body.innerHTML = content;
	popup.reason = reason;
	document.getElementById('popup-done-button').innerHTML = button_done.text;
	document.getElementById('popup-done-button').onclick = button_done.func;
}
