var buttonMenu = document.querySelector(".js-menu-button");
var menu = document.querySelector(".js-menu");
var mapWrapper = document.querySelector(".js-map");

if (menu.classList.contains("no-js")) {
  menu.classList.remove("no-js");
}


buttonMenu.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (menu.classList.contains("modal-show")) {
    menu.classList.remove("modal-show");
    buttonMenu.classList.remove("modal-show");
  } else {
    menu.classList.add("modal-show");
    buttonMenu.classList.add("modal-show");
  }
});

ymaps.ready(map);

function map () {
  mapWrapper.classList.add("map-show");

  var myMap = new ymaps.Map("map", {
      center: [59.938631, 30.323055],
      zoom: 16,
      controls: ["zoomControl"]
  });
  var myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
    hintContent: "Cat Energy 191186, Санкт-Петербург, ул. Б.Конюшенная, д.19/8"
  }, {
    iconLayout: "default#image",
    iconImageHref: "./../img/map-pin.png",
    iconImageSize: [124, 106]
  });
  myMap.behaviors.disable("scrollZoom");
  myMap.geoObjects.add(myPlacemark);
}
