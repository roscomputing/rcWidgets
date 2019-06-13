const consts = require('./consts');

let baseEl;
let externalLog;
let overflowMem;

const log = function (v) {
    (typeof externalLog === 'function' && externalLog(v)) || console.log(v);
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

    let left = parseInt(wPopup.css('left'));
    let y = 0;

    if (pos.y) {
        let frame = $(window).height();
        if (pos.y < frame) {
            y = pos.y;
        } else {
            let framesCount = Math.ceil(pos.y / frame);
            let topOfCurrentFrame = (frame * (framesCount - 1));
            y = pos.y - window.scrollY;
        }
    }

    if (pos.x) {
        left = Math.max(Math.min(pos.x , $(window).width() - wPopup.width() - 50), 10);
    }

    $(wPopup).css('top', Math.max(y, 10));
    $(wPopup).css('left', left);
};

const setYCenterPosition = function (wPopup) {
    $(wPopup).css('top', (window.scrollY || 0) + (window.innerHeight / 2));
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

    externalLog = params.log;

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

const initTemplates = function (el, template, templateSelector, isPopupMode, kendoTemplates) {
    el.html(`<div class="w-popup-background${isPopupMode ? ' popup-mode' : ''}"></div>`);

    let t = $(`<div>${template}</div>`);
    let mainTemplate = t.find(templateSelector).html();

    if (kendoTemplates && kendoTemplates.length) {
        kendoTemplates.forEach((v) => {
            let tn = v.templateName;
            let id = `#${tn}`;
            let kt = t.find(id);
            let ut = v.userTemplate;


            if (ut) {
                let id = `${tn}-${$(el).attr('id')}`;
                let re = new RegExp(tn, 'g');
                let newTemplateHtml = kt.html().replace('#: name #', ut).replace(re, id);

                mainTemplate = mainTemplate.replace(re, id);
                kt.html(newTemplateHtml);
                kt.attr('id', id);
            }

            if (!$(id).length) {
                $('body').prepend(kt)
            }
        });
    }

    el.append(mainTemplate);
};

const bindViewModel = function (el, vm) {
    vm = kendo.observable(vm);

    kendo.bind(el.find('> .w-popup'), vm);
    vm.init();

    return vm;
};

const getHtml = function(data) {
    if (!data.remote_id)
        return '';

    if (!consts.video.services[data.source])
        return '';

    let html = consts.video.services[data.source].html;

    html = html.replace(/<%= remote_id %>/g, data.remote_id);
    return html;
};

const setMainOverflow = function (isShow) {
    let html = $('html');
    if (isShow) {
        overflowMem = html.css('overflow');
        html.css('overflow', 'hidden');
    } else {
        html.css('overflow', overflowMem);
    }
};

module.exports = {
    libraryInitialAction,
    anyWidgetInitialActions,
    findWidgetPos,
    log,
    bindViewModel,
    getHtml,
    initTemplates,
    setMainOverflow,
    setYCenterPosition
};