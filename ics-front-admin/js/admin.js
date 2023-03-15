var edit_block = document.getElementById('edit');
var users_block = document.getElementById('users');
var requests_block = document.getElementById('requests');

var edit_menu_item = document.getElementById('edit-menu-item');
var users_menu_item = document.getElementById('users-menu-item');
var requests_menu_item = document.getElementById('requests-menu-item');

function showEdit() {
	edit_block.style.display = cssShow;
	users_block.style.display = cssHidden;
	requests_block.style.display = cssHidden;
	edit_menu_item.classList.add('active');
	users_menu_item.classList.remove('active');
	requests_menu_item.classList.remove('active');
}

function showUsers() {
	edit_block.style.display = cssHidden;
	users_block.style.display = cssShow;
	requests_block.style.display = cssHidden;
	edit_menu_item.classList.remove('active');
	users_menu_item.classList.add('active');
	requests_menu_item.classList.remove('active');
}

function showRequests() {
	edit_block.style.display = cssHidden;
	users_block.style.display = cssHidden;
	requests_block.style.display = cssShow;
	edit_menu_item.classList.remove('active');
	users_menu_item.classList.remove('active');
	requests_menu_item.classList.add('active');
}


function addListElement(list, id, data, htmlF) {
	let element = document.createElement("li");
	element.id = id;
	htmlF(id, element, data);
	element.real_data = data
	element.classList.add("li-el");
	list.appendChild(element);
}


showEdit();

addListOffer("1", "Скидка 50% на установку серверов", "Что-то там типа это ну как там кароче в общем ну вы поняли")
addListOffer("2", "Бесплатная настройка", "В комплекте с установкой, конечно же")
addListOffer("3", "Бесплатное оборудование", "Но ваша душа будет принадлежать нам")

addListService("1", "Установка серверов", "Ну тут это самое кароче вот такие дела получается так")
addListService("2", "Настройка оборудования", "В общем и целом и исходя из всего вышесказанного мы можем прийти к выводу о том, что всё это не имеет смысла")
addListService("3", "Установка серверов", "Если так подумать и взвесить все за и против, то получается так и никак иначе")

addListUser("1", {firstname:"Isaac", lastname: "Westcott", fathername: "Ray"}, "89224445678", "ул. Ватутина д. 64")
addListUser("2", {firstname:"Elliot", lastname: "Woodman", fathername: "---"}, "89225559988", "ул. Ватутина д. 63")
addListUser("3", {firstname:"Ellen", lastname: "Mathers", fathername: "Mira"}, "89550005500", "ул. Ватутина д. 62")

addListRequest("1", "Иван Иванов", "89224445678", "Настройте сервер")
addListRequest("2", "Петр Петров", "89225559988", "Привезите оборудование")
addListRequest("3", "Какой-то ноунейм", "89550005500", "Сделайте сайт")
