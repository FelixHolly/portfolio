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
