const numStars = 50;
const starContainer = document.getElementById('stars');

const stars = [];

for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.opacity = Math.random();
    starContainer.appendChild(star);

    const speed = Math.random() * 0.2;
    stars.push({star, speed});
}

document.getElementById('logo').addEventListener('click', function() {
    const navbar = document.getElementById('navbar');
    navbar.style.display = navbar.style.display === 'grid' ? 'none' : 'grid';
    navbar.style.backgroundColor = 'transparent';
    navbar.style.backdropFilter = 'blur(10px)';
    navbar.style.width = '100%';
});

function moveStars() {
    stars.forEach(({star, speed}) => {
        const currentLeft = parseFloat(star.style.left);
        const newLeft = currentLeft - speed;

        if (newLeft < -2) {
            star.style.left = '99vw';
            star.style.top = `${Math.random() * 100}vh`;
        } else {
            star.style.left = `${newLeft}vw`;
        }
    });

    requestAnimationFrame(moveStars);
}

moveStars();

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

// script.js

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




