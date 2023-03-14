const cssShow = "block";
const cssHidden = "none";


var edit_block = document.getElementById('edit');
var users_block = document.getElementById('users');
var requests_block = document.getElementById('requests');

var offers_block = document.getElementById('block1');
var services_block = document.getElementById('block2');


function showEdit() {
	edit_block.style.display = cssShow;
	users_block.style.display = cssHidden;
	requests_block.style.display = cssHidden;
}

function showUsers() {
	edit_block.style.display = cssHidden;
	users_block.style.display = cssShow;
	requests_block.style.display = cssHidden;
}

function showRequests() {
	edit_block.style.display = cssHidden;
	users_block.style.display = cssHidden;
	requests_block.style.display = cssShow;
}

function addListElement(list, id, name, text, img) {
	let offer = document.createElement("li");
	offer.id = id;
	offer.classList.add("offer");
	let offer_name = document.createElement("input");
	offer_name.disabled = true;
	offer_name.value = name;
	let edit_offer = document.createElement("button");
	let delete_offer = document.createElement("button");
	edit_offer.innerHTML = "Редактировать";
	delete_offer.innerHTML = "Удалить";
	offer.appendChild(offer_name);
	offer.appendChild(edit_offer);
	offer.appendChild(delete_offer);
	list.appendChild(offer);
}

function addListOffer(id, name, text, img) {
	addListElement(offers_block.getElementsByTagName("ul")[0], "offer" + id, name, text, img);
}

function addListService(id, name, text, img) {
	addListElement(services_block.getElementsByTagName("ul")[0], "service" + id, name, text, img);
}

showEdit();

addListOffer("1", "Скидка 50% на установку серверов", "Что-то там типа это ну как там кароче в общем ну вы поняли")
addListOffer("2", "Бесплатная настройка", "В комплекте с установкой, конечно же")
addListOffer("3", "Бесплатное оборудование", "Но ваша душа будет принадлежать нам")

addListService("1", "Установка серверов", "Ну тут это самое кароче вот такие дела получается так")
addListService("2", "Настройка оборудования", "В общем и целом и исходя из всего вышесказанного мы можем прийти к выводу о том, что всё это не имеет смысла")
addListService("3", "Установка серверов", "Если так подумать и взвесить все за и против, то получается так и никак иначе")