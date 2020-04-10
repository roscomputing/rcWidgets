require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');
const calendar = require('../calendar/index');
const autocomplete = require('../autocomplete/index');
const componentsShared = require('../../shared/components');

const formFactory = function(config) {
    const el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-form-template', config.popupMode, [{
        templateName: 'rc-form-field-item-template',
    }, {
        templateName: 'rc-form-button-item-template'
    }]);

    const vm = {
        isNumberKey: shared.isNumberKey,
        popupMode: !!config.popupMode,

        fields: config.fields,
        title: config.title,
        description: config.description || '',
        buttons: config.buttons,

        // Clear field
        clearField: function(e) {
            const item = $(e.target).closest('.rc-form-field');

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
            let element = $(e.target);
            let value = '';

            if (element.find('[name]').length) {
                element = element.find('[name]');
            }

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
            }, from => {
                if (from) {
                    let date = moment(from).format('YYYY-MM-DDT00:00:00');

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
                found:  valuesIds.length ? $.grep(e.data.found , item => valuesIds.indexOf(item.Id) === -1) : e.data.found,
                values: values,
                clientSearch: true,
            }, (values, answer) => {
                const setValues = values => {
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
                    $.each(e.data.buttons, (k,v) => {
                        if (v.slug === answer) {
                            if (v.callback) {
                                v.callback( items => {
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

            calendar(data, function(from) {
                if (from) {
                    let date = moment(from).format('YYYY-MM-DDTHH:mm:00');

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
                    const nameAttr = `[name=${v.name}]`;

                    switch (v.control) {
                        case 'users':
                            v.change(el.find(nameAttr).attr('data-value'), v.found, el, this);
                            break;

                        case 'autocomplete' || 'tree':
                            v.change(el.find(nameAttr).attr('data-value'), v.found, el, this);
                            break;

                        case 'checkbox':
                            v.change(el.find(nameAttr).prop('checked'), el, this);
                            break;

                        case 'input' || 'textarea':
                            v.change(el.find(nameAttr).val(), el, this);
                            break;

                        case 'date':
                            v.change(el.find(nameAttr).attr('data-format'), el, this);
                            break;

                        case 'time':
                            v.change(parseInt(el.find(`[name=${v.name}-hours]`).val() || 0),
                                parseInt(el.find(`[name=${v.name}-minutes]`).val() || 0), el, this);
                            break;

                        case 'editor':
                            v.change(el.find(nameAttr).data('kendoEditor').value(), el, this);
                            break;
                    }
                }
            });
        },

        checkFields: function() {
            el.find('.rc-form-field.error').removeClass('error');

            // Required
            $.each(el.find('.required:not(.time-field) input'), (k, v) => {
                if (!$(v).val().trim().length)
                    $(v).closest('.rc-form-field').addClass('error');
            });

            // Email
            $.each(el.find('.email input'), (k, v) => {
                if ($(v).val().trim().length && (!shared.checkEmail($(v).val())))
                    $(v).closest('.rc-form-field').addClass('error');
            });

            $.each(this.fields, (k,v) => {
                const nameAttr = `[name=${v.name}]`;

                if (v.checkValid && !el.find(nameAttr).closest('.rc-form-field').hasClass('hidden')) {
                    switch (v.control) {
                        case 'users' || 'autocomplete' || 'tree':
                            if (v.checkValid && !v.checkValid(el.find(nameAttr).attr('data-value'), v.found, el)) {
                                el.find(nameAttr).closest('.rc-form-field').addClass('error');
                            }

                            break;

                        case 'checkbox':
                            if (v.checkValid && !v.checkValid(el.find(nameAttr).prop('checked'), el)) {
                                el.find(nameAttr).closest('.rc-form-field').addClass('error');
                            }

                            break;

                        case 'input' || 'textarea':
                            if (v.checkValid && !v.checkValid(el.find(nameAttr).val(), el)) {
                                el.find(nameAttr).closest('.rc-form-field').addClass('error');
                            }

                            break;

                        case 'datetime':
                            if (v.checkValid && !v.checkValid(el.find(nameAttr).attr('data-format'), el)) {
                                el.find(nameAttr).closest('.rc-form-field').addClass('error');
                            }

                            break;

                        case 'date':
                            if (v.checkValid && !v.checkValid(el.find(nameAttr).attr('data-format'), el)) {
                                el.find(nameAttr).closest('.rc-form-field').addClass('error');
                            }

                            break;

                        case 'time':
                            if (v.checkValid && !v.checkValid(parseInt(el.find(nameAttr).val() || 0),
                                parseInt(el.find(`[name=${v.name}-minutes]`).val() || 0), el)) {
                                el.find(`[name=${v.name}-hours]`).closest('.rc-form-field').addClass('error');
                            }

                            break;

                        case 'editor':
                            if (v.checkValid && !v.checkValid(el.find('[name=' + v.name + ']').data('kendoEditor').value(), el)) {
                                el.find(nameAttr).closest('.rc-form-field').addClass('error');
                            }

                            break;
                    }
                }
            });

            if (el.find('.rc-form-field.error').length) {
                return false;
            }

            $.each(this.fields, (k,v) => {
                const nameAttr = `[name=${v.name}]`;

                switch (v.control) {
                    case 'textarea':
                        this.fields[k].value = el.find(nameAttr).val();

                        break;

                    case 'input':
                        if ((v.type === "number") || (v.type === "text") || (v.type === 'email')) {
                            this.fields[k].value = el.find(nameAttr).val();
                        }

                        if (v.type === "phone") {
                            this.fields[k].value = el.find(nameAttr).data('kendoMaskedTextBox').value();
                        }

                        break;

                    case 'checkbox':
                        this.fields[k].value = el.find(nameAttr).prop('checked');

                        break;

                    case 'editor':
                        this.fields[k].value = el.find(nameAttr).data('kendoEditor').value();

                        break;

                    case 'time':
                        this.fields[k].values = {
                            hours: parseInt(el.find(`[name=${v.name}-hours]`).val() || 0),
                            minutes: parseInt(el.find(`name=${v.name}-minutes]`).val() || 0)
                        };

                        break;

                    case 'datetime':
                        this.fields[k].value = el.find(nameAttr).attr('data-format');

                        break;

                    case 'autocomplete' || 'tree':
                        this.fields[k].value = [el.find(nameAttr).attr('data-value')];

                        break;

                    case 'date':
                        this.fields[k].value = el.find(nameAttr).attr('data-format');

                        break;

                    case 'users':
                        this.fields[k].value = JSON.parse(el.find(nameAttr).attr('data-value') || []);

                        break;

                    case 'dropdownlist':
                        this.fields[k].value = el.find(nameAttr)[0].value;

                        break;
                }
            });

            return true;
        },

        onButtonClick: function(e) {
            if (e.data.needCheck && !this.checkFields()) {
                return false;
            }

            componentsShared.performClose(el, [this.get('fields'), e.data.slug, this.get('files')]);
        },

        close: function() {
            componentsShared.performClose(el, [this.get('fields'), 'cancel']);
        },

        // Data updates
        /*
            NOTE!
            Появилась необходимость менять динамически данные в форме в зависимости от значений в другом поле.
            Данный метод позволяет поменять данные поля. (работает пока только для dropdownlist)
         */
        updateDataForField: function (name, data) {
            $.each(this.fields, (k, v) => {
                if (name === v.name && v.dataSource) {
                    const elem = el.find(`[name=${v.name}]`);

                    if (elem && elem.data('kendoDropDownList')) {
                        elem.data('kendoDropDownList').setDataSource(new kendo.data.DataSource({ data: data }));
                        elem.data('kendoDropDownList').enable(data && data.length);
                    }
                }
            });
        },

        onClose(e, ...onCloseParams) {
            if (onCloseParams && onCloseParams.length) {
                config.callback(...onCloseParams);
            } else {
                config.callback(this.get('values'));
            }
        },

        init: function() {
            componentsShared.onCloseSetup(config, el, this.onClose.bind(this));

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
                    custom: html => {
                        return shared.pasteCleanup(html);
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
            const setCursorAtTextEnd = contentEditableElement => {
                let range, selection;

                //Firefox, Chrome, Opera, Safari, IE 9+
                if (document.createRange){
                    range = document.createRange();
                    range.selectNodeContents(contentEditableElement);
                    range.collapse(false);
                    selection = window.getSelection();

                    if (selection) {
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                } else if (document.selection) {
                    //IE 8 and lower
                    range = document.body.createTextRange();
                    range.moveToElementText(contentEditableElement);
                    range.collapse(false);
                    range.select();
                }
            };

            $.each(el.find('.editor'), (k, v) => {
                setCursorAtTextEnd(v);

                const editor = $(v).data("kendoEditor");

                if (editor) {
                    const toolbar = editor.toolbar.element.closest(".k-window");

                    editor.value(shared.htmlDecode(editor.value(), true) || null);

                    toolbar.prependTo($(v).parent());
                    toolbar.addClass('fixed');

                    $(editor.body).off("focusout.kendoEditor");
                }
            });
        },
        show: function() {
            componentsShared.show(el, false, config.pos);
            shared.checkPosition(el);
        },
        destroy: function() {
            if (el.find('.editor').length) {
                el.find('.editor').data('kendoEditor').destroy();
            }

            componentsShared.destroy(el);
        }
    };

    return shared.bindViewModel(el, vm);
};

module.exports = function(config, callback) {
    let form;

    const data = {
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
        callback: (fields, custom) => {
            if (custom && typeof callback === 'function') {
                callback(fields, custom);
                form.destroy();
            }
        }
    };

    form = formFactory(data);
    form.show();

    return form;
};
