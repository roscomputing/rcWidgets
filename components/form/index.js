require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');
const calendar = require('../calendar/index');
const autocomplete = require('../autocomplete/index');

const formFactory = function(config) {
    let el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-form-template', config.popupMode, [{
        templateName: 'rc-form-field-item-template',
    }, {
        templateName: 'rc-form-button-item-template'
    }]);

    let vm = {
        popupMode: !!config.popupMode,

        fields: config.fields,
        title: config.title,
        description: config.description || '',
        buttons: config.buttons,

        checkPos: function() {
            setTimeout(function() {
                var p = el.find('.w-popup');
                var delta = $(window).height() - (p.offset().top + p.outerHeight());

                if (delta < 0)
                    p.css('top', p.offset().top + delta);

                delta = $(window).width() - (p.offset().left + p.outerWidth());
                if (delta < 0)
                    p.css('left', p.offset().left + delta);
            });
        },

        // Clear field
        clearField: function(e) {
            let item = $(e.target).closest('.rc-form-field');

            if (item.find('input').length)
                item.find('input').val('');

            if (item.find('[data-format]').length) {
                item.find('[data-format]').html('');
                item.find('[data-format]').removeAttr('data-format');
            }

            if (item.find('[data-value]').length) {
                item.find('[data-value]').html('');
                item.find('[data-value]').removeAttr('data-value');
            }
        },

        // Time field
        setIntTimeField: function(e) {
            if (e.target.nodeName.toUpperCase() !== 'LI') {
                return false;
            }

            $(e.target).closest('div').find('input').val(parseInt($(e.target).text())).blur();
        },

        // Date field
        setDateToDateField: function(e) {
            var element = $(e.target);

            if (element.find('[name]').length) {
                element = element.find('[name]');
            }

            let value = '';
            if (element.attr('data-format')) {
                value = element.attr('data-format');
            }

            // Calendar
            calendar({
                pageX: e.pageX,
                pageY: e.pageY,
                toLabel: 'Не важно',
                type: 1,
                onlyDate: true,
                fromLabel: 'Укажите дату',
                to: null,
                from: value,
            }, function(from, to, option) {
                if (from) {
                    let date = moment(from).format('YYYY-MM-DDT00:00:00')
                    element.attr('data-format', date);
                    date = moment(date);
                    element.text(date.format('DD MMM YYYY'))
                }
            });
        },

        // AutoComplete field
        setAutoCompleteField: function(e) {
            let element = $(e.target);

            if (element.find('[name]').length) {
                element = element.find('[name]');
            }

            let values = [];
            let valuesIds = [];
            if (element.attr('data-value')) {
                if (e.data.type !== 'multiValue')
                    values.push({
                        Id: element.attr('data-value'),
                        Text: element.html()
                    });
                else {
                    values = JSON.parse(element.attr('data-value'));//.split(',');
                }
            }

            $.each(values, function(k,v) {
                valuesIds.push(parseInt(v.Id));
            });

            // Autocomplete
            autocomplete({
                pageX: e.pageX,
                pageY: e.pageY,
                maxValuesCount: e.data.type !== 'multiValue' ? 1 : false,
                finded:  valuesIds.length ? $.grep(e.data.finded , function(item) {
                    return valuesIds.indexOf(item.Id) === -1;
                }) : e.data.finded,
                values: values,
                clientSearch: true,
            }, (values, answer) => {
                var setValues = (values) => {
                    if (values)
                        if (values.length) {
                            if (e.data.type !== 'multiValue') {
                                element.attr('data-value', values[0].Id);
                                element.html(values[0].Text);
                            } else {
                                element.attr('data-value', JSON.stringify(values));
                                element.html(($.map(values, function(item) { return item.Text })).join(', '));
                            }
                        } else {
                            if (config.type !== 'multiValue')
                                element.attr('data-value', '');
                            else
                                element.attr('data-value', '[]');
                            element.html('');
                        }

                    this.changeFields();
                };

                if (answer) {
                    $.each(e.data.buttons, function(k,v) {
                        if (v.slug === answer) {
                            if (v.callback) {
                                v.callback(function(items) {
                                    setValues(items);
                                });
                            }
                        }
                    });
                }

                setValues(values);
            });
        },

        // Datetime field
        setDateToDatetimeField: function(e) {
            let element = $(e.target);

            if (element.find('[name]').length) {
                element = element.find('[name]');
            }

            let value = '';
            if (element.attr('data-format')) {
                value = element.attr('data-format');
            }

            // Calendar
            let data = {
                pageX: e.pageX,
                pageY: e.pageY,
                toLabel: '',
                type: 1,
                onlyDate: false,
                fromLabel: 'Укажите дату и время',
                to: null,
                from: value,
            };

            if (e.data.regulations) {
                data.regulations = e.data.regulations;
            }

            if (e.data.autoSetTime) {
                data.autoSetTime = e.data.autoSetTime;
            }

            calendar(data, function(from, to, option) {
                if (from) {
                    let date = moment(from).format('YYYY-MM-DDTHH:mm:00')
                    element.attr('data-format', date);
                    date = moment(date);
                    element.text(date.format('DD MMM YYYY, HH:mm'))
                }
            });
        },

        // Add File block
        files: [],
        addFile: function() {
            config.callback(this.get('fields'), 'addFile');
        },
        removeFile: function(e) {

            if (e.data)
                config.callback(this.get('fields'), 'removeFile', e);
        },

        // Buttons
        onlyOneButton: function() {
            return this.get('buttons').length === 1;
        },
        changeFields: function() {
            $.each(this.fields, (k,v) => {
                if (v.change) {
                    if (v.control === 'users') {
                        v.change(el.find('[name=' + v.name + ']').attr('data-value'), v.finded, el, this);
                    }

                    if (v.control === 'autocomplete' || v.control === 'tree') {
                        v.change(el.find('[name=' + v.name + ']').attr('data-value'), v.finded, el, this);
                    }

                    if (v.control === 'checkbox') {
                        v.change(el.find('[name=' + v.name + ']').prop('checked'), el, this);
                    }

                    if ((v.control === 'input') || (v.control === 'textarea')) {
                        v.change(el.find('[name=' + v.name + ']').val(), el, this);
                    }

                    if (v.control === 'date') {
                        v.change(el.find('[name=' + v.name + ']').attr('data-format'), el, this);
                    }

                    if (v.control === 'time') {
                        v.change(parseInt(el.find('[name=' + v.name + '-hours]').val() || 0),
                            parseInt(el.find('[name=' + v.name + '-minutes]').val() || 0), el, this);
                    }

                    if (v.control === 'editor') {
                        v.change(el.find('[name=' + v.name + ']').data('kendoEditor').value(), el, this);
                    }
                }
            });
        },
        checkFields: function() {
            el.find('.rc-form-field.error').removeClass('error');

            // Required
            $.each(el.find('.required:not(.time-field) input'), function(k, v) {
                if (!$(v).val().trim().length)
                    $(v).closest('.rc-form-field').addClass('error');
            });

            // Email
            $.each(el.find('.email input'), function(k, v) {
                if ($(v).val().trim().length && (!source.checkEmail($(v).val())))
                    $(v).closest('.rc-form-field').addClass('error');
            });


            $.each(this.fields, function(k,v) {
                if (v.checkValid && (!el.find('[name=' + v.name + ']').closest('.rc-form-field').hasClass('hidden'))) {
                    if ((v.control === 'users') || (v.control === 'autocomplete') || (v.control === 'tree')) {
                        if (v.checkValid && !v.checkValid(
                            el.find('[name=' + v.name + ']').attr('data-value'),
                            v.finded,
                            el)) {
                            el.find('[name=' + v.name + ']').closest('.rc-form-field').addClass('error');
                        }
                    }

                    if (v.control === 'checkbox') {
                        if (v.checkValid && !v.checkValid(el.find('[name=' + v.name + ']').prop('checked'), el)) {
                            el.find('[name=' + v.name + ']').closest('.rc-form-field').addClass('error');
                        }
                    }

                    if ((v.control === 'input') || (v.control === 'textarea')) {
                        if (v.checkValid && !v.checkValid(el.find('[name=' + v.name + ']').val(), el)) {
                            el.find('[name=' + v.name + ']').closest('.rc-form-field').addClass('error');
                        }
                    }

                    if (v.control === 'datetime') {
                        if (v.checkValid && !v.checkValid(el.find('[name=' + v.name + ']').attr('data-format'), el)) {
                            el.find('[name=' + v.name + ']').closest('.rc-form-field').addClass('error');
                        }
                    }

                    if (v.control === 'date') {
                        if (v.checkValid && !v.checkValid(el.find('[name=' + v.name + ']').attr('data-format'), el)) {
                            el.find('[name=' + v.name + ']').closest('.rc-form-field').addClass('error');
                        }
                    }

                    if (v.control === 'time') {
                        if (v.checkValid && !v.checkValid(parseInt(el.find('[name=' + v.name + '-hours]').val() || 0),
                            parseInt(el.find('[name=' + v.name + '-minutes]').val() || 0), el)) {
                            el.find('[name=' + v.name + '-hours]').closest('.rc-form-field').addClass('error');
                        }
                    }

                    if (v.control === 'editor') {
                        if (v.checkValid && !v.checkValid(el.find('[name=' + v.name + ']').data('kendoEditor').value(), el)) {
                            el.find('[name=' + v.name + ']').closest('.rc-form-field').addClass('error');
                        }
                    }
                }
            });

            if (el.find('.rc-form-field.error').length) {
                return false;
            }

            $.each(this.fields, (k,v) => {
                if (v.control === 'textarea') {
                    this.fields[k].value = el.find('[name=' + v.name + ']').val();

                } else if (v.control === 'input') {
                    if ((v.type === "number") || (v.type === "text") || (v.type === 'email')) {
                        this.fields[k].value = el.find('[name=' + v.name + ']').val();
                    }

                    if (v.type === "phone") {
                        this.fields[k].value = el.find('[name=' + v.name + ']').data('kendoMaskedTextBox').value();
                    }
                } else if (v.control === 'checkbox') {
                    this.fields[k].value = el.find('[name=' + v.name + ']').prop('checked');
                } else if (v.control === 'editor') {
                    this.fields[k].value = el.find('[name=' + v.name + ']').data('kendoEditor').value();
                } else if (v.control === 'time') {
                    this.fields[k].values = {
                        hours: parseInt(el.find('[name=' + v.name + '-hours]').val() || 0),
                        minutes: parseInt(el.find('[name=' + v.name + '-minutes]').val() || 0)
                    }
                } else if (v.control === 'datetime') {
                    this.fields[k].value = el.find('[name=' + v.name + ']').attr('data-format');
                } else if (v.control === 'autocomplete' || v.control === 'tree') {
                    this.fields[k].value = [el.find('[name=' + v.name + ']').attr('data-value')];
                } else if (v.control === 'users') {
                    this.fields[k].value = JSON.parse(el.find('[name=' + v.name + ']').attr('data-value') || []);
                } else if (v.control === 'date') {
                    this.fields[k].value = el.find('[name=' + v.name + ']').attr('data-format');
                } else if (v.control === 'dropdownlist') {
                    this.fields[k].value = el.find('[name=' + v.name + ']')[0].value;
                }
            });
            return true;
        },
        onButtonClick: function(e) {
            if (e.data.needCheck) {
                if (!this.checkFields()) {
                    return false;
                }
            }

            el.find('.w-popup').removeClass('no-close');
            el.find('.w-popup').off('onClose').on('onClose', () => {
                config.callback(this.get('fields'), e.data.slug, this.get('files'));
            });
            el.find('> .w-popup').removeClass('showing');
            el.find('> .w-popup').trigger('onClose');
        },
        close: function() {
            el.find('.w-popup').removeClass('no-close');
            el.find('.w-popup').off('onClose').on('onClose', () => {
                config.callback(this.get('fields'), 'cancel');
            });

            el.find('> .w-popup').removeClass('showing');
            el.find('> .w-popup').trigger('onClose');
        },

        // Data updates
        /*
            NOTE!
            Появилась необходимость менять динамически данные в форме в зависимости от значений в другом поле.
            Данный метод позволяет поменять данные поля. (работает пока только для dropdownlist)
         */
        updateDataForField: function (name, data) {
            $.each(this.fields, function(k, v) {
                if (name === v.name && v.dataSource) {
                    let elem = el.find('[name=' + v.name + ']');

                    if (elem && elem.data('kendoDropDownList')) {
                        elem.data('kendoDropDownList').setDataSource(new kendo.data.DataSource({ data: data }));
                        elem.data('kendoDropDownList').enable(data && data.length);
                    }
                }
            });
        },

        init: function() {
            if (config.callback) {
                el.find('.w-popup').on('onClose', () => {
                    config.callback(this.get('values'));
                });
            }

            el.find('.w-popup').addClass('no-close');
            el.find('.phone input').kendoMaskedTextBox({
                mask: "+7 (999) 000-00-00"
            });

            el.find('.editor').kendoEditor({
                tools: [
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "insertUnorderedList",
                    "insertOrderedList",
                    "createLink",
                    "cleanFormatting"
                ],
                resizable: {
                    content: false,
                    toolbar: false
                },
                pasteCleanup: {
                    all: false,
                    css: true,
                    custom: function (html) {
                        return source.pasteCleanup(html);
                    },
                    keepNewLines: false,
                    msAllFormatting: false,
                    msConvertLists: true,
                    msTags: true,
                    none: false,
                    span: false
                }
            });

            // Устанавливаем text cursor в конец текста
            let setCursorAtTextEnd = function (contentEditableElement) {
                let range, selection;
                if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
                {
                    range = document.createRange();
                    range.selectNodeContents(contentEditableElement);
                    range.collapse(false);
                    selection = window.getSelection();

                    if (selection) {
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
                else if (document.selection)//IE 8 and lower
                {
                    range = document.body.createTextRange();
                    range.moveToElementText(contentEditableElement);
                    range.collapse(false);
                    range.select();
                }
            };

            $.each(el.find('.editor'), function (k, v) {

                setCursorAtTextEnd(v);

                let editor = $(v).data("kendoEditor");
                if (editor) {
                    let toolbar = editor.toolbar.element.closest(".k-window");

                    editor.value(source.htmlDecode(editor.value(), true) || null);

                    toolbar.prependTo($(v).parent());
                    toolbar.addClass('fixed');

                    $(editor.body).off("focusout.kendoEditor");
                }
            });
        },
        show: function() {
            if (config.pos) {
                shared.findWidgetPos(el.find('> .w-popup'), config.pos);
            }

            this.checkPos();
            el.find('> .w-popup').addClass('showing');
        },
        destroy: function() {
            if (el.find('.editor').length) {
                el.find('.editor').data('kendoEditor').destroy();
            }
            kendo.unbind(el.find('> .w-popup'));
            el.find('> .w-popup').off('mouseup');
            el.off();
            el.remove();
        }
    };

    return shared.bindViewModel(el, vm);
};

module.exports = function(config, callback) {
    let form;

    let data = {
        selector: config.selector,
        log: config.log,
        pos: {
            x: config.pageX || 0,
            y: config.pageY || 0,
        },
        popupMode: !!config.popupMode,
        buttons: config.buttons || [],
        title: config.title || '',
        description: config.description,
        fields: config.fields,
        callback: function(fields, custom) {
            if (custom && typeof callback === 'function') {
                callback(fields, custom);
                form.destroy();
            } else {
                setTimeout(function() { form.show(); });
            }
        }
    };

    form = formFactory(data);
    form.show();

    return form;
};