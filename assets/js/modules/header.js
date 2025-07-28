// js/modules/header.js
import { utils } from './utils.js';

export const header = {
    init() {
        this.header = document.getElementById('header');
        this.menuToggle = document.querySelector('.mobile-menu-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.closeMenuBtn = document.querySelector('.close-menu-btn');
        this.menuOverlay = document.getElementById('menu-overlay');

        if (this.header) this.initStickyHeader();
        if (this.menuToggle && this.mobileMenu) this.initMobileMenu();
    },
    initStickyHeader() {
        const handleScroll = () => {
            this.header.classList.toggle('scrolled', window.scrollY > 50);
        };
        window.addEventListener('scroll', utils.throttle(handleScroll, 100), { passive: true });
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

        this.toggleMenu = toggleMenu;

        this.menuToggle.addEventListener('click', () => this.toggleMenu(!document.body.classList.contains('menu-open')));
        this.closeMenuBtn.addEventListener('click', () => this.toggleMenu(false));
        this.menuOverlay.addEventListener('click', () => this.toggleMenu(false));

        this.mobileMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                this.toggleMenu(false);
            }
        });
    }
};