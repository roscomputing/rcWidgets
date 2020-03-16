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

    const vm = {
        value: null,
        help: '',
        type: 'text',
        placeholder: '',
        minlength: '',
        maxlength: '',

        closeIt: function() {
            let errorCount = 0;
            const val = this.get('value');
            const field = config.field;

            if (field.Type === 'text') {
                const maxLength = field.Maxlength;
                const minLength = field.Minlength;

                if (val && !Number.isNaN(maxLength) && (maxLength < val.length)) {
                    errorCount++;
                    shared.log(`Длина текста не может быть больше ${maxLength}`);
                }

                if (!Number.isNaN(minLength) && (!val || (minLength > val.length))) {
                    errorCount++;
                    shared.log(`Минимальное количество символов не может быть меньше ${minLength}`);
                }
            }

            const validateDate = (val, format) => {
                return val && (val.indexOf('_') !== -1 || moment(val, format).format() !== "Invalid date");
            };

            const checkDateTime = (type, format, maxValue, minValue,
                invalidDateMessage = 'Не правильно введена дата. См формат данных',
                laterDateMessage = 'Дата не может быть позже ',
                earlierDateMessage = 'Дата не может быть раньше ',
            ) => {
                if (val && (field.Type === type)) {
                    if (!validateDate(val, format)) {
                        errorCount++;
                        shared.log(invalidDateMessage);
                    }

                    console.log(field)

                    if (!errorCount && field[maxValue] && (moment(val, format).diff(moment(field[maxValue], format)) > 0)) {
                        errorCount++;
                        shared.log(laterDateMessage + field[maxValue]);
                    }

                    if (!errorCount && field[minValue] && (moment(val, format).diff(moment(field[minValue], format)) < 0)) {
                        errorCount++;
                        shared.log(earlierDateMessage + field[minValue]);
                    }
                }
            };

            checkDateTime('date', 'YYYY-MM-DD', 'MaxDate', 'MinDate');
            checkDateTime('datetime', 'YYYY-MM-DD HH:mm', 'MaxDatetime', 'MinDatetime');
            checkDateTime('time', 'HH:mm', 'MaxTime', 'MinTime',
                'Не правильно введено время. См формат данных',
                'Время не может быть позже ',
                'Время не может быть раньше ');

            const checkNumbers = (type, maxValue, minValue) => {
                if (val && (field.Type === type)) {
                    if (field[maxValue] && field[maxValue] < val){
                        errorCount++;
                        shared.log(`Максимальное значение ${field[maxValue]}`);
                    }

                    if (field[minValue] && field[minValue] > val) {
                        errorCount++;
                        shared.log(`Минимальное значение ${field[minValue]}`);
                    }
                }
            };

            checkNumbers('integer', 'MaxI', 'MinI');
            checkNumbers('integer', 'MaxF', 'MinF');

            if (errorCount) {
                return false;
            }

            if (config.callback) {
                config.callback(val);
            }
        },

        init: function() {
            const input = el.find('input');

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
            setTimeout(() => {
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

    const data = {
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
