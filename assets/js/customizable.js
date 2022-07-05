
$(document).ready(function () {
    let text = '';
    if ($('.b-advantages-4').length){
        text = $(".customizable__colors > div:first-child > .customizable__color").text();
    }
    else{
        text = $(".customizable__color").first().text();
    }

    let needResetTabs = false;
    function resetTabs() {
        needResetTabs = false;
        console.log('resetTabs');
        $(".customizable").css("background", "rgb(9, 95, 236)");
        $(".calculate").css("background", "rgb(9, 95, 236)");
        console.log('text', text)
        $(".customizable__color.active").text(text)
        $(".customizable__color, .custom_gradient").removeClass("active")
        $(".customizable__tabs div").removeClass("active");
        $(".customizable__item").removeClass("active");
        $(".customizable__tabs div:first-child").addClass("active");
        $(".customizable__item:first-child").addClass("active");
        $(".line-nav").css("margin-left", 0);
        $(".upper-line").css("margin-left", 0);
        $(".customizable__item:nth-child(1) .customizable__photo img").removeClass("open");
        //
        $(".customizable__item:nth-child(1) .customizable__photo .customizable__photo-small img").removeClass("open");
        //
        $(".small-cart img").removeClass("small");
        $(".customizable__item:nth-child(1) .customizable__photo > img:nth-child(1)").addClass("open");
        //
        $(".customizable__item:nth-child(1) .customizable__photo .customizable__photo-small > img:nth-child(1)").addClass("open");
        //
        $(".small-cart img:nth-child(1)").addClass("small");
        const name = $('.customizable__tabs > div.active').data('name');
        $(".custom_gradient").filter(`[data-name='${name}']`).addClass('active')
    }
    $(".customizable__tabs div").on("click", function () {
        var currentTab = $(this);
        needResetTabs = true;
        let index = currentTab.data("background");
        const name = currentTab.data('name');
        $(".customizable__color, .custom_gradient").removeClass("active")
        $(".customizable__item").removeClass("active").eq($(this).index()).addClass("active");
        $(".custom_gradient").filter(`[data-name='${name}']`).addClass('active')
        $(".customizable").css("background", index).find(".customizable__tabs div").removeClass("active").eq($(this).index()).addClass("active");
        $(".calculate, .b-advantages").css("background", index);
        $(".customizable__item:nth-child(1) .customizable__photo img").removeClass("open");
        //
        $(".customizable__item:nth-child(1) .customizable__photo .customizable__photo-small img").removeClass("open");
        //
        $(".small-cart img").removeClass("small");
        $(".customizable__item:nth-child(1) .customizable__photo > img:nth-child(1)").addClass("open");
        //
        $(".customizable__item:nth-child(1) .customizable__photo .customizable__photo-small > img:nth-child(1)").addClass("open");
        //
        $(".small-cart img:nth-child(1)").addClass("small");
        $(".line-nav , .upper-line").css("opacity", 1);

        if (currentTab.index() == 0) {
            $(".line-nav").css("margin-left", 0);
            $(".upper-line").css("margin-left", 0);
        }
        if (currentTab.index() == 1) {
            $(".line-nav").css("margin-left", currentTab.innerWidth());
            $(".upper-line").css("margin-left", currentTab.innerWidth());
        }
        if (currentTab.index() == 2) {
            $(".line-nav").css("margin-left", currentTab.innerWidth() * 2);
            $(".upper-line").css("margin-left", currentTab.innerWidth() * 2);

        }
    })

    $(".customizable__color").on("click", function () {
        needResetTabs = true;
        let currentTab = $(this);
        let currentTabIndexFixed = $(this).parent().index() + 2;
        let currentColor = currentTab.data("background");
        $(".customizable__color").removeClass("active");
        $(".customizable__color, .custom_gradient").removeClass("active")
        currentTab.css("background", currentColor).addClass("active");
        $(".customizable").css("background", currentColor, "opacity", 1);
        $(".calculate, .b-advantages").css("background", currentColor);

        if (currentTab.hasClass("active")) {
            $(".customizable__color").text($('.custBtn').attr('data-press'));
            currentTab.text($('.custBtn').attr('data-pressed'));
        }

        $(".customizable__item:nth-child(1) .customizable__photo img").removeClass("open");
        //
        $(".customizable__item:nth-child(1) .customizable__photo .customizable__photo-small img").removeClass("open");
        //
        $(".small-cart img").removeClass("small");
        $(".customizable__item:nth-child(1) .customizable__photo > img:nth-child(" + currentTabIndexFixed + ")").addClass("open");
        //
        $(".customizable__item:nth-child(1) .customizable__photo .customizable__photo-small > img:nth-child(" + currentTabIndexFixed + ")").addClass("open");
        //
        $(".small-cart img:nth-child(" + currentTabIndexFixed + ")").addClass("small");
    })

    if ($(".calculate").length) {
        $(window).scroll(function () {
            let st = $(this).scrollTop();
            if (needResetTabs) {
                if (st < $(".calculate").offset().top + 200) {
                    resetTabs();
                } else if (st > $(".integrations").offset().top) { resetTabs(); }
            }
        })
    }

    if ($(".b-advantages-3").length) {
        $(window).scroll(function () {
            let st = $(this).scrollTop();
            if (needResetTabs) {
                if (st < $(".b-advantages-3").offset().top + 200) {
                    resetTabs();
                } else if (st > $(".b-work-testing").offset().top) { resetTabs(); }
            }
        })
    }

    if ($(window).innerWidth() < 625) {
        $(".customizable__circle").removeClass("active");
        $(".svg-click").removeClass("active");
        $(".lenz").addClass("active");
        $(".customizable__circle:nth-child(3)").addClass("active");
        $(".customizable__circle:nth-child(3) .checkmark").addClass("active");
    }

    // svg change logo
    $(".customizable__circle").on("click", function () {
        $(".customizable__circle").find(".checkmark").removeClass("active");
        $(".customizable__circle").removeClass("active");
        $(this).find(".checkmark").addClass("active");
        $(this).addClass("active");
    })
    $(".customizable__circle--one").on("click", function () {
        $('.svg-click').removeClass("active");
        $(".optivision").addClass("active");
    })
    $(".customizable__circle--second").on("click", function () {
        $('.svg-click').removeClass("active");
        $(".glaslandia").addClass("active");
    })
    $(".customizable__circle--three").on("click", function () {
        $('.svg-click').removeClass("active");
        $(".lenz").addClass("active");
    })
    $(".customizable__circle--four").on("click", function () {
        $('.svg-click').removeClass("active");
        $(".optican").addClass("active");
    })

    // resetTabs();
    $('.customizable__photo').hide(0)
    resetTabs();
    $('.customizable__photo').show(0)

});