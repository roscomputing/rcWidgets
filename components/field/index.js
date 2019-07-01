require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');
const componentsShared = require('../../shared/components');

const fieldFactory = function(config) {
    let el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-field-template', true);

    var vm = {
        value: null,
        help: '',
        type: 'text',
        placeholder: '',
        minlength: '',
        maxlength: '',

        closeIt: function() {
            let errorCount = 0;
            let val = this.get('value');
            let f = config.field;

            let checkD = function(val, format) {
                if (!val) {
                    return false;
                }
                if (val.indexOf('_') !== -1) {
                    return true;
                }
                return moment(val, format).format() === "Invalid date";

            };

            if (f.Type === 'text') {
                let maxLength = f.Maxlength;
                let minLength = f.Minlength;
                if (val && !Number.isNaN(maxLength) && (maxLength < val.length)) {
                    errorCount++;
                    shared.log(`Длина текста не может быть больше ${maxLength}`);
                }

                if (!Number.isNaN(minLength) && (!val || (minLength > val.length))) {
                    errorCount++;
                    shared.log(`Минимальное количество символов не может быть меньше ${minLength}`);
                }
            }

            if (val && (f.Type === 'date')) {
                if (checkD(val, 'YYYY-MM-DD')) {
                    errorCount++;
                    shared.log('Не правильно введена дата. См формат данных');
                }

                if (!errorCount)
                    if (f.MaxDate && (moment(val, 'YYYY-MM-DD').diff(moment(f.MaxDate, 'YYYY-MM-DD')) > 0)) {
                        errorCount++;
                        shared.log('Дата не может быть позже ' + f.MaxDate);
                    }

                if (!errorCount)
                    if (f.MinDate && (moment(val, 'YYYY-MM-DD').diff(moment(f.MinDate, 'YYYY-MM-DD')) < 0)) {
                        errorCount++;
                        shared.log('Дата не может быть раньше ' + f.MinDate);
                    }
            }

            if (f.Type === 'datetime') {
                if (checkD(val, 'YYYY-MM-DD HH:mm')) {
                    errorCount++;
                    shared.log('Не правильно введена дата. См формат данных');
                }

                if (!errorCount)
                    if (f.MaxDatetime && (moment(val, 'YYYY-MM-DD HH:mm').diff(moment(f.MaxDatetime, 'YYYY-MM-DD HH:mm')) > 0)) {
                        errorCount++;
                        shared.log('Дата не может быть позже ' + f.MaxDatetime);
                    }

                if (!errorCount)
                    if (f.MinDatetime && (moment(val, 'YYYY-MM-DD HH:mm').diff(moment(f.MinDatetime, 'YYYY-MM-DD HH:mm')) < 0)) {
                        errorCount++;
                        shared.log('Дата не может быть раньше ' + f.MinDatetime);
                    }
            }

            if (f.Type === 'time') {
                if (checkD(val, 'HH:mm')) {
                    errorCount++;
                    shared.log('Не правильно введено время. См формат данных');
                }

                if (!errorCount)
                    if (f.MaxTime && (moment(val, 'HH:mm').diff(moment(f.MaxTime, 'HH:mm')) > 0)) {
                        errorCount++;
                        shared.log('Время не может быть позже ' + f.MaxTime);
                    }

                if (!errorCount)
                    if (f.MinTime && (moment(val, 'HH:mm').diff(moment(f.MinTime, 'HH:mm')) < 0)) {
                        errorCount++;
                        shared.log('Время не может быть раньше ' + f.MinTime);
                    }
            }

            if (val && (f.Type === 'integer')) {
                if (f.MaxI)
                    if (f.MaxI < val) {
                        errorCount++;
                        shared.log('Максимальное значение ' + f.MaxI);
                    }

                if (f.MinI)
                    if (f.MinI > val) {
                        errorCount++;
                        shared.log('Минимальное значение ' + f.MinI);
                    }
            }

            if (val && (f.Type === 'float')) {
                if (f.MaxF)
                    if (f.MaxF < val) {
                        errorCount++;
                        shared.log('Максимальное значение ' + f.MaxF);
                    }

                if (f.MinF)
                    if (f.MinF > val) {
                        errorCount++;
                        shared.log('Минимальное значение ' + f.MinF);
                    }
            }

            if (errorCount) {
                return false;
            }

            if (config.callback) {
                config.callback(val);
            }
        },

        init: function() {
            let input = el.find('input');

            // Type
            if (['text', 'date', 'datetime', 'time'].indexOf(config.field.Type) !== -1) {
                input.attr('type', 'text');
            }

            if (['integer', 'float'].indexOf(config.field.Type) !== -1) {
                input.attr('type', 'number');
            }

            if (config.field.Placeholder) {
                input.attr('placeholder', config.field.Placeholder);
            }

            // Mask
            if (config.field.Mask) {
                input.kendoMaskedTextBox({
                    mask: config.field.Mask
                });
            }
            if (config.field.Type === 'date') {
                input.attr('placeholder', 'ГГГГ-ММ-ДД');

                input.kendoMaskedTextBox({
                    mask: "9999-99-99"
                });
            }
            if (config.field.Type === 'datetime') {
                input.attr('placeholder', 'ГГГГ-ММ-ДД ЧЧ:мм');
                input.kendoMaskedTextBox({
                    mask: "9999-99-99 99:99"
                });
            }

            if (config.field.Type === 'time') {
                input.attr('placeholder', 'ЧЧ:мм');
                input.kendoMaskedTextBox({
                    mask: "99:99"
                });
            }

            // Min and max lengths
            if (config.field.Maxlength) {
                input.attr('maxlength', config.field.Maxlength);
            }

            if (config.field.Maxlength) {
                input.attr('minlength', config.field.Minlength);
            }

            // Other
            if (config.field.Type === 'float') {
                input.attr('step', 'any');
            }

            if (config.field.Tooltip) {
                this.set('help', config.field.Tooltip);
            }

            if (config.callback) {
                el.find('.w-popup').on('onClose', () => {
                    config.callback(this.get('value'));
                });
            }

            el.find('.w-popup-background').on('click', () => {
                this.closeIt();
            });

            input.on('keypress', (e) => {
                if (e.keyCode === 13) {
                    setTimeout(() => {
                        this.closeIt();
                    });
                }
            });
        },

        show: function() {
            componentsShared.show(el, false, config.pos);
            setTimeout(function() {
                el.find('input').focus();
            }, 200);
        },
        destroy: function() {
            el.find('.rc-field .w-popup-background').off('click');
            componentsShared.destroy(el);
        }
    };

    return shared.bindViewModel(el, vm);
};

module.exports = function(config, callback) {
    let field;

    if (!config.field) {
        return false;
    }

    if (!config.field.Placeholder) {
        config.field.Placeholder = '';
    }

    let data = {
        selector: config.selector,
        log: config.log,
        pos: {
            x: config.pageX || 0,
            y: config.pageY || 0,
        },
        field: config.field,
        callback: function (val, params) {
            callback(val, params);
            field.destroy();
        }
    };


    field = fieldFactory(data);
    field.show();

    return field;
};