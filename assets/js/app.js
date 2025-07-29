// assets/js/app.js
'use strict';

// The paths now point to the new 'modules' folder
import { cookieBanner } from './modules/cookieBanner.js';
import { theme } from './modules/theme.js';
import { header } from './modules/header.js';
import { animations } from './modules/animations.js';
import { swiper } from './modules/swiper-init.js';
import { contactForm } from './modules/contactForm.js';
import { faqAccordion } from './modules/faqAccordion.js';
import { navigationObserver } from './modules/navigationObserver.js';
import { misc } from './modules/misc.js';

document.addEventListener('DOMContentLoaded', () => {
    cookieBanner.init();
    theme.init();
    header.init();
    animations.init();
    swiper.init();
    contactForm.init();
    faqAccordion.init();
    navigationObserver.init();
    misc.init();
});