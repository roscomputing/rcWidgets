require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');
const componentsShared = require('../../shared/components');

const buttonsFactory = function(config) {
    let el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-buttons-template', false, [{
        templateName: 'rc-buttons-button-item-template',
        userTemplate: config.template
    }]);

    let selectedSlug;

    const vm = {
        isDark: config.isDark,
        fields: config.fields,
        title: config.title,
        buttons: config.buttons,
        onButtonClick: function(e) {
            selectedSlug = e.data.slug;
            componentsShared.performClose(el);
        },
        onClose() {
            config.callback(selectedSlug);
            selectedSlug = null;
        },
        init: function() {
            componentsShared.onCloseSetup(config, el, this.onClose.bind(this));
        },
        show: function() {
            componentsShared.show(el, false, config.pos);
        },
        destroy: function() {
            componentsShared.destroy(el);
        }
    };

    return shared.bindViewModel(el, vm);
};

module.exports = function(config, callback) {
    let buttons;
    const data = {
        selector: config.selector,
        log: config.log,
        pos: {
            x: config.pageX || 0,
            y: config.pageY || 0,
        },
        buttons: config.buttons || [],
        title: config.title,
        template: config.template,
        fields: config.fields,
        callback: function(option) {
            typeof callback === 'function' && callback(option);
            buttons.destroy();
        }
    };

    buttons = buttonsFactory(data);
    buttons.show();

    return buttons;
};
