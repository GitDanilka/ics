var edit_block = document.getElementById('edit');
var users_block = document.getElementById('users');
var requests_block = document.getElementById('requests');


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


function addListElement(list, id, data, htmlF) {
	let element = document.createElement("li");
	element.id = id;
	htmlF(id, element, data);
	element.real_data = data
	element.classList.add("li-el");
	list.appendChild(element);
}


showRequests();

addListOffer("1", "Скидка 50% на установку серверов", "Что-то там типа это ну как там кароче в общем ну вы поняли")
addListOffer("2", "Бесплатная настройка", "В комплекте с установкой, конечно же")
addListOffer("3", "Бесплатное оборудование", "Но ваша душа будет принадлежать нам")

addListService("1", "Установка серверов", "Ну тут это самое кароче вот такие дела получается так")
addListService("2", "Настройка оборудования", "В общем и целом и исходя из всего вышесказанного мы можем прийти к выводу о том, что всё это не имеет смысла")
addListService("3", "Установка серверов", "Если так подумать и взвесить все за и против, то получается так и никак иначе")

addListUser("1", {firstname:"Isaac", lastname: "Westcott", fathername: "Ray"}, "89224445678", "al.qw.4ef@email.com")
addListUser("2", {firstname:"Elliot", lastname: "Woodman", fathername: "---"}, "89224445678", "ath.qw.3ef@email.com")
addListUser("3", {firstname:"Ellen", lastname: "Mathers", fathername: "Mira"}, "89224445678", "ac.qw.2ef@email.com")

addListRequest("1", "al.qw.4ef@email.com", "Проведите интернет", "done", "Сделано!")
addListRequest("2", "ath.qw.3ef@email.com", "Взломайте пентагон", "progress", "Выполняем")
addListRequest("3", "ac.qw.2ef@email.com", "Сделайте сайт", "unread", "")
