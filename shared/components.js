const shared = require('./index');

const onCloseSetup = function (config, el, onClose) {
    if (el && el.length && config && typeof config.callback === 'function') {
        el.find('.w-popup').on('onClose', onClose);
    }
};

const performClose = function(el, onCloseParams) {
    el.find('> .w-popup').trigger('onClose', onCloseParams);
    el.find('> .w-popup').removeClass('showing');
    el.find('.w-popup').removeClass('no-close');
    el.find('.w-popup').off('onClose');
};

const destroy = function (el) {
    let wPopup = el.find('> .w-popup');
    kendo.unbind(wPopup);
    wPopup.off('mouseup');
    el.off();
    el.remove();
    shared.setMainOverflow();
};

const show = function (el, isCentered, pos, isPopupMode) {
    let wPopup = el.find('> .w-popup');
    !isPopupMode && wPopup.addClass('showing');
    shared.setMainOverflow(true);

    if (isCentered) {
        shared.setYCenterPosition(wPopup);
    } else if (pos) {
        shared.findWidgetPos(el.find('> .w-popup'), pos);
    }
};

module.exports = {
    onCloseSetup,
    performClose,
    destroy,
    show
};