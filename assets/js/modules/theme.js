// js/modules/theme.js
export const theme = {
    init() {
        this.themeToggle = document.querySelector('.theme-toggle');
        if (!this.themeToggle) return;

        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.applyTheme(savedTheme);
        this.addEventListeners();
    },
    applyTheme(theme) {
        document.documentElement.classList.toggle('dark-mode', theme === 'dark');
    },

    addEventListeners() {
        this.themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.classList.toggle('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
        });
    }
};