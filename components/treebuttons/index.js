require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');
const componentsShared = require('../../shared/components');

const PX_PER_SYMBOL = 7;

const treeButtonsFactory = function(config) {
    const el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-treebuttons-template', false, [{
        templateName: 'rc-treebuttons-action-buttons-item-template',
    }, {
        templateName: 'rc-treebuttons-item-template'
    }, {
        templateName: 'rc-treebuttons-fields-item-template'
    }, {
        templateName: 'rc-treebuttons-col-fields-item-template'
    }]);

    let onResizeTimeout = null;
    const onResize = () => {
        clearTimeout(onResizeTimeout);

        onResizeTimeout = setTimeout(() => { vm.generateColumns(); }, 400);
    };

    const vm = {
        fields: config.fields,

        cols: [],
        checkColsExists: function() {
            return !!this.get('cols').length;
        },
        checkPopupMode: function() {
            return this.get('cols').length > 1;
        },
        checkPos: function() {
            setTimeout(() => {
                const p = el.find('.w-popup');
                let delta = $(window).height() - (p.offset().top + p.outerHeight());

                if (delta < 0) {
                    p.css('top', p.offset().top + delta);
                }

                delta = $(window).width() - (p.offset().left + p.find('.fields').outerWidth());

                if (delta < 0) {
                    p.css('left', p.offset().left + delta);
                }
            });
        },
        generateColumns: function() {
            const fields = this.get("fields").sort((a,b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1: -1 );

            let linesCount = Math.max(1, Math.ceil(($(window).height() - 161) / 42));
            const maxWidth = $(window).width() - 120;

            let colCount = 1;
            let flag = true;
            let cols = [];

            const splitFieldsByCol = (items, linesCount) => {
                const cols = [{fields: []}];

                items.forEach(item => {
                    let id = cols.length - 1;

                    if (cols[id].fields.length === linesCount) {
                        cols.push({fields: []});
                        id ++;
                    }

                    cols[id].fields.push(item);
                });

                return cols;
            };

            const getColWidth = fields => {
                fields = fields.sort((a,b) => {
                    return a.name.length + (a.buttons.length > 1 ? 20 : 0) >
                        b.name.length + (b.buttons.length > 1 ? 20 : 0) ? -1 : 1
                });

                return fields[0].name.length * PX_PER_SYMBOL + (fields[0].buttons.length > 1 ? 215 : 30);
            };

            while (flag && Math.ceil(fields.length / colCount) > linesCount) {
                colCount++;

                let w = 0;

                cols = splitFieldsByCol(fields, Math.ceil(fields.length / colCount));

                cols.forEach(item => {
                    w += getColWidth($.merge([], item.fields));
                });

                if (w > maxWidth) {
                    colCount -= 1;
                    flag = false;
                }
            }

            linesCount = Math.ceil(fields.length / colCount);
            cols = splitFieldsByCol(fields, linesCount);

            this.set('cols', cols);
            this.checkPos();
        },

        title: config.title,
        buttons: config.buttons,

        onButtonClick: function (e) {
            const statusId = $(e.target).closest('[data-status-id]').attr('data-status-id');

            config.callback(statusId, e.data.slug);
            this.close();
        },

        onFirstButton: function(e) {
            config.callback(e.data.slug, e.data.buttons[0].slug);
            this.close();

            return false;
        },

        onFieldClick: function (e) {
            if ($(e.target).closest('li').hasClass('expanded')) {
                $(e.target).closest('li').toggleClass('expanded');
                return false;
            }

            $(e.target).closest('.fields').find('.expanded').removeClass('expanded');

            if (e.data.buttons.length > 1) {
                $(e.target).closest('li').toggleClass('expanded');
                this.checkPos();
            } else if (e.data.buttons.length) {
                config.callback(e.data.slug, e.data.buttons[0].slug);
                this.close();
            } else {
                config.callback(e.data.slug);
                this.close();
            }

            return false;
        },

        onActionButtonClick: function(e) {
            config.callback(null, null, e.data);
        },

        close: function () {
            componentsShared.performClose(el);
        },

        onClose() {
            config.callback();
        },

        init: function () {
            componentsShared.onCloseSetup(config, el, this.onClose.bind(this));
            this.generateColumns();
            window.addEventListener('resize', onResize);
        },

        show: function () {
            componentsShared.show(el, false, config.pos);
        },

        destroy: function () {
            window.removeEventListener('resize', onResize);
            kendo.unbind(el.find('> .w-popup-background'));
            componentsShared.destroy(el);
        }
    };

    return shared.bindViewModel(el, vm);
};

module.exports = function(config, callback) {
    let treeButtons;
    const data = {
        selector: config.selector,
        log: config.log,
        pos: {
            x: config.pageX || 0,
            y: config.pageY || 0,
        },
        buttons: config.buttons || [],
        title: config.title || '',
        fields: config.fields || [],
        callback: (button, subbutton, actionButton) => {
            callback(button, subbutton, actionButton ? actionButton.slug : null);

            if (!actionButton || actionButton.close)
                treeButtons.destroy();
        }
    };

    treeButtons = treeButtonsFactory(data);
    treeButtons.show();

    return treeButtons;
};
