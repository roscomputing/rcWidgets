require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');
const componentsShared = require('../../shared/components');

const treeFactory = function(config) {
    const el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-tree-template', false, [{
        templateName: 'rc-tree-item-template',
        userTemplate: config.template
    }]);

    if (config.className) {
        el.addClass(config.className);
    }

    const vm = {
        showLoader: false,

        valuesIds: [],
        values: [],
        checkSelected: function(e) {
            return this.get('valuesIds').indexOf(e.id) !== -1;
        },

        maxValuesCount: config.maxValuesCount,
        onSelect: function(e) {
            if (!e || !e.data) {
                return false;
            }

            if (this.get('valuesIds').indexOf(e.data.id) !== -1) {
                this.set('values', this.get('values').filter(item => item.id !== e.data.id ));
                this.set('valuesIds', this.get('valuesIds').filter(item => item !== e.data.id));
            } else {
                this.values.unshift(e.data);
                this.valuesIds.unshift(e.data.id);
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
            result = result || [];

            this.set('items', result);

            if (result.length && config.values && config.values.length) {
                const values = [];
                const valuesIds = config.values.map(v => v.id);
                const fillValues = r => {
                    values.push(...r.filter(v => {
                        v.children && v.children.length && fillValues(v.children);
                        return valuesIds.find(vid => vid === v.id);
                    }));
                };

                fillValues (result);

                if (values && values.length) {
                    this.set('values', values);
                    this.set('valuesIds', values.map(v => v.id));
                }
            }

            setTimeout(() => {
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
                    success: result => {
                        if (config.onAjaxSuccess) {
                            result = config.onAjaxSuccess(result);
                        }
                        this.prepareAndSet(result);
                    },
                    error: error => {
                        source.error(error.responseJSON);
                    }
                });
            }
        },

        onClose() {
            config.callback(this.get('valuesIds'), this.get('values'));
        },

        init: function() {
            this.getDataForTree();
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
    let tree;

    const data = {
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
        callback: (slug, values) => {
            callback(slug, values);
            tree.destroy();
        }
    };

    tree = treeFactory(data);
    tree.show();
};
