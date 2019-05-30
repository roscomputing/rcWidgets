let baseEl;
let externalLog;

const log = function (v) {
    typeof (externalLog === 'function' && externalLog(v)) || console.log(v);
};

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
        let frame = $(window).height();
        if (pos.y < frame) {
            y = pos.y;
        } else {
            let framesCount = Math.floor(pos.y / frame);
            y = pos.y - (frame * framesCount);
        }
    }

    if (pos.x) {
        left = Math.max(Math.min(pos.x , $(window).width() - wPopup.width() - 50), 10);
    }

    $(wPopup).css('top', Math.max(y, 10));
    $(wPopup).css('left', left);
};

const initListener = function() {
    let wPopupShowingKey = '.w-popup.showing';

    let globalMouseDownListener = function(e) {
        if (!$(e.target).closest('.w-popup').length && !$(e.target).closest('.w-popup-background.popup-mode').length) {
            $('.w-popup.showing:last').trigger('onClose').removeClass('showing');
        }

        if ($(e.target).closest('.w-popup-close').length) {
            $(wPopupShowingKey).trigger('onClose');
            $('.w-popup').removeClass('showing');
        }
    };

    let globalKeyDownListener = function(e) {
        // esc
        if (e.keyCode === 27) {
            if ($(wPopupShowingKey).length) {
                $(wPopupShowingKey).trigger('onClose');
                $('.w-popup').removeClass('showing');

            }
        }
    };

    window.removeEventListener('keydown', globalKeyDownListener);
    window.removeEventListener('touchstart', globalMouseDownListener);
    window.removeEventListener('mouseup', globalMouseDownListener);

    window.addEventListener('keydown', globalKeyDownListener);
    window.addEventListener('touchstart', globalMouseDownListener);
    window.addEventListener('mouseup', globalMouseDownListener);
};



const libraryInitialAction = function (params) {
    if (!params || !params.selector || !$(params.selector).length) {
        return false;
    }
    baseEl = $(params.selector).addClass('rc-widgets')[0];

    initListener();
};

const anyWidgetInitialActions = function (params) {
    if (!baseEl) {
        libraryInitialAction(params);
    }

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
    libraryInitialAction,
    anyWidgetInitialActions,
    findWidgetPos,
    addKendoTemplateToPage,
    log
};