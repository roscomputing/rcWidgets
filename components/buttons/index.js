require('../../shared/dev-styles');
require('./index.less');
require('./index.theme.less');

const shared = require('../../shared/index');
const template = require('./index.html');

const initTemplates = function(el, config) {
    el.html('<div class="w-popup-background"></div>');

    let t = $(`<div>${template}</div>`);
    let mainTemplate = t.find('#rc-buttons-template').html();
    let itemTemplateName = 'rc-buttons-button-item-template';
    let itemTemplateSelector = `#${itemTemplateName}`;
    let mainItemTemplate = t.find(itemTemplateSelector);

    if (config.template) {
        let id = $(el).parent().attr('id');
        shared.addKendoTemplateToPage(`${itemTemplateSelector}-${id}`,
            mainItemTemplate.html().replace('#: name #', config.template));
    } else {
        shared.addKendoTemplateToPage(itemTemplateSelector, mainItemTemplate);
    }

    el.append(mainTemplate);
};

const buttonsFactory = function(config) {
    let el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    initTemplates(el, config);

    let vm = {
        fields: config.fields,
        title: config.title,
        buttons: config.buttons,
        onButtonClick: function(e) {
            el.find('.w-popup').off('onClose').on('onClose', function() {
                config.callback(e.data.slug);
            });
            el.find('> .w-popup').removeClass('showing');
            el.find('> .w-popup').trigger('onClose');
        },
        init: function() {
            if (config.callback) {
                el.find('.w-popup').on('onClose', function() {
                    config.callback();
                });
            }
        },
        show: function() {
            if (config.pos) {
                shared.findWidgetPos(el.find('> .w-popup'), config.pos);
            }
            el.find('> .w-popup').addClass('showing');
        },
        destroy: function() {
            kendo.unbind(el.find('> .w-popup'));
            el.find('> .w-popup').off('mouseup');
            el.off();
            el.remove();
        }
    };

    vm = new kendo.observable(vm);

    kendo.bind(el.find('> .w-popup'), vm);
    vm.init();

    return vm
};

module.exports = function(config, callback) {
    let buttons;
    let data = {
        selector: config.selector || '',
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