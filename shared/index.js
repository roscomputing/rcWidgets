Date.prototype.toDateTimeString = function () {
    return (this.getHours() < 10 ? "0" + this.getHours() : this.getHours()) + ":" + (this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes())
        + " " + (this.getDate() < 10 ? "0" + this.getDate() : this.getDate()) + "." + (this.getMonth() + 1 < 10 ? "0" + (this.getMonth() + 1) : this.getMonth() + 1) + "." + this.getFullYear();
};

Date.prototype.toLocalUTCString = function () {
    return this.getFullYear()
        + "-" + pad(this.getMonth() + 1)
        + "-" + pad(this.getDate())
        + "T" + pad(this.getHours())
        + ":" + pad(this.getMinutes())
        + ":" + pad(this.getSeconds())
        + "." + String((this.getMilliseconds() / 1000).toFixed(3)).slice(2, 5)
        + "Z";
};

Date.prototype.toJSON = function() {
    return moment(this).format('YYYY-MM-DD[T]HH:mm:ss');
};

const consts = require('./consts');

let baseEl;
let externalLog;
let overflowMem;

const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

const checkEmail = function (val) {
    return val && reEmail.test(val);
};

const removeAttributes = function (contents) {
    let whitelist = ["src", "href", "style"];
    let temp = document.createElement('div');
    temp = $(temp).html(contents);

    $(temp).find('*').each(function () {
        let attributes = this.attributes;
        let i = attributes.length;
        while( i-- ) {
            let attr = attributes[i];
            if( $.inArray(attr.name,whitelist) === -1 )
                this.removeAttributeNode(attr);
        }
    });
    return $(temp).html();
};

const pasteCleanup = function(html) {
    let result;

    // Функция убирает все атрибуты всех тэгов
    // https://stackoverflow.com/a/36618964/4222953
    result = removeAttributes(html);

    // Убираем все комментарии
    // https://stackoverflow.com/a/5654032/4222953
    result = result.replace(/<!--[\s\S]*?-->/g, "");

    // Заменяем тег <p> тегом <div>
    result = result.replace(/<p>/g, "<div>");
    result = result.replace(/<\/p>/g, "</div>");

    // Удаляем все теги кроме div, br, b, u, i, strong, strike, em, li, ol, ul, a
    result = result.replace(/<(?!\s*\/?\s*(div|br|b|u|i|strike|s|del|strong|em|li|ol|ul|a)\b)[^>]*>/gi, ' ');

    // В html символы "\n" съедаются и слова "схлопываются" в одно.
    // Заменяем символ строки "\n" на пробел.
    result = result.replace(/\n/gi, " ");

    return result;
};

const htmlDecode =  function(input, keepHtml) {
    let result;

    // Преобразовуем HTTP мнемоники в обычные символы:
    // https://stackoverflow.com/a/1912522/4222953
    let e = document.createElement('div');
    e.innerHTML = input;
    result = (e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue) || input;

    if (!!input) {
        if (!keepHtml) {
            // Удаляем все теги
            result = result.replace(/(<([^>]+)>)/gi, ' ') || '';
        }

        // Заменяем дополнительно
        result = result.replace(/\n/gi, ' ') || '';
        result = result.replace(/&nbsp;/gi, '') || '';
    }

    return result;
};

const isNumberKey = function(evt) {
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
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
    setYCenterPosition,
    htmlDecode,
    checkEmail,
    pasteCleanup,
    isNumberKey
};