var pricingSlider;
$(document).ready(function () {
    var most_popular = $('.most_popular');
    var price_item_individual = $('.price__item-individual');
    var store_storage = document.getElementById('store_storage');
    var employee_storage = document.getElementById('employee_storage');
    var pcalc = document.getElementById('pcalc');
    var pcalc2 = document.getElementById('pcalc2');
    var per_store_base_price = parseFloat(jQuery('.per_store_base_price').val());
    var per_emp_base_price = parseFloat(jQuery('.per_emp_base_price').val());
    let total = 0;
    jQuery('.pricing_inner--text').each(function () {
        total = parseFloat($(this).text());
        $(this).text(total.toFixed(2));
    });
    jQuery('.monthly_base_price').each(function () {
        total = parseFloat($(this).val());
        $(this).val(total.toFixed(2));
    });

    if (store_storage) {
        noUiSlider.create(store_storage, {
            start: 0,
            connect: "lower",
            step: 1,
            range: {
                'min': 1,
                'max': 6
            },
            format: {
                from: function (value) {
                    return parseInt(value);
                },
                to: function (value) {
                    return parseInt(value);
                }
            }
        });
        if (employee_storage) {
            noUiSlider.create(employee_storage, {
                start: 0,
                connect: "lower",
                step: 1,
                range: {
                    'min': 1,
                    'max': 41
                },
                format: {
                    from: function (value) {
                        return parseInt(value);
                    },
                    to: function (value) {
                        return parseInt(value);
                    }
                }
            });
        }
        pcalc.innerHTML = store_storage.noUiSlider.options.range.min;
        store_storage.noUiSlider.on('update', function (values, handle) {
            if (values < 6) {
                pcalc.innerHTML = values[handle];
                $('.stores-count').text(values);
                $('.pricing_lower').removeClass('store-blocked');
                if (employee_storage.noUiSlider.get() < 41) {
                    most_popular.addClass('most_popular');
                    price_item_individual.removeClass('most_popular');
                }
                if (employee_storage.noUiSlider.get() > 40) {
                    most_popular.removeClass('most_popular');
                    price_item_individual.addClass('most_popular');
                    slideToIndividualSlide();
                }
            }
            else {
                pcalc.innerHTML = '5+';
                $('.stores-count').text('5+');
                $('.pricing_lower').addClass('store-blocked');
                most_popular.removeClass('most_popular');
                price_item_individual.addClass('most_popular');
                slideToIndividualSlide();
            }
        });
        store_storage.noUiSlider.on('change', function () {
            calculate_on_slide();
            if ($(".pricing .switch input").attr("data-off") == 'false') {
                count_discount();
            }
        });
    }
    if (employee_storage) {
        pcalc2.innerHTML = employee_storage.noUiSlider.options.range.max;
        employee_storage.noUiSlider.on('update', function (values, handle) {
            if (values < 41) {
                pcalc2.innerHTML = values[handle];
                $('.employees-count').text(values);
                $('.pricing_lower').removeClass('employee-blocked');
                if (store_storage.noUiSlider.get() < 6) {
                    most_popular.addClass('most_popular');
                    price_item_individual.removeClass('most_popular');
                }
                if (store_storage.noUiSlider.get() > 5) {
                    most_popular.removeClass('most_popular');
                    price_item_individual.addClass('most_popular');
                    slideToIndividualSlide();
                }
            }
            else {
                pcalc2.innerHTML = '41+';
                $('.employees-count').text('41+');
                $('.pricing_lower').addClass('employee-blocked');
                most_popular.removeClass('most_popular');
                price_item_individual.addClass('most_popular');
                slideToIndividualSlide();
            }
        });
        employee_storage.noUiSlider.on('change', function () {
            calculate_on_slide();
            if ($(".pricing .switch input").attr("data-off") == 'false') {
                count_discount();
            }
        });
    }

    function calculate_on_slide() {
        jQuery('.price__item').each(function () {
            const number_of_stores = parseInt(jQuery('#pcalc').text()) - 1;
            const number_of_emp = parseInt(jQuery('#pcalc2').text()) - 1;
            total = parseFloat($(this).find('.monthly_base_price').val()) + (per_store_base_price * number_of_stores) + (per_emp_base_price * number_of_emp);
            jQuery(this).find('.pricing_inner--text').text(total.toFixed(2))
        });
    }

    let yearly_discount = parseFloat(jQuery('#cloud_tss_price').data('text')) || 0;
    function count_discount() {
        jQuery('.price__item').each(function () {
            const monthly_price = jQuery(this).find('.pricing_inner--text').text();
            const yearly_price = (parseFloat(monthly_price) * 12);
            const yearly_discount_price = (yearly_price * yearly_discount) / 100;
            const final_amount = yearly_price - yearly_discount_price;
            jQuery(this).find('.pricing_inner--text').text(final_amount.toFixed(2));
        });
    }
    $(".pricing .switch input").on('change', function () {
        if ($(".pricing .switch input").attr("data-off") == 'true') {
            $(".pricing .switch input").attr("data-off", 'false');
            $(".price_white_outer_right").addClass('data-anually');
            $(".duration_wrap").html('EUR <span>/year</span>');
            count_discount();
        }
        else if ($(".pricing .switch input").attr("data-off") == 'false') {
            $(".pricing .switch input").attr("data-off", 'true');
            $(".price_white_outer_right").removeClass('data-anually');
            $(".duration_wrap").html('EUR <span>/month</span>');
            calculate_on_slide();
        }
    })
});

