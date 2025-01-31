document.addEventListener('DOMContentLoaded', () => {
    // ===== Typewriter Effect =====
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

    // Add the scroll indicator when typewriter finishes
    const showScrollIndicator = () => {
        const scrollIndicator = document.getElementById('scrollIndicator');
        scrollIndicator.classList.add('visible');
    };

    // Wait for the fade animation to complete before starting typewriter effect
    const introContainer = document.querySelector('.introContainer');
    introContainer.addEventListener('animationend', () => {
        setTimeout(() => {
            typeWriter('name', 'Hello, I\'m Felix.', 100, () => {
                setTimeout(() => {
                    document.getElementById('job-title').classList.add('typewriter');
                    typeWriter('job-title', 'I\'m a full stack web developer.', 100, showScrollIndicator);
                }, 800);
            });
        }, 200); // Slight delay after animation completion
    });

    // ===== Scroll-into-view Fade-in Logic with IntersectionObserver =====
    const options = { root: null, threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    document.querySelectorAll('.scroll-effect').forEach((el) => observer.observe(el));

    // ===== Header Logic =====
    const headerEl = document.querySelector('header');
    const menuIcon = document.getElementById('menuIcon');
    const navbarEl = document.getElementById('navbar');
    let lastScrollPos = 0;

    // Hamburger menu toggling
    menuIcon.addEventListener('click', () => {
        const isOpen = navbarEl.classList.toggle('nav-open');
        menuIcon.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked (mobile)
    const navLinks = navbarEl.querySelectorAll('a');
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navbarEl.classList.remove('nav-open');
        });
    });

    // Hide header on scroll down, show on scroll up
    let ticking = false;
    window.addEventListener('scroll', () => {
        const currentScrollPos = window.pageYOffset;

        if (!ticking) {
            requestAnimationFrame(() => {
                headerEl.classList.toggle(
                    'header-hide',
                    currentScrollPos > lastScrollPos
                );
                lastScrollPos = currentScrollPos;
                ticking = false;
            });
            ticking = true;
        }
    });

    const customCursor = document.getElementById('customCursor');

    const updateCursorVisibility = () => {
        if (window.innerWidth >= 1024) {
            document.body.style.cursor = 'none';
            customCursor.style.display = 'block';
        } else {
            document.body.style.cursor = 'default';
            customCursor.style.display = 'none';
        }
    };

    updateCursorVisibility();

    window.addEventListener('resize', updateCursorVisibility);

    if (customCursor) {
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth >= 1024) {
                customCursor.style.top = `${e.clientY}px`;
                customCursor.style.left = `${e.clientX}px`;
            }
        });

        const interactiveEls = document.querySelectorAll('a, button, .clickable');
        interactiveEls.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                if (window.innerWidth >= 1024) {
                    customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    customCursor.style.backgroundColor = 'rgba(30, 144, 255, 0.3)';
                }
            });
            el.addEventListener('mouseleave', () => {
                if (window.innerWidth >= 1024) {
                    customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    customCursor.style.backgroundColor = 'transparent';
                }
            });
        });
    }
});
