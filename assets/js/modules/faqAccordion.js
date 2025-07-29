// assets/js/modules/faqAccordion.js
export const faqAccordion = {
    init() {
        const faqList = document.querySelector('.faq-list');
        if (!faqList) return;

        const allItems = faqList.querySelectorAll('.faq-item');

        faqList.addEventListener('click', (e) => {
            const button = e.target.closest('.faq-question-btn');
            if (!button) return;

            const clickedItem = button.closest('.faq-item');
            const wasOpen = clickedItem.classList.contains('open');

            // First, close all items
            allItems.forEach(item => {
                item.classList.remove('open');
                item.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
            });

            // If the item you clicked was not already open, then open it
            if (!wasOpen) {
                clickedItem.classList.add('open');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    }
};