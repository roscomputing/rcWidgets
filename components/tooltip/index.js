require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');

$(document).ready(function() {
    let tooltipTimeout = null;

    $(document).on("mouseenter", ".rc-tooltip", () => {
        clearTimeout(tooltipTimeout);
    });

    $(document).on("mouseenter", "[rc-tooltip]", e => {
        clearTimeout(tooltipTimeout);

        tooltipTimeout = setTimeout(function() {
            const tooltip = $('.rc-tooltip');

            if (tooltip.hasClass('move-mode')) {
                return true;
            }

            const html = $(e.target).closest('[rc-tooltip]').attr('rc-tooltip') || '';

            if (!html.trim().length) {
                tooltip.hide();
                return false;
            }

            tooltip.html(html);
            tooltip.show();

            let x =  e.clientX;

            if (x + t.outerWidth() > $(window).width()) {
                x -= 20 + t.outerWidth();
            }

            let y =  e.clientY + 10;

            if (y + t.outerHeight() > $(window).height()) {
                y -= 40 + t.outerHeight();
            }

            tooltip.css('left', x);
            tooltip.css('top', y);
        } , 400)
    });

    $(document).on("mouseleave", "[rc-tooltip], .rc-tooltip", () => {
        clearTimeout(tooltipTimeout);

        const doIt = () => {
            const t = $('.rc-tooltip');

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
