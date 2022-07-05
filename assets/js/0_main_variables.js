const isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
const isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i) ? true : false;
const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const page_content = $(window);
const mobile = device.mobile();
const tablet = device.tablet();
let headerSmall = false;
let header, scroll_top;
let bufer = 0;
let buferMax = isSafari ? 10 : isFirefox ? 30 : 200;
let window_width = $(window).innerWidth();
let window_height = $(window).innerHeight();
let menu_btn_access = true;
let animTime = 250;



if (isMacLike) $("body, html").addClass("isMacLike");
if (isSafari) $("body, html").addClass("isSafari");