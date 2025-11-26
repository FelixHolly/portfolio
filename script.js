/**
 * Portfolio Website - Main JavaScript
 * @author Felix Hollndonner
 * @description Handles navigation, animations, and interactive elements
 */

'use strict';

// ===== Utility Functions =====

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Mobile Navigation =====

/**
 * Initialize mobile navigation toggle functionality
 */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const sideNavbar = document.getElementById('sideNavbar');

    if (!hamburger || !sideNavbar) {
        console.warn('Navigation elements not found');
        return;
    }

    hamburger.addEventListener('click', () => {
        const isOpen = sideNavbar.classList.toggle('open');

        // Update ARIA attribute for accessibility
        hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!sideNavbar.contains(e.target) && sideNavbar.classList.contains('open')) {
            sideNavbar.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile nav when clicking a navigation link
    const navLinks = sideNavbar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sideNavbar.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// ===== Active Navigation Highlighting =====

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.side-navbar a');

    if (!sections.length || !navLinks.length) return;

    let current = '';
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (current && link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== Intersection Observer for Fade-in Animations =====

/**
 * Initialize intersection observer for fade-in elements
 */
function initFadeInObserver() {
    const fadeElements = document.querySelectorAll('.fade-in');

    if (!fadeElements.length) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after animation for performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
}

// ===== Text Scramble Animation =====

/**
 * Text scramble effect class for animated text reveals
 */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#';
        this.update = this.update.bind(this);
    }

    /**
     * Set new text with scramble effect
     * @param {string} newText - Text to display
     * @returns {Promise} Resolves when animation completes
     */
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => {
            this.resolve = resolve;
        });

        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    /**
     * Update animation frame
     */
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

    /**
     * Get random character from character set
     * @returns {string} Random character
     */
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

/**
 * Initialize text scramble effect
 */
function initTextScramble() {
    const felixElement = document.querySelector('.gradient-text');

    if (felixElement) {
        const scrambler = new TextScramble(felixElement);
        scrambler.setText('Felix');
    }
}

// ===== Smooth Scroll =====

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip if href is just "#"
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Dynamic Text Color Based on Scroll =====

/**
 * Update text colors based on background gradient scroll position
 */
function updateScrollColors() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const heroSection = document.querySelector('.hero-section');
    const aboutSection = document.querySelector('.about-section');

    // Update hero section color
    if (heroSection) {
        const gradientHeight = windowHeight * 1.5; // 150vh
        const scrollProgress = Math.min(scrollPosition / gradientHeight, 1);

        if (scrollProgress < 0.5) {
            heroSection.style.color = '#fef9e1'; // Light text for dark background
        } else {
            heroSection.style.color = '#1e1310'; // Dark text for light background
        }
    }

    // Update about section color
    if (aboutSection) {
        const aboutTop = aboutSection.offsetTop;

        if (scrollPosition > aboutTop - windowHeight * 0.3) {
            aboutSection.style.color = '#1e1310';
        }
    }
}

// ===== Form Validation =====

/**
 * Initialize form validation and handling
 */
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        let isValid = true;

        // Basic validation (browser will handle required attribute)
        if (nameInput && !nameInput.value.trim()) {
            isValid = false;
        }

        if (emailInput && !emailInput.value.trim()) {
            isValid = false;
        }

        if (messageInput && !messageInput.value.trim()) {
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all fields.');
        }
    });
}

// ===== Event Listeners =====

// Debounced scroll handler for performance
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
    updateScrollColors();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler, { passive: true });

// ===== Initialization =====

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
    try {
        initMobileNav();
        initFadeInObserver();
        initTextScramble();
        initSmoothScroll();
        initFormValidation();

        // Initial calls
        updateActiveNavLink();
        updateScrollColors();

        console.log('Portfolio initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
