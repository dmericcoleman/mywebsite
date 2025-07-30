document.addEventListener('DOMContentLoaded', () => {

    // --- Scrolled Header ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Menu ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const navLinks = mobileMenu.querySelectorAll('a');

    const toggleMenu = () => {
        const isMenuOpen = document.body.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', isMenuOpen);
        mobileMenu.hidden = !isMenuOpen;
    };

    if (menuToggle && mobileMenu && menuOverlay && closeMenuBtn) {
        menuToggle.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (document.body.classList.contains('menu-open')) {
                    toggleMenu();
                }
            });
        });
    }

    // --- Theme Toggle ---
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            const isDarkMode = document.documentElement.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }

    // --- Animate on Scroll ---
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
});