const navigation = document.querySelector(".navigation");
const menuButton = document.querySelector(".menu-button");
const navigationMenu = document.querySelector(".nav-menu");
const menuLabel = menuButton.querySelector(".visually-hidden");
const mobileLayout = window.matchMedia("(max-width: 800px)");

function menuIsOpen() {
    return menuButton.getAttribute("aria-expanded") === "true";
}

function setMenuOpen(open) {
    navigationMenu.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuLabel.textContent = open ? "Close navigation" : "Open navigation";
}

menuButton.addEventListener("click", () => {
    setMenuOpen(!menuIsOpen());
});

navigationMenu.addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='#']");
    if (!link || !menuIsOpen()) return;

    const destination = document.getElementById(link.hash.slice(1));
    setMenuOpen(false);
    if (destination) {
        destination.setAttribute("tabindex", "-1");
        destination.focus({ preventScroll: true });
    } else {
        menuButton.focus();
    }
});

document.addEventListener("click", (event) => {
    if (!menuIsOpen() || navigation.contains(event.target)) return;
    const focusWasInMenu = navigationMenu.contains(document.activeElement);
    setMenuOpen(false);
    if (focusWasInMenu) menuButton.focus();
});

navigation.addEventListener("focusout", (event) => {
    if (menuIsOpen() && event.relatedTarget && !navigation.contains(event.relatedTarget)) {
        setMenuOpen(false);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !menuIsOpen()) return;
    event.preventDefault();
    setMenuOpen(false);
    menuButton.focus();
});

mobileLayout.addEventListener("change", () => {
    const focused = document.activeElement;
    setMenuOpen(false);
    if (mobileLayout.matches && navigationMenu.contains(focused)) {
        menuButton.focus();
    } else if (!mobileLayout.matches && focused === menuButton) {
        navigationMenu.querySelector("a").focus();
    }
});

// Collapse the mobile menu only once its event handlers are ready.
navigation.classList.add("is-enhanced");
