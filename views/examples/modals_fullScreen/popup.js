// popup.js
const popup = {
    hide_popup_timer: undefined,
    openModal: false,
    timeAnimation: 1,
    ease: 'Power3.easeInOut',
    easeFast: 'Power4.easeInOut',
    show: function (target_block, event, $this) {
        $(".popup_bg").show(0);
        const block = $("div.popup_block").filter("." + target_block);
        let blockWidth, blockHeight;
        let fullWidth = block.hasClass("fullWidth");
        if (this.openModal) {
            blockWidth = block.innerWidth();
            blockHeight = block.innerHeight();
        } else {
            block.show();
            blockWidth = block.innerWidth();
            blockHeight = block.innerHeight();
            // block.hide(0);
        }
        block.find(".popupContent").scrollTop(0);
        block.show();
        block.find(".popupWrap").removeClass("flex");
        if (block.find(".popupContent")[0].clientHeight == block.find(".popupContent")[0].scrollHeight) {
            block.find(".popupWrap").addClass("flex");
        }
        block.hide(0);
        let set_time = 0;
        if (this.openModal) {
            block.show(0);
            let visibleBlock = $(".popup_block:visible");
            let blockWidth = visibleBlock.innerWidth();
            animateFromTo(visibleBlock[0], this.timeAnimation / 2, {}, { x: fullWidth ? 150 : blockWidth, opacity: 0, ease: this.ease })
            // если есть видимая модалка то даем ей плавно скрыться
            set_time = this.timeAnimation * 1000 / 2;
        }
        // 
        this.openCallBuck(target_block);
        // 
        setTimeout(() => {
            // !isMacLike ? hold_scroll_page(true) : '';
            hold_scroll_page(true)
            $(".popup_block").removeAttr("style");
            if ($($this).is("a")) {
                event.preventDefault();
                // если такнули на ссылку то убираем стандартный обработчик клика
            }
            clearTimeout(this.hide_popup_timer);
            block.css("height", "");
            block.find(".content_wrap_inner").scrollTop(0);
            block.stop(true).show();
            setTimeout(() => {
                $("body, html").css("overflow", 'hidden');
                $("html").css({ paddingRight: getScrollbarWidth() })
            }, this.timeAnimation / 2 * 1000);
            animateFromTo(block[0],
                this.timeAnimation,
                {
                    opacity: !fullWidth,
                    x: fullWidth ? 150 : blockWidth
                },
                {
                    opacity: 1,
                    x: 0,
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
        // const block = $(".popup_block:visible");
        let target_blockDiv = $("div.popup_block").filter("." + target_block);
        const block = target_blockDiv.length ? target_blockDiv : $(".popup_block:visible");
        block.find(".logo").fadeTo(250, 0)
        let blockWidth = block.innerWidth();
        let blockHeight = block.innerHeight();
        let fullWidth = block.hasClass("fullWidth");
        if (this.openModal || $(".popup_block:visible").length) {
            setTimeout(() => {
                $("body, html").css("overflow", '');
                $("html").css({ paddingRight: '' })
            }, this.timeAnimation / 2 * 1000);
            animateFromTo(block[0], this.timeAnimation, {},
                {
                    opacity: !fullWidth,
                    x: fullWidth ? 250 : blockWidth,
                    ease: this.ease,
                    onComplete: () => {
                        block.find(".content_wrap_inner, .popupWrap").scrollTop(0);
                        $(".popup_bg, .popup_block, .popup_bg").hide();
                        hold_scroll_page(false);
                        // !isMacLike ? hold_scroll_page(false) : '';
                        // initScrollAnimBlock();
                        this.openModal = false;
                        $(".popup_bg").css("z-index", '');
                        $("header").css("z-index", '');
                    },
                }
            );
        };
        this.closeCallBuck(block);
    },
    openCallBuck: function (target_block) {

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
    } else {
        area = $(e.target);
    };
    var parentPopup = $(e.target).closest(".popupContent, .mobile_row").length || $(e.target).hasClass('.popupContent');
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