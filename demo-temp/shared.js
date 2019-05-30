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
    var leftLinkSelector = '.left-menu .menu li a';

    function onLeftMenuClick (e) {
        var target = $(e.target);
        var widget = target.data('widget');
        var selectedKey = 'selected';
        if (widget) {
            $('.main-container .widget').hide();
            $('.main-container .' + widget).show();
            $(leftLinkSelector).removeClass(selectedKey);
            target.addClass(selectedKey);
            window.location.hash = widget;
            window.scrollTo(0,0);
        }
        return false;
    }

    // Наброски
        // Rotate
            var deg = 0; 
                $('.theme-checkout button').on('click', function(e) {
                    $('#theme-rotate').animateRotate(deg, deg + 180, 300);

                    deg += 180;

                    if (deg > 360)
                        deg = deg % 360;

                    $('.theme-checkout button').animate({scrollTop: 44 * parseInt(deg / 180)}, '300', function() {
                        if (parseInt(deg / 180) === 2)
                            setTimeout(function() {
                                $('.theme-checkout button').scrollTop(0);
                            })
                    });

                    if (parseInt(deg / 180) === 1)
                        $('body').addClass('theme-dark');
                    else
                        $('body').removeClass('theme-dark');
                });
        // Scroll

            window.onscroll = function() {
                var navSelector = '.nav-menu';
                if (!$(navSelector).length)
                    return true;

                var scrollTop = Math.max(document.body.scrollTop, window.pageYOffset, document.documentElement.scrollTop, (document.scrollingElement ? document.scrollingElement.scrollTop || 0 : 0));
                if (scrollTop > $(navSelector).offset().top)
                    $('body').addClass('fixed-header');
                else
                    $('body').removeClass('fixed-header');

            };

            $('body').on('scroll', window.onscroll);
            $(window).trigger('scroll');

        // Code
    $('pre.highlight code:not(.hljs)').each(function(i, block) {
        hljs.highlightBlock(block);
    });

        // Left menu
    $('.left-menu-toggle, .left-menu .close').on('click', function() {
        $('html').toggleClass('opened');
    });

    $(leftLinkSelector).on('click', onLeftMenuClick);

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

    onLeftMenuClick({ target: $(leftLinkSelector + '.' +(window.location.hash ? window.location.hash.substring(1) : 'general'))[0]});
});
