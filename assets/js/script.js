/**
 * Premium Reviews Store - Refactored & Optimized Script
 *
 * This script is organized into modules for clarity and maintainability.
 * It handles all interactive functionality for the website.
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // =================================================================
    // Main App Object
    // =================================================================

    const App = {
        /**
         * Initializes all the application modules.
         */
        init() {
            this.theme.init();
            this.header.init();
            this.animations.init();
            this.testimonialSlider.init();
            this.contactForm.init();
            this.navigationObserver.init(); // Added for aria-current
            this.misc.init();
        },

        // =================================================================
        // UTILITY MODULE
        // =================================================================
        utils: {
            /**
             * Throttles a function to limit how often it can be called.
             * @param {Function} func - The function to throttle.
             * @param {number} limit - The cooldown period in milliseconds.
             * @returns {Function} The throttled function.
             */
            throttle(func, limit) {
                let inThrottle;
                return function(...args) {
                    const context = this;
                    if (!inThrottle) {
                        func.apply(context, args);
                        inThrottle = true;
                        setTimeout(() => inThrottle = false, limit);
                    }
                };
            }
        },

        // =================================================================
        // THEME TOGGLE MODULE
        // =================================================================
        theme: {
            init() {
                this.themeToggle = document.querySelector('.theme-toggle');
                if (!this.themeToggle) return;

                // UPDATED: The logic now defaults to 'dark' if no theme is saved in localStorage.
                const savedTheme = localStorage.getItem('theme') || 'dark';

                this.applyTheme(savedTheme);
                this.addEventListeners();
            },
            applyTheme(theme) {
                document.body.classList.toggle('dark-mode', theme === 'dark');
            },
            addEventListeners() {
                this.themeToggle.addEventListener('click', () => {
                    const newTheme = document.body.classList.toggle('dark-mode') ? 'dark' : 'light';
                    localStorage.setItem('theme', newTheme);
                });
            }
        },

        // =================================================================
        // HEADER & MOBILE MENU MODULE
        // =================================================================
        header: {
            init() {
                this.header = document.getElementById('header');
                this.menuToggle = document.querySelector('.mobile-menu-toggle');
                this.mobileMenu = document.getElementById('mobile-menu');
                this.closeMenuBtn = document.querySelector('.close-menu-btn'); // Get close button
                this.menuOverlay = document.getElementById('menu-overlay'); // Get overlay

                if (this.header) this.initStickyHeader();
                if (this.menuToggle && this.mobileMenu) this.initMobileMenu();
            },
            initStickyHeader() {
                const handleScroll = () => {
                    this.header.classList.toggle('scrolled', window.scrollY > 50);
                };
                window.addEventListener('scroll', App.utils.throttle(handleScroll, 100), { passive: true });
                handleScroll();
            },
            initMobileMenu() {
                const focusableElements = Array.from(this.mobileMenu.querySelectorAll('a[href], button'));
                const firstFocusableEl = focusableElements[0];
                const lastFocusableEl = focusableElements[focusableElements.length - 1];

                const trapFocus = (e) => {
                    if (e.key !== 'Tab') return;
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus();
                            e.preventDefault();
                        }
                    }
                };

                const handleEscKey = (e) => {
                    if (e.key === 'Escape') {
                        this.toggleMenu(false);
                    }
                };

                const toggleMenu = (isOpen) => {
                    document.body.classList.toggle('menu-open', isOpen);
                    this.menuToggle.setAttribute('aria-expanded', isOpen);
                    if (isOpen) {
                        document.addEventListener('keydown', trapFocus);
                        document.addEventListener('keydown', handleEscKey);
                        this.closeMenuBtn.focus();
                    } else {
                        document.removeEventListener('keydown', trapFocus);
                        document.removeEventListener('keydown', handleEscKey);
                        this.menuToggle.focus();
                    }
                };

                this.toggleMenu = toggleMenu; // Make it accessible to other methods

                this.menuToggle.addEventListener('click', () => this.toggleMenu(!document.body.classList.contains('menu-open')));
                this.closeMenuBtn.addEventListener('click', () => this.toggleMenu(false));
                this.menuOverlay.addEventListener('click', () => this.toggleMenu(false));

                this.mobileMenu.addEventListener('click', (e) => {
                    if (e.target.tagName === 'A') {
                        this.toggleMenu(false);
                    }
                });
            }
        },


        // =================================================================
        // ON-SCROLL ANIMATIONS MODULE
        // =================================================================
        animations: {
            init() {
                const animatedElements = document.querySelectorAll('.animate-on-scroll');
                if (animatedElements.length === 0) return;

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });

                animatedElements.forEach(el => observer.observe(el));
            }
        },

        // =================================================================
        // TESTIMONIAL SLIDER MODULE
        // =================================================================
        testimonialSlider: {
            init() {
                this.sliderWrapper = document.querySelector('.testimonial-slider-wrapper');
                if (!this.sliderWrapper) return;

                this.slider = this.sliderWrapper.querySelector('.testimonial-slider');
                this.slides = Array.from(this.slider.children);
                this.nextBtn = this.sliderWrapper.querySelector('.slider-next');
                this.prevBtn = this.sliderWrapper.querySelector('.slider-prev');

                if (this.slides.length === 0) return;

                this.currentIndex = 0;
                this.isDragging = false;
                this.startPos = 0;
                this.currentTranslate = 0;

                this.setupEventListeners();
                this.startAutoRotate();
            },
            goToSlide(index) {
                this.currentIndex = (index + this.slides.length) % this.slides.length;
                this.slider.style.transform = `translateX(-${this.currentIndex * 100}%)`;
                this.resetAutoRotate();
            },
            startAutoRotate() {
                this.autoRotateInterval = setInterval(() => this.goToSlide(this.currentIndex + 1), 6000);
            },
            resetAutoRotate() {
                clearInterval(this.autoRotateInterval);
                this.startAutoRotate();
            },
            setupEventListeners() {
                if (this.nextBtn && this.prevBtn) {
                    this.nextBtn.addEventListener('click', () => this.goToSlide(this.currentIndex + 1));
                    this.prevBtn.addEventListener('click', () => this.goToSlide(this.currentIndex - 1));
                }

                this.slider.addEventListener('mousedown', this.handleTouchStart.bind(this));
                this.slider.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });

                window.addEventListener('mouseup', this.handleTouchEnd.bind(this));
                window.addEventListener('touchend', this.handleTouchEnd.bind(this));

                window.addEventListener('mousemove', this.handleTouchMove.bind(this));
                window.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });

                window.addEventListener('resize', App.utils.throttle(() => this.goToSlide(this.currentIndex), 200));

                this.slider.addEventListener('contextmenu', (e) => e.preventDefault());
            },
            handleTouchStart(e) {
                this.isDragging = true;
                this.startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
                this.slider.style.transition = 'none';
                clearInterval(this.autoRotateInterval);
            },
            handleTouchMove(e) {
                if (!this.isDragging) return;
                const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
                this.currentTranslate = currentPosition - this.startPos;
                this.slider.style.transform = `translateX(calc(-${this.currentIndex * 100}% + ${this.currentTranslate}px))`;
            },
            handleTouchEnd() {
                if (!this.isDragging) return;
                this.isDragging = false;
                this.slider.style.transition = 'transform var(--transition)';

                if (Math.abs(this.currentTranslate) > 100) {
                    this.goToSlide(this.currentTranslate < 0 ? this.currentIndex + 1 : this.currentIndex - 1);
                } else {
                    this.goToSlide(this.currentIndex);
                }
                this.currentTranslate = 0;
            }
        },

        // =================================================================
        // CONTACT FORM MODULE (WITH INLINE VALIDATION)
        // =================================================================
        contactForm: {
            init() {
                this.form = document.getElementById('contact-form');
                if (!this.form) return;

                this.fields = {
                    name: document.getElementById('name'),
                    email: document.getElementById('email'),
                    message: document.getElementById('message')
                };
                this.submitButton = document.getElementById('submit-button');
                this.formMessage = document.getElementById('form-message');

                this.form.addEventListener('submit', this.handleSubmit.bind(this));
                this.addLiveValidation();
            },
            addLiveValidation() {
                for (const fieldName in this.fields) {
                    const field = this.fields[fieldName];
                    field.addEventListener('input', () => this.validateField(field));
                }
            },
            validateField(field) {
                let error = '';
                if (field.hasAttribute('required') && field.value.trim() === '') {
                    error = 'This field is required.';
                } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                    error = 'Please enter a valid email address.';
                }

                if (error) {
                    this.showError(field, error);
                    return false;
                } else {
                    this.clearError(field);
                    return true;
                }
            },
            showError(field, message) {
                field.setAttribute('aria-invalid', 'true');
                const errorContainer = field.parentElement.querySelector('.error-message');
                if (errorContainer) {
                    errorContainer.textContent = message;
                }
            },
            clearError(field) {
                field.setAttribute('aria-invalid', 'false');
                const errorContainer = field.parentElement.querySelector('.error-message');
                if (errorContainer) {
                    errorContainer.textContent = '';
                }
            },
            validateAllFields() {
                let isFormValid = true;
                for (const fieldName in this.fields) {
                    if (!this.validateField(this.fields[fieldName])) {
                        isFormValid = false;
                    }
                }
                return isFormValid;
            },
            async handleSubmit(e) {
                e.preventDefault();
                this.formMessage.style.display = 'none';

                if (!this.validateAllFields()) {
                    return;
                }

                const originalButtonText = this.submitButton.innerHTML;
                this.submitButton.disabled = true;
                this.submitButton.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

                try {
                    await this.mockSubmit();
                    this.displayMessage('Thank you! Your message has been sent successfully.', 'success');
                    this.form.reset();
                    for (const fieldName in this.fields) {
                        this.clearError(this.fields[fieldName]);
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    this.displayMessage('Oops! Something went wrong. Please try again.', 'error');
                } finally {
                    this.submitButton.disabled = false;
                    this.submitButton.innerHTML = originalButtonText;
                }
            },
            mockSubmit() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        Math.random() > 0.1 ? resolve({ok: true}) : reject(new Error('Submission failed'));
                    }, 2000);
                });
            },
            displayMessage(message, type) {
                this.formMessage.textContent = message;
                this.formMessage.className = `form-message ${type}`;
                this.formMessage.style.display = 'block';
                setTimeout(() => { this.formMessage.style.display = 'none'; }, 5000);
            }
        },

        // =================================================================
        // NAVIGATION OBSERVER MODULE (for aria-current)
        // =================================================================
        navigationObserver: {
            init() {
                this.navLinks = document.querySelectorAll('.desktop-nav a[href^="#"], #mobile-menu a[href^="#"]');
                this.sections = Array.from(this.navLinks).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

                if (this.sections.length === 0) return;

                const observerOptions = {
                    rootMargin: `-${document.getElementById('header').offsetHeight}px 0px -50% 0px`,
                    threshold: 0
                };

                this.observer = new IntersectionObserver(this.handleIntersection.bind(this), observerOptions);
                this.sections.forEach(section => this.observer.observe(section));
            },
            handleIntersection(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        this.updateActiveLink(id);
                    }
                });
            },
            updateActiveLink(activeId) {
                this.navLinks.forEach(link => {
                    const linkHref = link.getAttribute('href').substring(1);
                    if (linkHref === activeId) {
                        link.setAttribute('aria-current', 'page');
                    } else {
                        link.removeAttribute('aria-current');
                    }
                });
            }
        },

        // =================================================================
        // MISCELLANEOUS MODULE
        // =================================================================
        misc: {
            init() {
                const yearSpan = document.getElementById('current-year');
                if (yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                }
            }
        }
    };

    // Initialize the application
    App.init();
});
