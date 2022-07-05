var DOMAnimations = {
    slideUp: function (e, t) {
        return (
            void 0 === t && (t = 500),
            new Promise(function (o, r) {
                (e.style.height = e.offsetHeight + "px"),
                    (e.style.transitionProperty = "height, margin, padding"),
                    (e.style.transitionDuration = t + "ms"),
                    e.offsetHeight,
                    (e.style.overflow = "hidden"),
                    (e.style.height = 0),
                    (e.style.paddingTop = 0),
                    (e.style.paddingBottom = 0),
                    (e.style.marginTop = 0),
                    (e.style.marginBottom = 0),
                    window.setTimeout(function () {
                        (e.style.display = "none"),
                            e.style.removeProperty("height"),
                            e.style.removeProperty("padding-top"),
                            e.style.removeProperty("padding-bottom"),
                            e.style.removeProperty("margin-top"),
                            e.style.removeProperty("margin-bottom"),
                            e.style.removeProperty("overflow"),
                            e.style.removeProperty("transition-duration"),
                            e.style.removeProperty("transition-property"),
                            o(!1);
                    }, t);
            })
        );
    },
    slideDown: function (e, t) {
        return (
            void 0 === t && (t = 500),
            new Promise(function (o, r) {
                e.style.removeProperty("display");
                var i = window.getComputedStyle(e).display;
                "none" === i && (i = "block"), (e.style.display = i);
                var n = e.offsetHeight;
                (e.style.overflow = "hidden"),
                    (e.style.height = 0),
                    (e.style.paddingTop = 0),
                    (e.style.paddingBottom = 0),
                    (e.style.marginTop = 0),
                    (e.style.marginBottom = 0),
                    e.offsetHeight,
                    (e.style.transitionProperty = "height, margin, padding"),
                    (e.style.transitionDuration = t + "ms"),
                    (e.style.height = n + "px"),
                    e.style.removeProperty("padding-top"),
                    e.style.removeProperty("padding-bottom"),
                    e.style.removeProperty("margin-top"),
                    e.style.removeProperty("margin-bottom"),
                    window.setTimeout(function () {
                        e.style.removeProperty("height"), e.style.removeProperty("overflow"), e.style.removeProperty("transition-duration"), e.style.removeProperty("transition-property");
                    }, t);
            })
        );
    },
    slideToggle: function (e, t) {
        return void 0 === t && (t = 500), "none" === window.getComputedStyle(e).display ? this.slideDown(e, t) : this.slideUp(e, t);
    },
};