var $lang = document.documentElement.lang;
var $itemSlider = false;
$(document).ready(function () {
    sliderMain();
    $(".works-slider").owlCarousel({
        items: 3,
        dots: false,
        nav: true,
        navText: ['<svg xmlns="http://www.w3.org/2000/svg" width="12" height="20"><path d="M.247 9.366L10.525.246a.884.884 0 011.222 0 .819.819 0 010 1.183L2.088 10l9.658 8.571a.819.819 0 010 1.184.884.884 0 01-1.221 0L.246 10.635A.812.812 0 01.001 10a.819.819 0 01.246-.635z"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="20"><path d="M11.753 9.366L1.475.246a.884.884 0 00-1.222 0 .819.819 0 000 1.183L9.912 10 .254 18.571a.819.819 0 000 1.184.884.884 0 001.221 0l10.279-9.12a.812.812 0 00.245-.634.819.819 0 00-.246-.635z"/></svg>'],
        navElement: "div",
        loop: true,
        center: true,
        responsive: {
            0: {items: 1, margin: 20},
            576: {items: 1, margin: 20},
            768: {items: 1, margin: 20},
            992: {items: 1, margin: 20},
            1200: {items: 3, margin: 24}
        }
    });
    $(".archive-works-slider").owlCarousel({
        items: 3,
        dots: false,
        nav: true,
        navText: ['<svg xmlns="http://www.w3.org/2000/svg" width="12" height="20"><path d="M.247 9.366L10.525.246a.884.884 0 011.222 0 .819.819 0 010 1.183L2.088 10l9.658 8.571a.819.819 0 010 1.184.884.884 0 01-1.221 0L.246 10.635A.812.812 0 01.001 10a.819.819 0 01.246-.635z"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="20"><path d="M11.753 9.366L1.475.246a.884.884 0 00-1.222 0 .819.819 0 000 1.183L9.912 10 .254 18.571a.819.819 0 000 1.184.884.884 0 001.221 0l10.279-9.12a.812.812 0 00.245-.634.819.819 0 00-.246-.635z"/></svg>'],
        navElement: "div",
        loop: true,
        center: true,
        responsive: {
            0: {items: 1, margin: 20},
            576: {items: 1, margin: 20},
            768: {items: 1, margin: 20},
            992: {items: 1, margin: 20},
            1200: {items: 3, margin: 20}
        }
    });
    $(".partners-slider").owlCarousel({
        items: 4,
        dots: false,
        nav: true,
        navText: ['<svg xmlns="http://www.w3.org/2000/svg" width="12" height="20"><path d="M.247 9.366L10.525.246a.884.884 0 011.222 0 .819.819 0 010 1.183L2.088 10l9.658 8.571a.819.819 0 010 1.184.884.884 0 01-1.221 0L.246 10.635A.812.812 0 01.001 10a.819.819 0 01.246-.635z"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="20"><path d="M11.753 9.366L1.475.246a.884.884 0 00-1.222 0 .819.819 0 000 1.183L9.912 10 .254 18.571a.819.819 0 000 1.184.884.884 0 001.221 0l10.279-9.12a.812.812 0 00.245-.634.819.819 0 00-.246-.635z"/></svg>'],
        navElement: "div",
        margin: 42,
        autoWidth: true,
        loop: true,
        responsive: {
            0: {items: 2, margin: 40},
            576: {items: 2, margin: 20},
            768: {items: 3, margin: 40},
            992: {items: 3, margin: 40},
            1130: {items: 4, margin: 40}
        }
    });
    $(".b-header_panel_contacts_lang").on("click", function () {
        var winW = $(window).width();
        if (winW < 992) {
            $(this).toggleClass("active")
        }
    })
});
function sliderMain() {
    $itemSlider = $("body").find(".view_clider");
    if (!$itemSlider) return;
    $(".view_clider").owlCarousel({
        items: 1,
        nav: true,
        navText: ['<svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="12" height="20"><path d="M.247 9.366L10.525.246a.884.884 0 011.222 0 .819.819 0 010 1.183L2.088 10l9.658 8.571a.819.819 0 010 1.184.884.884 0 01-1.221 0L.246 10.635A.812.812 0 01.001 10a.819.819 0 01.246-.635z"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" fill="#fff"><path d="M11.753 9.366L1.475.246a.884.884 0 00-1.222 0 .819.819 0 000 1.183L9.912 10 .254 18.571a.819.819 0 000 1.184.884.884 0 001.221 0l10.279-9.12a.812.812 0 00.245-.634.819.819 0 00-.246-.635z"/></svg>'],
        navElement: "div",
        loop: $itemSlider.data("loop"),
        autoplay: $itemSlider.data("auto"),
        autoplayTimeout: $itemSlider.data("delay"),
        autoHeight: false,
        onTranslated: function (ob) {
        }
    })
}
