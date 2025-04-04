function toggleMenu() {
    const menu = document.querySelector(".menu");
    const navbar = document.querySelector(".navbar");
    const body = document.body;

    if (menu) {
        navbar.classList.toggle("show");
        body.classList.toggle("navbar-expanded");
    }
}
