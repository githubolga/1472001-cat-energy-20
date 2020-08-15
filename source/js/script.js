var buttonMenu = document.querySelector(".js-menu-button");
var menu = document.querySelector(".js-menu");

if (menu.classList.contains("no-js")) {
    menu.classList.remove("no-js");
}


buttonMenu.addEventListener("click", function (evt) {
  evt.preventDefault();
    if (menu.classList.contains("m-show")) {
        menu.classList.remove("m-show");
        buttonMenu.classList.remove("m-show");
    } else {
        menu.classList.add("m-show");
        buttonMenu.classList.add("m-show");
    }
});
