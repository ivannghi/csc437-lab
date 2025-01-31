import { toHtmlElement } from "./toHtmlElement.mjs";

console.log(window.location.href);

function createNav(){
    let string = `
        <style>

        </style>
        <div class="navbar">
            <p class="name">Ivan Nghi</p>
            <div class="nav-links">
                <a href="index.html">Home</a>
                <a href="twitch.html">Twitch</a>
                <a href="https://www.linkedin.com/in/ivan-nghi/">Linkedin</a>
            </div>
        </div>
        `;

    return toHtmlElement(string);
}

function createNavbar() {
    // Create navbar container
    const navbar = document.createElement("div");
    navbar.classList.add("navbar");

    // Create name p
    const nameP = document.createElement("p");
    nameP.classList.add("name");
    nameP.textContent = "Ivan Nghi";

    // Create navigation links container
    const navLinks = document.createElement("div");
    navLinks.classList.add("nav-links");

    const link1 = document.createElement("a");
    link1.href = "index.html"
    link1.textContent = "Home"

    const link2 = document.createElement("a");
    link2.href = "twitch.html"
    link2.textContent = "Twitch"

    const link3 = document.createElement("a");
    link3.href = "https://www.linkedin.com/in/ivan-nghi"
    link3.textContent = "Linkedin"

    navLinks.appendChild(link1)
    navLinks.appendChild(link2)
    navLinks.appendChild(link3)

    // Append elements to navbar
    navbar.appendChild(nameP);
    navbar.appendChild(navLinks);

    return navbar;
}

function markCurrentPage() {
    const currentUrl = window.location.href; // Get current page URL
    const links = document.querySelectorAll("a"); // Select all <a> elements

    links.forEach(link => {
        if (link.href === currentUrl) {
            link.style.textDecoration = "underline";
            link.style.color = "purple"
        }
    });
}

window.addEventListener("load", () => { // Create a function on the fly
    // Code in this function will run once the page is done loading

    
    const navbar = createNav();
    document.body.prepend(navbar);

    markCurrentPage();
});