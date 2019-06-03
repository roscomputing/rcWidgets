require('../../shared/dev-styles');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');

const autocompleteFactory = function(config) {
    let el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-autocomplete-template', false, [{
        templateName: 'rc-autocomplete-item-template',
    }, {
        templateName: 'rc-autocomplete-button-item-template'
    }]);

    let vm = {
        // Buttons
        onButtonClick: function(e) {
            el.find('.w-popup').off('onClose').on('onClose', function() {
                config.callback([], e.data.slug);
            });
            el.find('> .w-popup').removeClass('showing');
            el.find('> .w-popup').trigger('onClose');
        },
        buttons: config.buttons ? config.buttons : [],

        // Values
        values: config.values ? config.values : [],
        valuesExists: function() {
            return !!this.get('values').length;
        },

        // Finded
        finded: config.finded ? config.finded : [],
        findedBackup: config.finded ? config.finded : [],
        searchStr: '',
        searchStrTimeout: null,
        searchStrChange: function() {
            this.searchStrTimeout && clearTimeout(this.searchStrTimeout);
            this.searchStrTimeout = setTimeout(() => {
                this.getPossibleValues();
            }, 300);
        },
        getPossibleValues: function() {
            let ids = $.map(this.get('values'), item => item.Id);

            if (config.url && (!this.finded.length || !config.clientSearch)) {
                let url = config.url;
                let data = JSON.stringify({
                    searchStr: this.get('searchStr')
                });

                if (config.getAjaxData) {
                    data = config.getAjaxData({
                        skip: this.dataParams ? this.dataParams.take : 0,
                        take: this.dataParams ? this.dataParams.take : 40,
                        searchStr: this.get('searchStr').trim(),
                    });
                }

                $.ajax({
                    data: {
                        searchStr: this.get('searchStr')
                    },
                    method: config.method || 'GET',
                    url: url,
                    success: (result) => {
                        if (config.onAjaxSuccess) {
                            result = config.onAjaxSuccess(result);
                        }

                        if (result) {
                            this.set('findedBackup', result);
                            this.set('finded', $.grep(result, (item) => ids.indexOf(item.Id) === -1));

                            // Тут из невыделенного убирается выделенное
                            this.set('finded', this.get('finded').filter((item) => {
                                let retVal = true;
                                $.each(this.values, (k, v) => {
                                    if (v.Id === item.Id) {
                                        retVal = false;
                                    }
                                });
                                return retVal;
                            }));
                        }
                    },
                    error: function(error) {
                        shared.log(error.responseJSON);
                    }
                });
            } else {
                this.set('finded', $.grep(this.get('findedBackup'), (item) => {
                    return (ids.indexOf(item.Id) === -1) &&
                        (item.Text.toLowerCase().indexOf(this.get('searchStr').trim().toLowerCase()) !== -1);
                }));
            }
        },

        // Click
        selectValue: function(e) {
            let isOld = $(e.target).closest('li').parent().hasClass('values');

            if (isOld) {
                this.finded.unshift(e.data);
                this.set('values', $.grep(this.get('values'), (item) => {
                    return item.Id !== e.data.Id;
                }));
                return false;
            }

            this.values.unshift(e.data);

            if (config.maxValuesCount && (this.values.length > config.maxValuesCount))
                this.finded.unshift(this.values.pop());

            // тут из невыделенного убирается выделенное
            this.set('finded', this.get('finded').filter((item) => {
                return this.values.indexOf(item) < 0;
            }));

            if (config.maxValuesCount && (this.values.length === config.maxValuesCount)) {
                el.find('> .w-popup').removeClass('showing');
                el.find('> .w-popup').trigger('onClose');
            }
        },
        init: function() {
            this.getPossibleValues();

            if (config.callback)
                el.find('.w-popup').on('onClose', () => {
                    config.callback(this.get('values'));
                });
        },
        show: function() {
            if (config.pos)
                shared.findWidgetPos(el.find('> .w-popup'), config.pos);

            el.find('> .w-popup').addClass('showing');
            el.find('input').focus();
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
    let autocomplete;

    let data = {
        selector: config.selector,
        log: config.log,
        pos: {
            x: config.pageX || 0,
            y: config.pageY || 0,
        },
        values: config.values,
        finded: config.finded,
        method: config.method,
        getAjaxData: config.getAjaxData,
        onAjaxSuccess: config.onAjaxSuccess,
        maxValuesCount: config.maxValuesCount,
        clientSearch: config.clientSearch,
        callback: function(values) {
            callback(values);

            autocomplete.destroy();
        }
    };

    if (config.url) {
        data.url = config.url;
    }

    autocomplete = autocompleteFactory(data);
    autocomplete.show();

    return autocomplete;
};