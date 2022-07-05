// check_resize.js
function get_responsive(responsive, window_width = $(window).innerWidth()) {
    let prev = false;
    let i;
    let responsiveArr = responsive.slice();
    responsiveArr.push(99999999)
    $.each(responsiveArr, function (index, element) {
        if (prev !== false && window_width <= responsiveArr[index] && window_width > prev) {
            i = index - 1;
            return false;
        } else {
            prev = element;
        }
    });
    return responsiveArr[i];
};
let responsiveNow;
const responsiveSteps = [0, 625, 1024];
function check_resize() {
    responsiveNow = get_responsive(responsiveSteps);
    check_resizeDo(responsiveNow);
    $(window).resize(function () {
        if (responsiveNow != get_responsive(responsiveSteps)) {
            responsiveNow = get_responsive(responsiveSteps);
            check_resizeDo(responsiveNow);
        }
    });
}
function check_resizeDo(responsiveNow) {
    switch (responsiveNow) {
        case 0:
            move_to_mobile();
            break;
        case 625:
            move_to_tablet();
            break;
        case 991:
            break;
        default:
            break;
    }
}

// check_resize.js

function move_to_mobile() {
    // empty
}

function move_to_tablet() {
    if ($(".burger").hasClass('open')) $(".burger").click();
}