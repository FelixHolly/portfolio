document.addEventListener('DOMContentLoaded', () => {
    // ===== Typewriter effect (existing code) =====
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
    typeWriter('name', 'Hello, I\'m Felix.', 100, () => {
        setTimeout(() => {
            document.getElementById('job-title').classList.add('typewriter');
            typeWriter('job-title', 'I\'m a full stack web developer.', 100);
        }, 500);
    });

    // ===== Scroll-into-view fade-in logic (existing code) =====
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

    // ===== New Header Logic =====
    const headerEl = document.querySelector('header');
    const menuIcon = document.getElementById('menuIcon');
    const navbarEl = document.getElementById('navbar');

    // 1. Hamburger Toggling
    menuIcon.addEventListener('click', () => {
        navbarEl.classList.toggle('nav-open');
    });

    // 2. Close nav if a link is clicked (mobile)
    //    (New code)
    const navLinks = navbarEl.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarEl.classList.remove('nav-open');
        });
    });

    // 3. Hide-on-scroll logic (optional)
    let lastScrollPos = 0;
    window.addEventListener('scroll', () => {
        const currentScrollPos = window.pageYOffset;

        // If scrolling down, hide header; if scrolling up, show header
        if (currentScrollPos > lastScrollPos) {
            headerEl.classList.add('header-hide');
        } else {
            headerEl.classList.remove('header-hide');
        }
        lastScrollPos = currentScrollPos;
    });
});

// wave.js or in your main script
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');

    // Canvas resizing
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let waveOffset = 0; // how far along the wave we are
    const waveSpeed = 0.02; // speed of horizontal motion
    const waveAmplitude = 8; // height of wave crest
    const waveFrequency = 0.009; // wave length (lower = longer waves)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Choose a fill color or gradient
        ctx.fillStyle = '#3b1863';

        // Begin path
        ctx.beginPath();

        // Start from bottom-left corner
        ctx.moveTo(0, canvas.height);

        // Draw sine wave across the entire canvas width
        for (let x = 0; x <= canvas.width; x++) {
            // Calculate wave’s y offset
            const y =
                Math.sin(x * waveFrequency + waveOffset) * waveAmplitude +
                canvas.height / 2; // shift wave vertically

            ctx.lineTo(x, y);
        }

        // Close wave (back down to bottom-right corner)
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();

        // Move wave offset to create animation
        waveOffset += waveSpeed;

        requestAnimationFrame(animate);
    }

    animate();
    initBottomWave();
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const customCursor = document.getElementById('customCursor');

    // Move the div to follow mouse
    document.addEventListener('mousemove', (e) => {
        customCursor.style.top = e.clientY + 'px';
        customCursor.style.left = e.clientX + 'px';
    });

    // Optional: Expand the cursor on links/buttons hover
    const interactiveEls = document.querySelectorAll('a, button, .clickable');
    interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            customCursor.style.backgroundColor = 'rgba(255, 146, 107, 0.3)';
        });
        el.addEventListener('mouseleave', () => {
            customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
            customCursor.style.backgroundColor = 'transparent';
        });
    });
});

document.documentElement.style.cursor = 'none';


const canvas = document.getElementById('waveBottomCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    // Make the canvas match CSS size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let waveOffset = 0;
const waveSpeed = 0.022;
const waveAmplitude = 10;  // wave “height”
const waveFrequency = 0.002;
const verticalOffset = 50; // push wave down 50px from top

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff926b'; // wave color
    ctx.beginPath();

    // Start at top-left corner (0,0)
    ctx.moveTo(0, 0);

    // Draw wave across the entire width
    for (let x = 0; x <= canvas.width; x++) {
        // Sine wave
        const y = Math.sin(x * waveFrequency + waveOffset) * waveAmplitude + verticalOffset;
        ctx.lineTo(x, y);
    }

    // Then go down the right side & back to the bottom-left
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();

    // Move wave
    waveOffset += waveSpeed;
    requestAnimationFrame(animate);
}

animate();
