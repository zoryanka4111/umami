
function hold_all_scroll_page(fix = false) {
    if (fix) {
        window.addEventListener('wheel', holdScroll, { passive: false });
        window.addEventListener('DOMMouseScroll', holdScroll, { passive: false });
        document.addEventListener('touchmove', holdScroll, { passive: false });
    } else {
        window.removeEventListener('wheel', holdScroll, { passive: false });
        window.removeEventListener('DOMMouseScroll', holdScroll, { passive: false });
        document.removeEventListener('touchmove', holdScroll, { passive: false });
    }
}

function holdScroll(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
    return false;
}

function hold_scroll_page(fix = false) {
    if (fix) {
        window.addEventListener('wheel', preventDefault, { passive: false });
        window.addEventListener('DOMMouseScroll', preventDefault, { passive: false });
        document.addEventListener('touchmove', preventDefault, { passive: false });
    } else {
        window.removeEventListener('wheel', preventDefault, { passive: false });
        window.removeEventListener('DOMMouseScroll', preventDefault, { passive: false });
        document.removeEventListener('touchmove', preventDefault, { passive: false });
    }
}

var ts;
$(document).on('touchstart', function (e) {
    ts = e.originalEvent.touches[0].clientY;
});

function preventDefault(e) {
    e = e || window.event;
    var area;
    if ($(e.target).closest(".popupContent").length) {
        area = $(e.target).closest(".popupContent");
    } else if ($(e.target).closest(".mobile_row").length) {
        area = $(e.target).closest(".wrap");
    } else if ($(e.target).closest(".menuMiddle").length) {
        area = $(e.target).closest(".menuMiddle");
    } else if ($(e.target).closest(".searchContent").length) {
        area = $(e.target).closest(".searchContent");
    } else if ($(e.target).closest(".popup-order-body").length) {
        area = $(e.target).closest(".popup-order-body")
    } else {
        area = $(e.target);
    };
    var parentPopup = $(e.target).closest(".popupContent, .mobile_row, .menuMiddle, .searchContent, .popup-order-body").length || $(e.target).hasClass('.popupContent');
    if (!parentPopup) {
        e.preventDefault();
        e.returnValue = false;
        return false;
    };
    var delta = e.deltaY || e.detail || e.wheelDelta;
    if (e.type == "touchmove") {
        var tob = e.changedTouches[0] // reference first touch point for this event
        var offset = parseInt(tob.clientY)
        if (ts < offset - 5) {
            delta = -100;
        } else if (ts > offset + 5) {
            delta = 100;
        };
    };
    if (delta <= 0 && area[0].scrollTop <= 0) {
        e.preventDefault();
    };
    if (delta > 0 && area[0].scrollHeight - area[0].clientHeight - area[0].scrollTop <= 1) {
        e.preventDefault();
    };
};

// popup.js

function hideScrollBar(hide = true) {
    if (hide) {
        $("body, html").css("overflow", 'hidden');
        $("html").css({ paddingRight: getScrollbarWidth() })
    } else {
        $("body, html").css("overflow", '');
        $("html").css({ paddingRight: '' })
    };
}