const menuButton = document.querySelector(".menu-button");
const navigationMenu = document.querySelector(".nav-menu");

function closeMenu() {
    navigationMenu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
    const menuIsOpen = menuButton.getAttribute("aria-expanded") === "true";
    navigationMenu.classList.toggle("is-open", !menuIsOpen);
    menuButton.setAttribute("aria-expanded", String(!menuIsOpen));
});

navigationMenu.addEventListener("click", (event) => {
    if (event.target.matches("a")) closeMenu();
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".navigation")) closeMenu();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
        menuButton.focus();
    }
});
