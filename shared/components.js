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


module.exports = {
    onCloseSetup,
    performClose
};