var slideToIndividualSlide = function () {
    if (pricingSlider) pricingSlider.slideTo(pricingSlider.slides.length - 1)
}

$(document).ready(function () {
    if ($(".pricing__list").length) {
        const checkPagination = (slider) => {
            const count = slider.pagination.bullets.length
            $(slider.wrapperEl).parent()[count == 1 ? 'addClass' : 'removeClass']('hidePagination')
        }
        pricingSlider = new Swiper(".pricing__list", {
            speed: 800,
            slidesPerView: 5,
            spaceBetween: 30,
            initialSlide: 2,
            centeredSlides: false,
            breakpoints: {
                625: { spaceBetween: 30, slidesPerView: 1, centeredSlides: false },
                991: { spaceBetween: 30, slidesPerView: 2, centeredSlides: true },
                1240: { spaceBetween: 30, slidesPerView: 3, centeredSlides: false },
                1601: { spaceBetween: 30, slidesPerView: 4, centeredSlides: false },
                1950: { spaceBetween: 30, slidesPerView: 5, centeredSlides: false },
            },
            grabCursor: true,
            pagination: { el: ".swiper-pagination", clickable: !0 },
            on: {
                init: function () {
                    setTimeout(() => { checkPagination(this) }, 150);
                    setTimeout(() => { checkPagination(this) }, 1500);
                },
                slideChange: function () {
                    setTimeout(() => { checkPagination(this) }, 150);
                },
                update: function () {
                    setTimeout(() => { checkPagination(this) }, 150);
                },
            },
        })

        $(".order__link").on("click", function (a) {
            a.preventDefault();
            var b = $(this).parents(".part-bot").siblings(".part-top"),
                c = $(b).find("img").last().attr("src"),
                d = $(b).find(".pricing_inner--title").text(),
                e = $(b).find(".pricing_wrapper .pricing_inner--text").text(),
                f = $(b).find(".pricing_wrapper .duration_wrap").data('value'),
                g = $(b).find(".list_item li").first().text(),
                h = $(b).find(".list_item .stores-count").text(),
                i = $(b).find(".list_item .employees-count").text(),
                j = $('.pricing .switch_no_tss input').prop("checked") ? $('.cloud_tss_info label').text() : $('.switch_no_tss label').text();
            // 
            $(".popup-order .popup-order-info .details img").attr("src", c);
            $(".popup-order .popup-order-info .details .right h3").text(d);
            $(".popup-order .popup-order-info .details .right .pricing_wrapper h4").text(e);
            $(".popup-order .popup-order-info .details .right .pricing_wrapper p").html(f);
            $(".popup-order .popup-order-info .details .right .list_item li").first().text(g);
            $(".popup-order .popup-order-info .details .right .list_item .stores-count").text(h);
            $(".popup-order .popup-order-info .details .right .list_item .employees-count").text(i);
            $(".popup-order .popup-order-info .details .right .list_item li").last().text(j);
            $(".popup-order").addClass("open");
            hold_scroll_page(!0);
        });


    }

    $("#started__link, .started__link").on("click", function (e) {
        e.preventDefault();
        $(".popup-contactNew").addClass("open");
        $("body").addClass("no-scroll");
        hold_scroll_page(true);
    });
    $("body").on("click", ".details-btn", function (e) {
        var detalSpan = $(this).find('span');
        var detalShow = detalSpan.data('detal-view');
        var detalHide = detalSpan.data('detal-hide');
        $(this).toggleClass('active');
        $(this).prev().find('.list_item').slideToggle(300);
        if ($(this).hasClass('active')) {
            detalSpan.text(detalHide);
        }
        else {
            detalSpan.text(detalShow);
        }
    });
})