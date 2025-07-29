// assets/js/modules/swiper-init.js
export const swiper = {
    init() {
        const testimonialSlider = new Swiper('.testimonial-slider-wrapper', {
            // Optional parameters
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            slidesPerView: 1,
            spaceBetween: 30,
            grabCursor: true,

            // Navigation arrows
            navigation: {
                nextEl: '.slider-next',
                prevEl: '.slider-prev',
            },
        });
    }
};