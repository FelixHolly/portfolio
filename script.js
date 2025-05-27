// Mobile navbar toggle
const hamburger = document.getElementById("hamburger");
const sideNavbar = document.getElementById("sideNavbar");

hamburger.addEventListener("click", () => {
    sideNavbar.classList.toggle("open");
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".side-navbar a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const top = window.scrollY;
        const offset = section.offsetTop - 100;
        const height = section.offsetHeight;
        if (top >= offset && top < offset + height) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// Fade-in observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.1,
});

document.querySelectorAll(".fade-in").forEach(el => {
    observer.observe(el);
});
