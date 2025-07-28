// js/modules/faqAccordion.js
export const faqAccordion = {
    init() {
        const faqList = document.querySelector('.faq-list');
        if (!faqList) return;

        faqList.addEventListener('click', (e) => {
            const button = e.target.closest('.faq-question-btn');
            if (!button) return;

            const item = button.closest('.faq-item');
            const isOpened = button.getAttribute('aria-expanded') === 'true';

            button.setAttribute('aria-expanded', !isOpened);
            item.classList.toggle('open');
        });
    }
};