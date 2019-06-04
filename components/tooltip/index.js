require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');

$(document).ready(function() {
    let tooltipTimeout = null;
    $(document).on("mouseenter", ".rc-tooltip", function() {
        clearTimeout(tooltipTimeout);
    });

    $(document).on("mouseenter", "[rc-tooltip]", function(e) {
        clearTimeout(tooltipTimeout);

        tooltipTimeout = setTimeout(function() {
            let t = $('.rc-tooltip');

            if (t.hasClass('move-mode')) {
                return true;
            }

            let html = $(e.target).closest('[rc-tooltip]').attr('rc-tooltip') || '';
            if (!html.trim().length) {
                t.hide();
                return false;
            }
            t.html(html);
            t.show();

            let x =  e.clientX;

            if (x + t.outerWidth() > $(window).width()) {
                x -= 20 + t.outerWidth();
            }

            let y =  e.clientY + 10;
            if (y + t.outerHeight() > $(window).height()) {
                y -= 40 + t.outerHeight();
            }

            t.css('left', x);
            t.css('top', y);
        } , 400)
    });

    $(document).on("mouseleave", "[rc-tooltip], .rc-tooltip", function() {
        clearTimeout(tooltipTimeout);

        const doIt = function() {
            let t = $('.rc-tooltip');
            t.hide();
            t.css('left', '-1000px');
        };

        if ($('.rc-tooltip a').length)
            tooltipTimeout = setTimeout(doIt, 1000);
        else
            doIt();
    });
});


const tooltipFactory = function(config) {
    let el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    el.append(template);
};

module.exports = function(config) {
    let tooltip;
    let data = {
        selector: config.selector,
        log: config.log,
    };

     tooltipFactory(data);
};