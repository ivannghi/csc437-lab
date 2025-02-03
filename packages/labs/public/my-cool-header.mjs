import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
        <style>
            .navbar {
                display: grid;
                grid-template-rows: 1fr auto;
                grid-template-columns: 7fr 2fr 1fr;
                padding: 1.5em;
                margin: 0 0 1.5em 0;
                background-color: var(--color-accent);
            }

            .nav-links {
                grid-row: 2 / 3;
                grid-column: 1 / 2;
                display: flex;
                flex-direction: column;
                line-height: 2em;
                display: none;
            }

            .name {
                grid-row: 1 / 2;
                grid-column: 1 / 2;
                font-size: xx-large;
                font-weight:bolder;
                margin: 0;
                white-space: nowrap;

            }
            
            .menu {
                grid-row: 1 / 2;
                grid-column: 3 / 4;
            }

            .darkmode {
                grid-row: 1 / 2;
                grid-column: 2 / 3;
                font-size: 1rem;
                white-space: nowrap;
                align-self: center;
                padding: 1em;
            }

            a {
                color: var(--color-link);
                text-decoration: none;
            }

            @media only screen and (min-width: 800px) {
                .navbar {
                    display: flex;
                    flex-direction: row;
                    justify-content: start;
                    align-items: baseline;
                    gap: 1em;
                }
                
                .nav-links {
                    display: flex;
                    flex-direction: row;
                    line-height: 1em;
                    gap: 1em;
                }
                
                .menu {
                    display: none;
                }
            }
            }
        </style>
        <div class="navbar">
            <p class="name">Ivan Nghi</p>
            <div class="nav-links">
                <a href="index.html">Home</a>
                <a href="twitch.html">Twitch</a>
                <a href="https://www.linkedin.com/in/ivan-nghi/">Linkedin</a>
            </div>
            <label class="darkmode">
                <input type="checkbox" autocomplete="off"/>
                    Dark mode
                </label>
            <button class="menu">Menu</button>
        </div>
        
        `;

class myCoolHeader extends HTMLElement {
    connectedCallback() {
        const shadowRoot = attachShadow(this, TEMPLATE);

        const btn = shadowRoot.querySelector(".menu");
        const navLinks = shadowRoot.querySelector(".nav-links");

        // Add click event to the button
        btn.addEventListener("click", () => {
            if (window.innerWidth < 800) {
                if (navLinks.style.display === "none" || navLinks.style.display === "") {
                    navLinks.style.display = "flex"; // Show the menu
                } else {
                    navLinks.style.display = "none"; // Hide the menu
                }
            }
        });

        // Attach resize listener
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 800) {
                navLinks.style.display = "flex"; // Always show for larger screens
            } else {
                navLinks.style.display = "none"; // Hide by default for smaller screens
            }
        });

        // Close the menu if clicked outside
        window.addEventListener('click', (event) => {
            // console.log(event.target);
            if (window.innerWidth < 800 && !event.target.closest("my-cool-header") && navLinks.style.display === "flex") {
                console.log(event.target.closest);
                const navLinks = shadowRoot.querySelector(".nav-links");
                navLinks.style.display = "none";
            }
        } )
    
        const checkbox = shadowRoot.querySelector(".darkmode input");
        checkbox.addEventListener('change', () => {
            console.log(checkbox.checked);
            if(checkbox.checked) {
                document.body.classList.add("dark-mode");
                localStorage.setItem("darkmode", "true");
            }
            else {
                document.body.classList.remove("dark-mode");
                localStorage.setItem("darkmode", "false");
            }
        });

        if (localStorage.getItem("darkmode") == "true");
            document.body.classList.add("dark-mode");
            checkbox.checked = true;
    }
}

customElements.define("my-cool-header", myCoolHeader);

