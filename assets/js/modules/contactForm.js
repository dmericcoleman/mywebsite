// js/modules/contactForm.js
export const contactForm = {
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
};