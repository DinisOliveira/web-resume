function toggleMenu() {
    const menu = document.querySelector(".menu");
    const navbar = document.querySelector(".navbar");
    const body = document.body;

    if (menu) {
        navbar.classList.toggle("show");
        body.classList.toggle("navbar-expanded");
    }
}

// Select all .fullscreenslide h2 elements
const fullscreenslideHeaders = document.querySelectorAll(".fullscreenslide h2");

// Create an Intersection Observer
const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add the 'fade' class to start the animation
                const text = entry.target;
                const strText = text.textContent;
                const splitText = strText.split("");
                text.textContent = ""; // Clear the original text

                // Add each character wrapped in a <span>
                splitText.forEach((char) => {
                    text.innerHTML += `<span>${char}</span>`;
                });

                let char = 0;
                let timer = setInterval(() => {
                    const span = text.querySelectorAll("span")[char];
                    span.classList.add("fade");
                    char++;
                    if (char === splitText.length) {
                        clearInterval(timer); // Stop the interval when done
                    }
                }, 50);

                // Unobserve the element after the animation starts
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.5, // Trigger when 50% of the element is visible
    }
);

// Observe each .fullscreenslide h2 element
fullscreenslideHeaders.forEach((header) => {
    observer.observe(header);
});

//Contact form
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault(); // stop default reload

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.innerHTML = '<div class="alert alert-success">Message sent successfully!</div>';
                contactForm.reset();
            } else {
                formStatus.innerHTML = '<div class="alert alert-danger">Oops! Something went wrong.</div>';
            }
        } catch (error) {
            formStatus.innerHTML = '<div class="alert alert-danger">Network error. Please try again later.</div>';
        }
    });
}