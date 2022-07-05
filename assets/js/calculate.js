$(document).ready(function () {
    var slider = document.getElementById('calculate__range');
    var slider1 = document.getElementById('calculate__range1');
    var calc = document.getElementById('calc');
    var calc2 = document.getElementById('calc2');
    let calcValue2 = 0;
    let calcValue1 = 0;

    // noui calculator
    if (slider) {
        noUiSlider.create(slider, {
            start: 0,
            value: 1000,
            connect: "lower",
            range: {
                'min': 1000,
                'max': 25000
            },
            step: 2400,
            format: {
                from: function (value) {
                    return parseInt(value);
                },
                to: function (value) {
                    return parseInt(value);
                }
            }
        });
        calc.innerHTML = slider.noUiSlider.options.range.min;
        slider.noUiSlider.on('update', function (values, handle) {
            calcValue2 = values[handle];
            calc2.innerHTML = values[handle] + " €";
            calculate2();
        });
        $('<div class="range-dots"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>').insertAfter('#calculate__range');
        setTimeout(() => {
            calc2.innerHTML = 1000 + " €";
        }, 1000);
    }
    if (slider1) {
        noUiSlider.create(slider1, {
            start: 0,
            connect: "lower",
            range: {
                'min': 1,
                'max': 20
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


        calc2.innerHTML = slider1.noUiSlider.options.range.max;
        slider1.noUiSlider.on('update', function (values, handle) {
            calcValue1 = values[handle];
            calc.innerHTML = values[handle];
            calculate();
        });
    }

    $(".calculate__item:first-child .calculate__radio").on("click", function () {
        $(".calculate__item:first-child .calculate__radio").removeClass("active");
        $(this).addClass("active");
        calculate();
    });
    $(".calculate__item:last-child .calculate__radio").on("click", function () {
        $(".calculate__item:last-child .calculate__radio").removeClass("active");
        $(this).addClass("active");
        if ($(this).index() == 0) {
            slider.noUiSlider.updateOptions({
                range: {
                    min: 1000,
                    max: 25000
                },
                step: 2400,
            }, false);
        } else if ($(this).index() == 1) {
            slider.noUiSlider.updateOptions({
                range: {
                    min: 5000,
                    max: 100000
                },
                step: 9500,
            }, false);
        } else {
            slider.noUiSlider.updateOptions({
                range: {
                    min: 25000,
                    max: 1000000
                },
                step: 97500,
            }, false);
        }
        calculate2();
    });

    function calculate() {
        $(".calculate__item:first-child .calculate__bottom span").text(Math.ceil(calcValue1 * $(".calculate__item:first-child .calculate__radio.active input").val() * .1));
    }

    function calculate2() {
        $(".calculate__item:last-child .calculate__bottom span").text(Math.ceil(calcValue2 * .25));
    }
});