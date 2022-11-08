import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'


let swiper;

function createSwiper() {
    swiper = new Swiper('.swiper', {
        loop: false,
    
        navigation: {
            nextEl: '.moveNext',
            prevEl: '.movePrev'
        }
    });
}

function destroySwiper() {
    swiper.destroy(true, true);
}

export {swiper, createSwiper, destroySwiper};