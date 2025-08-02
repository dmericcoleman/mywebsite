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

    if (menuToggle && mobileMenu) {
        const navLinks = mobileMenu.querySelectorAll('a');
        const toggleMenu = () => {
            const isMenuOpen = document.body.classList.toggle('menu-open');
            menuToggle.setAttribute('aria-expanded', isMenuOpen);
            mobileMenu.hidden = !isMenuOpen;
        };

        menuToggle.addEventListener('click', toggleMenu);
        if (menuOverlay) menuOverlay.addEventListener('click', toggleMenu);
        if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

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
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimonial-slider-wrapper')) {
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

    // --- Active Nav Link on Scroll ---
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.desktop-nav a, #mobile-menu a');

        if (sections.length > 0 && navLinks.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(link => {
                            link.removeAttribute('aria-current');
                            if (link.getAttribute('href').substring(1) === entry.target.id) {
                                link.setAttribute('aria-current', 'page');
                            }
                        });
                    }
                });
            }, { rootMargin: '-30% 0px -70% 0px' }); // Highlights when section is in the middle 40% of the screen

            sections.forEach(section => {
                observer.observe(section);
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

    // --- Update Current Year in Footer ---
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

    // --- Cookie Consent Banner ---
    const cookieBanner = document.getElementById('cookie-consent-banner');
    if (cookieBanner) {
        const acceptBtn = document.getElementById('cookie-accept');
        const declineBtn = document.getElementById('cookie-decline');

        // This function updates Google's consent settings if GTM is used
        const updateGoogleConsent = (consent) => {
            if (typeof gtag !== 'function') return;
            if (consent === 'accepted') {
                gtag('consent', 'update', { 'analytics_storage': 'granted' });
            }
        };

        const savedConsent = localStorage.getItem('cookieConsent');
        if (savedConsent) {
            updateGoogleConsent(savedConsent);
        } else {
            cookieBanner.hidden = false;
            setTimeout(() => {
                cookieBanner.classList.add('is-visible');
            }, 500);
        }

        const handleConsent = (consent) => {
            localStorage.setItem('cookieConsent', consent);
            updateGoogleConsent(consent);
            cookieBanner.classList.remove('is-visible');
        };

        if (acceptBtn) acceptBtn.addEventListener('click', () => handleConsent('accepted'));
        if (declineBtn) declineBtn.addEventListener('click', () => handleConsent('declined'));
    }
});