// ==================================================
// Theme Toggle Logic
// ==================================================

const themeToggle = document.querySelector('.theme-toggle');
const rootElement = document.documentElement;

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    rootElement.classList.add(currentTheme + '-mode');
}

themeToggle.addEventListener('click', () => {
    if (rootElement.classList.contains('dark-mode')) {
        rootElement.classList.remove('dark-mode');
        localStorage.setItem('theme', '');
    } else {
        rootElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
});

// ==================================================
// Sticky Header
// ==================================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==================================================
// Mobile Menu & Overlay
// ==================================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');

const toggleMenu = () => {
    document.body.classList.toggle('menu-open');
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true' || false;
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
};

mobileMenuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);
mobileMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        toggleMenu(); // Close menu when a link is clicked
    }
});


// ==================================================
// Cookie Consent Banner
// ==================================================
const cookieBanner = document.getElementById('cookie-consent-banner');
const cookieAccept = document.getElementById('cookie-accept');
const cookieDecline = document.getElementById('cookie-decline');

function getCookieConsent() {
    return localStorage.getItem('cookieConsent');
}

function showCookieBanner() {
    if (!getCookieConsent()) {
        setTimeout(() => {
            cookieBanner.classList.add('is-visible');
            cookieBanner.removeAttribute('hidden');
        }, 1000); // Wait 1 second before showing
    }
}

function hideCookieBanner() {
    cookieBanner.classList.remove('is-visible');
    setTimeout(() => {
        cookieBanner.setAttribute('hidden', true);
    }, 500); // Wait for transition to finish before hiding
}

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'true');
    hideCookieBanner();
});

cookieDecline.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'false');
    hideCookieBanner();
});

// Only show banner if no choice has been made
window.onload = showCookieBanner;

// ==================================================
// Animations on Scroll
// ==================================================
const scrollElements = document.querySelectorAll('.animate-on-scroll');
if (scrollElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    scrollElements.forEach(element => {
        observer.observe(element);
    });
}

// ==================================================
// Sticky Table of Contents (TOC) Highlighting
// ==================================================

const tocLinks = document.querySelectorAll('.toc-link');
const articleHeadings = document.querySelectorAll('.article-body h2');

if (tocLinks.length > 0 && articleHeadings.length > 0) {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50% 0px', // Highlight when the top of the section is 50% down the viewport
        threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const correspondingLink = document.querySelector(`.toc-link[href="#${id}"]`);
            if (entry.isIntersecting) {
                tocLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    articleHeadings.forEach(heading => {
        observer.observe(heading);
    });
}