// js/modules/navigationObserver.js
export const navigationObserver = {
    init() {
        this.navLinks = document.querySelectorAll('.desktop-nav a[href^="#"], #mobile-menu a[href^="#"]');
        this.sections = Array.from(this.navLinks).map(link => {
            try {
                return document.querySelector(link.getAttribute('href'));
            } catch (e) {
                console.warn(`Could not find section for link href: ${link.getAttribute('href')}`);
                return null;
            }
        }).filter(Boolean);

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
};