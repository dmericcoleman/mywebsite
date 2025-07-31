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

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(clickedItem => {
            const button = clickedItem.querySelector('.faq-question-btn');
            button.addEventListener('click', () => {
                const isAlreadyOpen = clickedItem.classList.contains('open');
                faqItems.forEach(item => {
                    if (item.classList.contains('open')) {
                        item.classList.remove('open');
                        item.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
                    }
                });
                if (!isAlreadyOpen) {
                    clickedItem.classList.add('open');
                    button.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    // --- Testimonial Slider (SwiperJS) ---
    if (document.querySelector('.testimonial-slider-wrapper')) {
        const swiper = new Swiper('.testimonial-slider-wrapper', {
            // Make the slider loop infinitely
            loop: true,
            // Autoplay settings
            autoplay: {
                delay: 7000, // Time between slides in milliseconds (7 seconds)
                disableOnInteraction: false, // Continue autoplay after user interacts
                pauseOnMouseEnter: true, // BEST PRACTICE: Pause when mouse is over the slider
            },
            // Navigation arrows
            navigation: {
                nextEl: '.slider-next',
                prevEl: '.slider-prev',
            },
        });
    }
});