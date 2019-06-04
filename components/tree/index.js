require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');

const treeFactory = function(config) {
    let el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-tree-template', config.popupMode, [{
        templateName: 'rc-tree-item-template',
        userTemplate: config.template
    }]);

    let vm = {
        showLoader: false,

        valuesIds: $.map(config.values || [], function(item) {
            return item.Id;
        }),
        values: config.values || [],
        checkSelected: function(e) {
            return this.get('valuesIds').indexOf(e.Id) !== -1;
        },

        maxValuesCount: config.maxValuesCount,
        onSelect: function(e) {
            if (!e || !e.data) {
                return false;
            }

            if (this.get('valuesIds').indexOf(e.data.Id) !== -1) {
                this.set('values', $.grep(this.get('values'), function(item) {
                    return item.Id !== e.data.Id;
                }));
                this.set('valuesIds', $.grep(this.get('valuesIds'), function(item) {
                    return item !== e.data.Id;
                }));
            }
            else {
                this.values.unshift(e.data);
                this.valuesIds.unshift(e.data.Id);
            }

            if (this.maxValuesCount && (this.values.length > this.maxValuesCount)) {
                this.valuesIds.pop();
                this.values.pop();
            }

            if (this.maxValuesCount === 1) {
                if (config.callback) {
                    config.callback(this.valuesIds, this.values);
                }
                return false;
            }
            return false;
        },

        items: [],

        toggleTreeItem: function(e) {
            $(e.target).closest('li').toggleClass('expanded');
            return false;
        },

        prepareAndSet: function(result) {
            this.set('items', result || []);

            setTimeout(function() {
                if (config.pos) {
                    shared.findWidgetPos(el.find('> .w-popup'), config.pos);
                }
            });
        },

        getDataForTree: function() {
            //возвращаем с сервака данные
            if (config.data && !config.url) {
                this.prepareAndSet(config.data);
            }

            if (config.url) {
                let data = JSON.stringify({});

                if (config.getAjaxData) {
                    data = config.getAjaxData({
                        skip: this.dataParams ? this.dataParams.take : 0,
                        take: this.dataParams ? this.dataParams.take : 40,
                    });
                }

                $.ajax({
                    data: data,
                    type: config.method || 'GET',
                    url: config.url,
                    success: (result) => {
                        if (config.onAjaxSuccess) {
                            result = config.onAjaxSuccess(result);
                        }
                        this.prepareAndSet(result);
                    },
                    error: function(error) {
                        source.error(error.responseJSON);
                    }
                });
            }
        },

        init: function() {
            this.getDataForTree();

            if (config.callback) {
                el.find('.w-popup').on('onClose', () => {
                    config.callback(this.get('valuesIds'), this.get('values'));
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

    return shared.bindViewModel(el, vm);
};

module.exports = function(config, callback) {
    let tree;

    let data = {
        selector: config.selector,
        log: config.log,
        pos: {
            x: config.pageX || 0,
            y: config.pageY || 0,
        },
        url: config.url,
        className: config.className,
        onAjaxSuccess: config.onAjaxSuccess,
        values: config.values || [],
        data: config.data || [],
        getAjaxData: config.getAjaxData,
        maxValuesCount: config.maxValuesCount,
        method: config.method,
        template: config.template,
        callback: function(slug, values) {
            callback(slug, values);
            tree.destroy();
        }
    };

    tree = treeFactory(data);
    tree.show();
};