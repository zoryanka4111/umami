// popup.js
const popup = {
    hide_popup_timer: undefined,
    shift: 100,
    openModal: false,
    timeAnimation: 0.75,
    ease: 'Power3.easeInOut',
    easeFast: 'Power4.easeInOut',
    show: function (target_block, event, $this) {
        $(".popup_bg").fadeIn(animTime * 2);
        const block = $("div.popup_block").filter("." + target_block);
        let fullWidth = block.hasClass("fullWidth");
        block.find(".popupContent").scrollTop(0);
        let set_time = 0;
        if (this.openModal) {
            let visibleBlock = $(".popup_block:visible");
            let blockWidth = visibleBlock.innerWidth();
            animateFromTo(visibleBlock, this.timeAnimation / 2, {}, { y: this.shift / 2, opacity: 0, ease: this.easeFast })
            // если есть видимая модалка то даем ей плавно скрыться
            set_time = this.timeAnimation * 1000 / 2;
        }
        // 
        this.openCallBuck(target_block, block);
        // 
        setTimeout(() => {
            hold_scroll_page(true)
            $(".popup_block").removeAttr("style");
            if ($($this).is("a")) {
                event.preventDefault();
                // если тыкнули на ссылку то убираем стандартный обработчик клика
            }
            clearTimeout(this.hide_popup_timer);
            block.css("height", "");
            block.find(".content_wrap_inner").scrollTop(0);
            block.stop(true).show();
            hideScrollBar(true);
            animateFromTo(block[0],
                this.timeAnimation,
                {
                    opacity: 0,
                    y: this.shift
                },
                {
                    opacity: 1,
                    y: 0,
                    ease: this.ease,
                    onComplete: () => {
                        if (target_block == 'iframe' || target_block == 'fullCalc') {
                            block.find(".logo").fadeTo(250, 1);
                        } else {
                            $('body').removeClass("showLogo");
                        }
                        this.openModal = true;
                        block.find(".content_wrap_inner, .popupWrap").scrollTop(0);
                        block.css("transform", '')
                    },
                }
            );
        }, set_time);
    },
    hide: function (target_block) {
        $('body').removeClass("showLogo");
        let target_blockDiv = $("div.popup_block").filter("." + target_block);
        const block = target_blockDiv.length ? target_blockDiv : $(".popup_block:visible");
        block.find(".logo").fadeTo(250, 0)
        let blockWidth = block.innerWidth();
        let blockHeight = block.innerHeight();
        let fullWidth = block.hasClass("fullWidth");
        if (this.openModal || $(".popup_block:visible").length) {
            setTimeout(() => {
                $(".popup_bg").fadeOut(animTime * 2);
                hideScrollBar(false);
            }, this.timeAnimation / 2 * 1000);
            animateFromTo(block[0], this.timeAnimation, {},
                {
                    opacity: 0,
                    y: this.shift,
                    ease: this.ease,
                    onComplete: () => {
                        block.find(".content_wrap_inner, .popupWrap").scrollTop(0);
                        $(".popup_block").hide();
                        hold_scroll_page(false);
                        this.openModal = false;
                        $(".popup_bg").css("z-index", '');
                        $("header").css("z-index", '');
                    },
                }
            );
        };
        this.closeCallBuck(block);
    },
    openCallBuck: function (target_block, block) {
        switch (target_block) {
            case 'loginPopup':
                block.find(".authorizationForm").removeClass("forgotPasswordNow passwordSent");
                block.find(".forgotPasswordContent, .forgotDoneText").hide(0);
                break;
            default:
                break;
        }
    },
    closeCallBuck: function (target_block) {

    }
}

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
        // $(document).on("touchmove", preventDefault)
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
    } else {
        area = $(e.target);
    };
    var parentPopup = $(e.target).closest(".popupContent, .mobile_row, .menuMiddle, .searchContent").length || $(e.target).hasClass('.popupContent');
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