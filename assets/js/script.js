$(window).resize(function () {
    window_width = $(window).innerWidth();
    window_height = $(window).innerHeight();
})

function rnd(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
};

$(document).ready(function () {

    $("#intro__circle").click(function () {
        $('html, body').animate({ scrollTop: $('.partners').offset().top - $('header').innerHeight() + parseInt($('.partners').css('padding-top')) - 25 }, 500);
    })
    $(".btn-go-down").click(function () {
        const top = $(this).parent().next().offset().top - $('header').innerHeight()
        $('html, body').animate({ scrollTop: top - 25 }, 500);
    })

    $('body').addClass('ready');

    if ($('.b-seo-main').length) {
        $('.header__logo').addClass('white');
        $('header').addClass('white');
        $('.wrapper').addClass('visible');
    }

    if ($('#scene2').length) {
        var scene2 = document.getElementById('scene2');
        var parallax2 = new Parallax(scene2);
    }
    if ($('#scene3').length) {
        var scene3 = document.getElementById('scene3');
        var parallax3 = new Parallax(scene3);
    }
    if ($('#scene4').length) {
        var scene4 = document.getElementById('scene4');
        var parallax4 = new Parallax(scene4);
    }
    if ($('#scene5').length) {
        var scene5 = document.getElementById('scene5');
        var parallax5 = new Parallax(scene5);
    }
    if ($('#scene6').length) {
        var scene6 = document.getElementById('scene6');
        var parallax6 = new Parallax(scene6);
    }
    if ($('#scene7').length) {
        var scene7 = document.getElementById('scene7');
        var parallax7 = new Parallax(scene7);
    }
    if ($('#scene8').length) {
        var scene8 = document.getElementById('scene8');
        var parallax8 = new Parallax(scene8);
    }


    $('.btn-go-down').click(function () {
        $('html, body').animate({
            scrollTop: $('.b-infographic').offset().top - 100
        }, 500);
        return false;
    });

    if ($('.nav-dots').length) {
        function Scroll_block() {
            var position = $(this).scrollTop();
            var classSet = 0;

            $('.b-advantages-inn').each(function () {
                var target = $(this).offset().top;

                var id = $(this).attr('id');
                if (classSet == 0)
                    $('.nav-dots ul li a[data-id=' + id + ']').removeClass('active');
                if (position + $(window).innerHeight() / 2 >= target - $('header').innerHeight() && position + $(window).innerHeight() / 2 < target - $('header').innerHeight() + $(this).height()) {
                    $('.nav-dots ul li a[data-id=' + id + ']').addClass('active');
                    classSet = 1;
                }
            });
        }

        $(document).on("scroll", Scroll_block);

        $(".nav-dots ul li a").click(function (e) {
            e.preventDefault();

            $(document).off("scroll");
            $(".nav-dots ul li a.active").removeClass("active");
            $(this).addClass("active");
            var hash = $(this).attr("href").replace("/", '');
            var target = $(hash);

            $("html, body").animate({
                scrollTop: target.offset().top - $('header').innerHeight()
            }, 500, function () {
                $(document).on("scroll", Scroll_block);
            });

        });
    }

    $(window).scroll(function () {
        var header = $('header');
        var scroll = $(window).scrollTop();
        if (!header.hasClass("open")) {
            if (scroll >= 10) { header.addClass('fixed'); }
            else { header.removeClass('fixed'); }
        } else {
            header.removeClass('fixed');
        }
    });

    $(".burger").on("click", function () {
        $(this).toggleClass("open");
        $(".menu").toggleClass("open");
        $(".header").toggleClass("open");
        $("body").toggleClass("no-scroll");
        hold_scroll_page($(this).hasClass('open'))
    })

    $("#started__link, .started__link").on("click", function (e) {
        e.preventDefault();
        $(".popup-contactNew").addClass("open");
        $("body").addClass("no-scroll");
        hold_scroll_page(true);
    });

    $(".popup-container").css("display", "block")

    // popup

    $(".popup__close svg").on("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        $('.popup').removeClass("open");
        $(".menu").removeClass("open");
        $("body").removeClass("no-scroll");
        $(".header , .burger").removeClass("open");
        hold_scroll_page(false);
        if ($(e.target).closest('.sign-up-newlsetter-block').length) showHideSignUpNewlsetter(false);
    })
    $(".popup-layer").on("click", function (e) {
        e.preventDefault();
        $(this).parent().removeClass("open");
        hold_scroll_page(false);

        $('.popup').removeClass("open");
        $(".menu").removeClass("open");
        $("body").removeClass("no-scroll");
        $(".header , .burger").removeClass("open");

    });


    $(".header__nav a, .menu__nav a").click(function (event) {
        var id = $(this).attr("href").replace("/", '');
        if ($(id).length) {
            event.preventDefault();
            scrollTo("body, html", $(id).offset().top - 25);
            if (window.innerWidth <= 625 && $('.burger').hasClass('open')) {
                $('.burger').click()
            }
        }
    });

    $(".header__nav a[href='#open-popup']").on("click", function (e) {
        $(".popup-contactNew").addClass("open");
        $("body").addClass("no-scroll");
        e.preventDefault();
        hold_scroll_page(true);
    })

    $(".menu__nav a:last-child").on("click", function (e) {
        $(".popup-contactNew").addClass("open");
        $("body").addClass("no-scroll");
        e.preventDefault();
        hold_scroll_page(true);
    })
    aos_init();
    check_resize();

    $(".your_contact_person blockquote").each(function () {
        if ($(this).find(".signature").length) {
            $(this).addClass("hasSignature");
        }
    })

    // end ready
});


function aos_init() {
    $(".aos").attr("data-aos", "fade-up");
    setTimeout(() => {
        AOS.init({
            duration: 500,
            once: true,
            easing: "ease-out-quad"
        });
    }, 500);
};

var windowLoad = false;
$(window).load(function () {
    windowLoad = true;
});

function scrollTo(block, scrollTop, time = 1) {
    $(block).animate({
        scrollTop: scrollTop
    }, time * 1000);
};



function prefix(index) {
    return index < 10 ? "0" + index : index;
};




function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);
    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);
    return scrollbarWidth;
}

$(".static-intro_tablet_desc").click(function () {
    const href = $(this).data("video");
    const div = $(".overlay-video .overlay-video-box div");
    if (!div.find('iframe').length) {
        div.append(`<iframe
        class="yt_player_iframe"
        width="100%"
        height="100%"
        src="${href}"
        frameborder="0"
      ></iframe>`)
    }
    $("#overlay-video").fadeIn();
})

$(".close-video").click(function () {
    let iframe = $(this).closest('.overlay-video').find('iframe')
    iframe[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    $(this).closest('.overlay-video').fadeOut();
});