document.addEventListener('DOMContentLoaded', () => {
    const typeWriter = (elementId, text, speed, callback) => {
        let i = 0;
        const element = document.getElementById(elementId);

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typewriter'); // Remove caret after typing
                if (callback) {
                    callback();
                }
            }
        };

        type();
    };

    // Animate name first, then job title
    typeWriter('name', 'Felix Hollndonner', 100, () => {
        setTimeout(() => {
            document.getElementById('job-title').classList.add('typewriter'); // Add caret for job title
            typeWriter('job-title', 'Fullstack Developer', 100);
        }, 500); // Delay between the animations
    });
});
//
// // script.js

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.scroll-effect');
    const screenPosition = window.innerHeight - 100;


    sections.forEach(section => {
        const position = section.getBoundingClientRect().top;

        if (position < screenPosition) {
            section.classList.add('visible');
        }
    });
});


document.addEventListener('click', function(e) {
    const logoEl = document.getElementById('logo');
    const navbarEl = document.getElementById('navbar');

    if (navbarEl.style.display === 'grid') {
        if (!navbarEl.contains(e.target) && e.target !== logoEl) {
            navbarEl.style.display = 'none';
        }
    }
});

