$.fn.animateRotate = function(startAngle, endAngle, duration, easing, complete){
    return this.each(function(){
        var elem = $(this);

        $({deg: startAngle}).animate({deg: endAngle}, {
            duration: duration,
            easing: easing,
            step: function(now){
                elem.css({
                  '-moz-transform':'rotate('+now+'deg)',
                  '-webkit-transform':'rotate('+now+'deg)',
                  '-o-transform':'rotate('+now+'deg)',
                  '-ms-transform':'rotate('+now+'deg)',
                  'transform':'rotate('+now+'deg)'
                });
            },
            complete: complete || $.noop
        });
    });
};

$(document).ready(function() {
    // Наброски
        // Rotate
            var deg = 0; 
                $('.theme-checkout button').on('click', function(e) {
                    $('#theme-rotate').animateRotate(deg, deg + 180, 300);

                    deg += 180;

                    if (deg > 360)
                        deg = deg % 360;

                    $('.theme-checkout button').animate({scrollTop: 44 * parseInt(deg / 180)}, '300', function() {
                        if (parseInt(deg / 180) == 2)
                            setTimeout(function() {
                                $('.theme-checkout button').scrollTop(0);
                            })
                    });

                    if (parseInt(deg / 180) == 1)
                        $('body').addClass('theme-dark');
                    else
                        $('body').removeClass('theme-dark');
                });
        // Scroll

            window.onscroll = function(e) {
                if (!$('.nav-menu').length)
                    return true;

                var scrollTop = Math.max(document.body.scrollTop, window.pageYOffset, document.documentElement.scrollTop, (document.scrollingElement ? document.scrollingElement.scrollTop || 0 : 0));
                if (scrollTop > $('.nav-menu').offset().top)
                    $('body').addClass('fixed-header');
                else
                    $('body').removeClass('fixed-header');

            };

            $('body').on('scroll', window.onscroll);
            $(window).trigger('scroll');

        // Code
    $('pre code:not(.hljs)').each(function(i, block) {
        hljs.highlightBlock(block);
    });

        // Left menu
    $('.left-menu-toggle, .left-menu .close').on('click', function() {
        $('html').toggleClass('opened');
    });

    $('.left-menu .menu li a').on('click', function(e) {
        var widget = $(e.target).data('widget');
        if (widget) {
            $('.main-container .widget').hide();
            $('.main-container .' + widget).show();
            window.scrollTo(0,0);
        }
        return false;
    });

    $('.demo-code li').click(function() {
       var li = $(this);
       var demoCode = li.closest('.demo-code');
       var demoKey = 'demo';
       var exampleKey = 'example-code';
       var activeKey = 'active';
       var isDemo = li.hasClass(demoKey);
       var contentToShow = '.content.' + (isDemo ? demoKey : exampleKey);
       var contentToHide = '.content.' + (isDemo ?  exampleKey : demoKey);
       var buttonToDisactivate = 'li.' + (isDemo ?  exampleKey : demoKey);

       if (!li.hasClass(activeKey)) {
           li.addClass(activeKey);
       }

       demoCode.find(buttonToDisactivate).removeClass(activeKey);
       demoCode.find(contentToShow).show();
       demoCode.find(contentToHide).hide();
    });

    window.rc = rcWidgets({
        selector: '#widgets',
        log: function(message) {
            alert(message);
        }
    });

    $('.main-container .general').show();
    window.scrollTo(0,0);
});
