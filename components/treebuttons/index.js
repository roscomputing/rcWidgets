require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');

const treebuttonsFactory = function(config) {
    let el = shared.anyWidgetInitialActions(config);

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
    let onResize = function() {
        clearTimeout(onResizeTimeout);

        onResizeTimeout = setTimeout(function() {
            vm.generateColumns();
        }, 400);
    };

    let vm = {
        fields: config.fields,

        cols: [],
        checkColsExists: function() {
            return !!this.get('cols').length;
        },
        checkPopupMode: function() {
            return this.get('cols').length > 1;
        },
        checkPos: function() {
            setTimeout(function() {
                let p = el.find('.w-popup');
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
            let fields = this.get("fields").sort(function(a,b) {
                if (a.name.toUpperCase() > b.name.toUpperCase())
                    return 1;
                else
                    return -1;
            });

            let linesCount = Math.max(1, Math.ceil(($(window).height() - 161) / 42));
            let maxWidth = $(window).width() - 120;

            let colCount = 1;
            let flag = true;
            let cols = [];

            let splitFieldsByCol = function(items, linesCount) {
                let cols = [{fields: []}];
                $.each(items, function(k,v) {
                    let id = cols.length - 1;

                    if (cols[id].fields.length === linesCount) {
                        cols.push({fields: []});
                        id ++;
                    }

                    cols[id].fields.push(v);
                });

                return cols;
            };

            let getColWidth = function(fields) {
                fields = fields.sort(function(a,b) {
                    if (a.name.length + (a.buttons.length > 1 ? 20 : 0) >
                        b.name.length + (b.buttons.length > 1 ? 20 : 0)) {
                        return -1;
                    } else
                        return 1;
                });

                let pxPerSymbol = 7;

                return fields[0].name.length * pxPerSymbol + (fields[0].buttons.length > 1 ? 215 : 30);
            };

            while (flag && Math.ceil(fields.length / colCount) > linesCount) {
                colCount++;

                let w = 0;

                cols = splitFieldsByCol(fields, Math.ceil(fields.length / colCount));
                $.each(cols, function(k,v) {
                    w += getColWidth($.merge([], v.fields));
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
            let statusId = $(e.target).closest('[data-status-id]').attr('data-status-id');

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
            el.find('.w-popup').removeClass('showing');
            el.find('.w-popup').trigger('onClose');
        },


        init: function () {
            if (config.callback) {
                el.find('.w-popup').on('onClose', function () {
                    config.callback();
                });
            }

            this.generateColumns();
            window.addEventListener('resize', onResize);
        },
        show: function () {
            if (config.pos) {
                shared.findWidgetPos(el.find('> .w-popup'), config.pos);
            }
            el.find('> .w-popup').addClass('showing');
            shared.setMainOverflow(true);
        },
        destroy: function () {
            window.removeEventListener('resize', onResize);

            kendo.unbind(el.find('> .w-popup'));
            kendo.unbind(el.find('> .w-popup-background'));
            el.find('> .w-popup').off('mouseup');
            el.off();
            el.remove();
            shared.setMainOverflow();
        }
    };

    return shared.bindViewModel(el, vm);
};

module.exports = function(config, callback) {
    let treebuttons;
    let data = {
        selector: config.selector,
        log: config.log,
        pos: {
            x: config.pageX || 0,
            y: config.pageY || 0,
        },
        buttons: config.buttons || [],
        title: config.title || '',
        fields: config.fields || [],
        callback: function(button, subbutton, actionButton) {
            callback(button, subbutton, actionButton ? actionButton.slug : null);

            if (!actionButton || actionButton.close)
                treebuttons.destroy();
        }
    };

    treebuttons = treebuttonsFactory(data);
    treebuttons.show();

    return treebuttons;
};