// sliders.js
function initSwiperSliders() {
    $(".partners_slider").each(function () {
        const swiper = $(this).find('.swiper')
        new Swiper(swiper[0], {
            loop: true,
            autoHeight: false,
            slidesPerView: 'auto',
            spaceBetween: 40,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 50,
            },
            pagination: {
                el: $(this).find(".swiper-pagination"),
                clickable: true
            },
            on: {
                touchStart: () => {
                    swiper.css('cursor', 'grabbing')
                },
                touchEnd: () => {
                    swiper.css('cursor', '')
                },
            },
        });
    });

    if ($("#our-app").length) {
        const ourAppTabSlider = new Swiper('#ourAppTabSlider', {
            slidesPerView: 'auto',
            spaceBetween: 13,
            allowTouchMove: false,
            breakpoints: {
                1680: {
                    spaceBetween: 10,
                },
                1024: {
                    spaceBetween: 9,
                },

            }
        });
        window.ourAppTabSlider = ourAppTabSlider;
        const ourAppSlider = new Swiper('#ourAppSlider', {
            autoHeight: true,
            slidesPerView: 1,
            spaceBetween: 6,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 2,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            on: {
                slideChange: () => {
                    const index = ourAppSlider.realIndex;
                    ourAppTabSlider.slideTo(index, 250, true);
                    $(ourAppTabSlider.slides).removeClass('swiper-slide-active')
                    $(ourAppTabSlider.slides).eq(index).addClass('swiper-slide-active')
                    detectHidenOurAppSlides(index, ourAppTabSlider);
                },
                touchStart: () => {
                    $(ourAppSlider.el).css('cursor', 'grabbing')
                },
                touchEnd: () => {
                    $(ourAppSlider.el).css('cursor', '')
                },
            }
        });
        setTimeout(() => {
            ourAppTabSlider.update()
        }, 500);
        detectHidenOurAppSlides(0, ourAppTabSlider);
        $("#ourAppTabSlider .ourAppSliderTab").click(function () {
            const index = $(this).parent().index();
            ourAppSlider.slideTo(index, 250, true);
        })
    }
};

function detectHidenOurAppSlides(index, ourAppTabSlider) {
    const activeSlide = $(ourAppTabSlider.slides).eq(index);
    $('#ourAppTabSlider')[ourAppTabSlider.isEnd ? 'removeClass' : 'addClass']('showRightLine')
    setTimeout(() => {
        if (!$('#ourAppTabSlider:visible').length) return false;
        const parentRect = $('#ourAppTabSlider')[0].getBoundingClientRect()
        const slideRect = activeSlide[0].getBoundingClientRect()
        let prevHahfVisible = (() => {
            let visible = false;
            activeSlide.prevAll().each(function () {
                const currentRect = $(this)[0].getBoundingClientRect();
                if (currentRect.left < parentRect.left && currentRect.left + currentRect.width > parentRect.left) {
                    visible = true;
                    return false;
                }
            })
            return visible;
        })()
        const show = slideRect.left > parentRect.left + 50 && !ourAppTabSlider.isEnd || prevHahfVisible;
        $('#ourAppTabSlider')[show ? 'addClass' : 'removeClass']('showLeftLine')
    }, 250);
}