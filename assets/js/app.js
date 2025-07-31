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
            loop: true,
            speed: 600,
            grabCursor: true,
            autoplay: {
                delay: 7000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: '.slider-next',
                prevEl: '.slider-prev',
            },
        });
    }

    // --- Cookie Consent Banner ---
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    if (cookieBanner && !localStorage.getItem('cookieConsent')) {
        cookieBanner.hidden = false;
        setTimeout(() => {
            cookieBanner.classList.add('is-visible');
        }, 100); // Small delay to allow CSS transition
    }

    const handleConsent = (consent) => {
        localStorage.setItem('cookieConsent', consent);
        cookieBanner.classList.remove('is-visible');
        setTimeout(() => {
            cookieBanner.hidden = true;
        }, 500); // Match CSS transition duration
    };

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => handleConsent('accepted'));
    }
    if (declineBtn) {
        declineBtn.addEventListener('click', () => handleConsent('declined'));
    }
});