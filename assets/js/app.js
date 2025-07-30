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

    // --- Theme Toggle ---
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
        const isDarkMode = document.documentElement.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

});