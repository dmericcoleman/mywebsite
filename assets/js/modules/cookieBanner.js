// js/modules/cookieBanner.js
export const cookieBanner = {
    init() {
        this.banner = document.getElementById('cookie-consent-banner');
        if (!this.banner) return;

        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            this.showBanner();
        }

        this.acceptBtn = document.getElementById('cookie-accept');
        this.declineBtn = document.getElementById('cookie-decline');

        this.acceptBtn.addEventListener('click', () => this.handleConsent(true));
        this.declineBtn.addEventListener('click', () => this.handleConsent(false));
    },
    showBanner() {
        this.banner.hidden = false;
        setTimeout(() => {
            this.banner.classList.add('is-visible');
        }, 50);
    },
    hideBanner() {
        this.banner.classList.remove('is-visible');
        this.banner.addEventListener('transitionend', () => {
            this.banner.hidden = true;
        }, { once: true });
    },
    handleConsent(didAccept) {
        localStorage.setItem('cookie_consent', didAccept ? 'accepted' : 'declined');
        this.hideBanner();
        console.log(`Cookie consent: ${didAccept ? 'Accepted' : 'Declined'}`);
    }
};