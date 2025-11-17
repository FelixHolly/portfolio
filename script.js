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



// ===== Text Scramble Animation for "Felix" =====
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 90);
            const end = start + Math.floor(Math.random() * 90);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const felixEl = document.querySelector(".gradient-text");
    if (felixEl) {
        const fx = new TextScramble(felixEl);
        fx.setText("Felix");
    }
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Dynamic Text Color Based on Scroll =====
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const heroSection = document.querySelector('.hero-section');
    const aboutSection = document.querySelector('.about-section');

    // Calculate scroll progress through gradient (0 to 1)
    const gradientHeight = windowHeight * 1.5; // 150vh
    const scrollProgress = Math.min(scrollPosition / gradientHeight, 1);

    // Change hero text color based on scroll
    if (heroSection && scrollProgress < 0.5) {
        // Dark background - white text
        heroSection.style.color = '#fef9e1';
    } else if (heroSection && scrollProgress >= 0.5) {
        // Light background - dark text
        heroSection.style.color = '#1e1310';
    }

    // Change about section text based on position
    if (aboutSection) {
        const aboutTop = aboutSection.offsetTop;
        const aboutScroll = scrollPosition - aboutTop + windowHeight;

        if (scrollPosition > aboutTop - windowHeight * 0.3) {
            aboutSection.style.color = '#1e1310';
        }
    }
});
