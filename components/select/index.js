require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');
const componentsShared = require('../../shared/components');

const selectFactory = function(config) {
    let el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-select-template', config.popupMode, [{
        templateName: 'rc-select-item-template',
    }]);

    let vm = {
        popupMode: !!config.popupMode,

        title: config.title || '',

        buttons: config.buttons,
        actionButtons: config.actionButtons || [],
        actionButtonsVisible: function() {
            return this.get('actionButtons').length;
        },

        onButtonClick: function(e) {
            let button = $(e.target);

            button.closest('.rc-select').find('.active').removeClass('active');
            button.closest('li').addClass('active');

            if (!config.onlyBackgroundClose) {
                componentsShared.performClose(el, [e.data]);
            } else {
                config.callback(e.data, {
                    dontClose: true
                });
            }
        },
        close: function() {
            componentsShared.performClose(el);
        },
        onClose(e, ...onCloseParams) {
            config.callback(...onCloseParams);
        },
        init: function() {
            componentsShared.onCloseSetup(config, el, this.onClose.bind(this));

            if (this.popupMode) {
                el.find('.w-popup').addClass('no-close');
            }
        },
        show: function() {
            let wPopup = el.find('> .w-popup');

            if (config.pos) {
                shared.findWidgetPos(wPopup, config.pos);
                this.updateHeight(wPopup, el.find('> .w-popup'), config.pos);
            }

            if (config.class) {
                el.find('> .w-popup > ul').addClass(config.class);
            }

            if (!this.popupMode) {
                wPopup.addClass('showing');
            }
            shared.setMainOverflow(true);

            if (this.popupMode) {
                shared.setYCenterPosition(wPopup);
            }
        },
        destroy: function() {
            kendo.unbind(el.find('> .w-popup'));
            el.find('> .w-popup').off('mouseup');
            el.off();
            el.remove();
            shared.setMainOverflow();
        },
        updateHeight: function (wPopupList, wPopup, pos) {
            if (!wPopupList || !wPopup || !pos) {
                return;
            }

            let height = pos.height || 440;
            let y = Math.max(Math.min(pos.y - 180, $(window).height() - height), 50);

            var overflow = y + wPopup.outerHeight() > $(window).height();
            if (overflow) {
                height = $(window).height() - y;
                $(wPopupList).css('height', height);
            }
        }
    };

    return shared.bindViewModel(el, vm);
};

module.exports = function(config, callback) {
    let select;
    let data = {
        selector: config.selector,
        log: config.log,
        pos: {
            x: config.pageX || 0,
            y: config.pageY || 0,
        },
        title: config.title || '',
        popupMode: !!config.popupMode,
        buttons: config.buttons,
        class: config.class || '',
        actionButtons: config.actionButtons || [],
        onlyBackgroundClose: !!config.onlyBackgroundClose,
        callback: function(options, params) {
            callback(options, params);

            if (!params || !params.dontClose)
                select.destroy();
        }
    };

    select = selectFactory(data);
    select.show();

    return select;
};