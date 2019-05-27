const $ = require("jquery");

const getGuid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

const findWidgetPos = function(wPopup, pos) {
    if (!pos) {
        return false;
    }

    let height = pos.height || wPopup.outerHeight();
    let left = parseInt(wPopup.css('left'));
    let y = 0;

    if (pos.y) {
        y = Math.max(Math.min(pos.y, $(window).height() - height - 10), 50);
    }

    if (pos.x) {
        left = Math.max(Math.min(pos.x , $(window).width() - wPopup.width() - 50), 10);
    }

    $(wPopup).css('top', Math.max(y, 10));
    $(wPopup).css('left', left);
};

const anyWidgetInitialActions = function (params) {
    if (!params || !params.selector || !$(params.selector).length) {
        return false;
    }

    let baseEl = $(params.selector).addClass('rc-widgets');
    let el = $(`<div id="${getGuid()}"></div>`);

    el.appendTo(baseEl);
    return el;
};

const addKendoTemplateToPage = function (id ,template) {
    if (!$(id).length) {
        $('body').prepend(template)
    }
};

module.exports = {
    anyWidgetInitialActions,
    findWidgetPos,
    addKendoTemplateToPage
};