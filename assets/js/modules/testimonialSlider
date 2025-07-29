// js/modules/testimonialSlider.js
import { utils } from './utils.js';

export const testimonialSlider = {
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
        this.animationFrameId = null; // For smooth animations

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

        window.addEventListener('resize', utils.throttle(() => this.goToSlide(this.currentIndex), 200));

        this.slider.addEventListener('contextmenu', (e) => e.preventDefault());
    },
    handleTouchStart(e) {
        this.isDragging = true;
        this.startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        this.slider.style.transition = 'none';
        clearInterval(this.autoRotateInterval);
        cancelAnimationFrame(this.animationFrameId); // Cancel any pending animation
    },
    handleTouchMove(e) {
        if (!this.isDragging) return;
        const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        this.currentTranslate = currentPosition - this.startPos;

        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.animateMove.bind(this));
        }
    },
    animateMove() {
        this.slider.style.transform = `translateX(calc(-${this.currentIndex * 100}% + ${this.currentTranslate}px))`;
        this.animationFrameId = null;
    },
    handleTouchEnd() {
        if (!this.isDragging) return;
        this.isDragging = false;
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
        this.slider.style.transition = 'transform var(--transition)';

        if (Math.abs(this.currentTranslate) > 100) {
            this.goToSlide(this.currentTranslate < 0 ? this.currentIndex + 1 : this.currentIndex - 1);
        } else {
            this.goToSlide(this.currentIndex);
        }
        this.currentTranslate = 0;
    }
};