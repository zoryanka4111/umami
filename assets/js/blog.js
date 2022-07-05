$(document).ready(function () {
    $('.article-box ul.article-nav').clone().appendTo('.float-nav-cont');
    var blogNavSlider = new Swiper('.blog-nav-slider .swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        freeMode: true,
        grabCursor: true,
        watchOverflow: true,
        navigation: {
            nextEl: '.blog-nav-slider .swiper-button-next',
            prevEl: '.blog-nav-slider .swiper-button-prev',
        },
        breakpoints: {
            1025: {
                spaceBetween: 10,
            },
            1680: {
                spaceBetween: 22,
            }
        }
    });

    if ($(".blog-nav-slider").length) {
        'use strict';
        const breakpoint2 = window.matchMedia('(min-width:1025px)');
        const breakpointChecker2 = function () {
            if (breakpoint2.matches === true) {
                var bb2 = $(".blog-nav-slider .swiper-wrapper .swiper-slide:first-child .blog-nav-sort");
                $(".blog-nav .right").append(bb2);
                blogNavSlider.update();
                return;
            } else if (breakpoint2.matches === false) {
                return enableSwiper2();
            }
        };
        const enableSwiper2 = function () {
            var bb = $('.right .blog-nav-sort');
            blogNavSlider.prependSlide('<div class="swiper-slide"></div>');
            $(".blog-nav-slider .swiper-wrapper .swiper-slide:first-child").append(bb);
            blogNavSlider.slideTo(0, 0);
            blogNavSlider.update();
        };
        breakpoint2.addListener(breakpointChecker2);
        breakpointChecker2();
    }



    var relatedArticlesSlider = new Swiper('.related-articles-slider .swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        grabCursor: true,
        watchOverflow: true,
        slidesPerView: 3,
        spaceBetween: 60,
        breakpoints: {
            1024: {

                slidesPerView: 'auto',
                spaceBetween: 20,
            }
        }
    });


    function copytext(el) {
        var $tmp = $("<textarea>");
        $("body").append($tmp);
        $tmp.val($(el).text()).select();
        document.execCommand("copy");
        $tmp.remove();
    }

    $(".link-for-copy").on("click", function (e) {
        e.preventDefault();
        $(this).addClass("active");
        var el = $(this).children("div");
        copytext(el);
        setTimeout(() => {
            $(this).next().css('opacity', '0');

            setTimeout(() => {
                $(this).removeClass('active');
                $(this).next().removeAttr('style');
            }, 400);
        }, 4000);
    });

    var goBack = 0;
    var flFlag = false;


    if ($('.b-article').length) {
        $('a[href^="#"]').bind('click.smoothscroll', function (e) {
            e.preventDefault();
            var target = this.hash,
                $target = $(target);

            if ($(this).hasClass('link-go-refs')) {
                goBack = $(this).offset().top;
                $('html, body').stop().animate({ 'scrollTop': $target.offset().top - 90 }, 900, 'swing', function () {
                    $('.btn-float-up').addClass('active');
                    setTimeout(() => {
                        flFlag = true;
                    }, 1000)

                });
            }
            else {
                $('html, body').stop().animate({ 'scrollTop': $target.offset().top - 90 }, 900, 'swing');
            }

            $(".btn-float-nav").removeClass('active');
            $(".float-nav-cont").removeClass('active');
            $(".btn-float-share").removeClass('active');
            $(".float-share-cont").removeClass('active');
            $('.article-bg-layer').removeClass('active');
        });
    };

    $(".btn-float-up").on("click", function () {
        $('html, body').stop().animate({ 'scrollTop': goBack - 90 }, 900, 'swing');
    });

    var scrollPrev = 0;
    if ($('.b-article').length) {
        $(window).scroll(function () {
            if (flFlag) {
                var refs = $('#article_refs').offset().top;
                var scrolled = $(window).scrollTop();
                if ((scrolled > refs + 590 || scrolled < refs - 590) && $('.btn-float-up').hasClass('active')) {
                    $('.btn-float-up').removeClass('active');
                    flFlag = false;
                }
            }

            var wrapHeight = $('.article-wrap').innerHeight();
            var wrapTop = $('.article-wrap').offset().top;
            var scrolled = $(window).scrollTop();
            if (scrolled > wrapTop && scrolled < wrapTop + wrapHeight - $(window).innerHeight() && scrolled < scrollPrev) {
                $('.article-float-column').addClass('active');
            }
            else {
                $('.article-float-column').removeClass('active');
                $(".btn-float-nav").removeClass('active');
                $(".float-nav-cont").removeClass('active');
                $(".btn-float-share").removeClass('active');
                $(".float-share-cont").removeClass('active');
                $('.article-bg-layer').removeClass('active');
            }
            scrollPrev = scrolled;

        });
    }


    $(".article-float").stick_in_parent({
        offset_top: 110,
        recalc_every: 3
    });


    $(".btn-float-nav, .btn-float-share").on("click", function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass("active");
            $(this).next().removeClass("active");
            $('.article-bg-layer').removeClass('active');
        }
        else {
            $(this).addClass("active");
            $(this).next().addClass("active");
            $('.article-bg-layer').addClass('active');
        }
    });

    $(document).mouseup(function (e) {
        if (!$(".float-nav-box").is(e.target) && $(".float-nav-box").has(e.target).length === 0) {
            $(".btn-float-nav").removeClass('active');
            $(".float-nav-cont").removeClass('active');
        }
        if (!$(".float-share-box").is(e.target) && $(".float-share-box").has(e.target).length === 0) {
            $(".btn-float-share").removeClass('active');
            $(".float-share-cont").removeClass('active');
        }
    });


    $('.article-bg-layer').on("click", function () {
        $(this).removeClass('active');
    });


    if ($('.b-article').length) {
        window.onscroll = function () { myFunction() };
        let showUpBtn = false;
        const showHideUpBtn = (show = true) => { $('.btn-float-up')[show ? 'addClass' : 'removeClass']('active') }
        function myFunction() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            document.getElementById("progBar").style.width = scrolled + "%";

            if (!showUpBtn && scrolled >= 50) {
                showUpBtn = true;
                showHideUpBtn(true);
            }
            if (showUpBtn && scrolled < 50) {
                showUpBtn = false;
                showHideUpBtn(false);
            }

        }
    }



    $("a.open-search").on("click", function (e) {
        e.preventDefault();
        $(".b-search").addClass("active");
    });
    $(".form-line").on("click", ".close-search-modal:not(.active)", function (e) {
        e.preventDefault();
        $(".b-search").removeClass("active");
    });
    $(".form-line").on("click", ".close-search-modal.active", function (e) {
        e.preventDefault();
        $(this).prev('.search-form').find('input').val('');
        $(this).prev('.search-form').find('.search-focused').removeClass('active');
        $(this).removeClass('active');
    });

    $(".form-line").on("click", ".close-search-inbox", function (e) {
        e.preventDefault();
        $(this).prev('.search-form').find('input').val('');
        $(this).prev('.search-form').find('.search-focused').removeClass('active');
        $(this).removeClass('vis');
    });



    $(".search-bg-layer").on("click", function (e) {
        e.preventDefault();
        $(".b-search").removeClass("active");
    });

    $('.search-form input').on('input', function () {
        var value = $(this).val();
        var formPs = $(this).next('.search-focused');
        if (value != "") {
            formPs.addClass('active');
            $(this).parent().next('.close-search-modal').addClass('active');
            $(this).parent().next('.close-search-inbox').addClass('vis');
        }
        else {
            formPs.removeClass('active');
            $(this).parent().next('.close-search-modal').removeClass('active');
            $(this).parent().next('.close-search-inbox').removeClass('vis');
        }
    });




    $(".order__link").on("click", function (e) {
        e.preventDefault();
        $(".popup-order").addClass("open");
        hold_scroll_page(true);
    });



    var deskPlaceholder = $('input[name="search"]').data('place-desk');
    var mobPlaceholder = $('input[name="search"]').data('place-mob');

    function changePlaceholderSearchInput() {

        if (window.innerWidth > 625) {
            $('input[name="search"]').attr("placeholder", deskPlaceholder);
        }
        else {
            $('input[name="search"]').attr("placeholder", mobPlaceholder);
        }
    }

    changePlaceholderSearchInput();
    $(window).resize(function () {
        changePlaceholderSearchInput();
    });


    $(".sign-up-newlsetter-bg-layer, .sign-up-newlsetter-block .popup__close").click(function (e) {
        showHideSignUpNewlsetter(false)
    })

});

function setMyCookie(name, value, options = {}) {
    options = { path: '/', ...options };
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}

const showHideSignUpNewlsetter = (show = false) => {
    $(".sign-up-newlsetter-block")[show ? 'addClass' : 'removeClass']('active');
    hold_scroll_page(window.innerWidth <= 1024 && show);
    if (!show) setMyCookie('banner', 'false', { secure: true, 'max-age': 24 * 60 * 60 * 1000 });
}