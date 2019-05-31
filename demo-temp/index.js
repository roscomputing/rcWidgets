function simpleParallax() {
    var scrolled = $(window).scrollTop() + 1;

    $.each($('.examples-box div'), function(k,v) {
        $(v).css('transform', 'translateY(-' + ((k / 3) * scrolled * 0.3) + 'px)');
    });
}

$(window).scroll(function (e) {
    simpleParallax();
});