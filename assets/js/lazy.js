function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
};

function changeImgSrc(element) {
    element.attr("used-webp", true);
    element.attr("data-src-default", element.data("src"));
    if (element[0].hasAttribute("data-webp") && element.data("webp").length > 0) {
        element.attr("data-src", element.data("webp"));
    };
    if (element[0].hasAttribute("data-webp-retina") && element.data("webp-retina").length > 0) {
        element.attr("data-retina", element.data("webp-retina"));
    };
};

function lazyImportant(support = false) {
    $('.lazyImportant:not(.init)').each(function () {
        if (support && $(this).attr('data-webp')) changeImgSrc($(this))
        $(this).attr("src", $(this).attr("data-src"));
        $(this).addClass('init')
    })
}

var initSimpleLazy = function () {
    testWebP(function (support) {
        $('.lazyWebp:not(.init)').lazy({
            visibleOnly: true,

            beforeLoad: function (element) {
                if (support) changeImgSrc(element);
            },
            onError: function (element) {
                if (support && element.attr("used-webp") == 'true') {
                    console.log('error load webp image, src =', '"' + element.attr("data-src") + '"');
                    element.attr("src", element.attr("data-src-default"));
                }
            },
            afterLoad: function (element) {
                $(element).addClass('init')
                $(element).css({
                    'visibility': 'visible',
                }).fadeTo(250, 1)
            },
        });
        if (support) $(".swiper-container .swiper-lazy.webp").each(function () { changeImgSrc($(this)) });

        lazyImportant(support)
    });
    // lazy.js
    $('.lazy').lazy({
        afterLoad: function (element) {
            $(element).css({ 'visibility': 'visible' });
            if (!$(element).hasClass("noFade")) $(element).fadeTo(250, 1);
        },
    });
}

var initLazy = function () {
    testWebP(function (support) {
        $('.lazyWebp:not(.init)').lazy({
            visibleOnly: true,

            beforeLoad: function (element) {
                if (support) changeImgSrc(element);
            },
            onError: function (element) {
                if (support && element.attr("used-webp") == 'true') {
                    console.log('error load webp image, src =', '"' + element.attr("data-src") + '"');
                    element.attr("src", element.attr("data-src-default"));
                }
            },
            afterLoad: function (element) {
                $(element).addClass('init')
                $(element).css({
                    'visibility': 'visible',
                }).fadeTo(250, 1)
            },
        });
        if (support) $(".swiper-container .swiper-lazy.webp").each(function () { changeImgSrc($(this)) });
        initSwiperSliders();

        lazyImportant(support)
    });
    // lazy.js
    $('.lazy').lazy({
        afterLoad: function (element) {
            $(element).css({ 'visibility': 'visible' });
            if (!$(element).hasClass("noFade")) $(element).fadeTo(250, 1);
        },
    });
}

$(document).ready(function () {

    if ($('.intro__info').length) {
        $('.intro__mob').append($('.intro__info .intro__decor').clone())
    }
    initLazy();
    // lazy.js
});