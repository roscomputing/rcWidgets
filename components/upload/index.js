require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');

const uploadFactory = function(config) {
    let el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-upload-template');

    let inUpload = false;

    let vm = {
        inUpload: false,

        selectFiles: function(e) {
            el.find('.w-popup').addClass('no-close');

            inUpload = true;

            //здесь можно поставить ограничения на выбранные файлы

            //  Проверки:
            //  Не может быть загружено больше config.MaxFilesCount файлов
            //  Размер загружаемого файла не может быть больше config.MaxFileSize*1024*1024 байт
            //  Возможные расширения файлов контролируются по массиву config.AllowedExtensions
            //
            //  Если, при загрузке нескольких файлов хотя бы один не может быть загружен
            //  не будет загружен ни один
            //
            let hasError = false;

            let tx = "";
            if (e.files.length > 1) { tx = "Hи один " }

            if (e.files.length > config.MaxFilesCount) {
                shared.log(tx + "файл не загружен, т.к. в задаче достигнуто максимальное количество файлов "+ config.MaxFilesCount);
                e.preventDefault();
                hasError = true;
            }

            $.each(e.files, function (index, value) {
                if (value.size > config.MaxFileSize * 1024 * 1024) {
                    shared.log(tx + "файл не загружен, т.к. размер одного из файлов больше чем "+ config.MaxFileSize + " Mb. (файл " + value.name + ")");
                    e.preventDefault();
                    hasError = true;
                    inUpload = false;
                }
                if (!value.size) {
                    shared.log(tx + "файл не загружен, т.к. размер одного из файлов = 0"+ " (файл " + value.name + ")");
                    e.preventDefault();
                    hasError = true;
                    inUpload = false;
                }

                if (config.AllowedExtensions.indexOf(value.extension.substr(1).toLowerCase()) < 0) {
                    shared.log(tx + "файл не загружен, т.к. расширение файла не поддерживается"+ " (файл " + value.name + ")");
                    shared.log("Допустимые расширения: "+config.AllowedExtensions.join(', '));
                    e.preventDefault();
                    hasError = true;
                    inUpload = false;
                }
            });

            if (!hasError) {
                el.find('.load-process').show();
            }
        },

        success: function(e) {
            inUpload = false;

            el.find('.w-popup').removeClass('no-close');
            //добавялем только загруженные файлы в список файлов
            if (e.response) {
                if (config.callback) {
                    config.callback(e.response, inUpload)
                }
            }
        },

        uploadFiles: function(e) {
            //замена урла
            e.sender.options.async.saveUrl = config.uploadFiles;
        },

        error: function(e) {
            inUpload = false;
            el.find('.w-popup').removeClass('no-close');

            if (config.callback) {
                config.callback();
            }

            let message = "";
            if (e.XMLHttpRequest) {
                if (e.XMLHttpRequest.responseText) {
                    message = JSON.parse(e.XMLHttpRequest.responseText).Message;
                    shared.log(JSON.parse(e.XMLHttpRequest.responseText));
                }
            } else {
                let mes = {Message: "Что-то пошло не так"};
                shared.log(mes);
            }
        },

        init: function() {
            if (config.callback) {
                el.find('.w-popup').on('onClose', function() {
                    config.callback(null, inUpload);
                });
            }

            el.find('[name=filesInput]').kendoUpload({
                multiple: true,
                async: {
                    saveUrl: config.uploadFiles,
                    autoupload: true
                },
                success: this.success,
                upload: this.upload,
                select: this.selectFiles,
                error: this.error,
                dropZone: '.rc-upload-file-drop-zone',
                localization: {
                    select: "Загрузить с устройства"
                }
            });
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
    let upload;

    let data = {
        selector: config.selector,
        pos: {
            x: config.pageX || 0,
            y: config.pageY || 0,
        },
        uploadFiles: config.url,
        MaxFilesCount: config.maxFilesCount || 1,
        MaxFileSize: config.maxFileSize || 50,
        AllowedExtensions: config.allowedExtensions || ["avi", "jpg", "jpeg", "png", "gif", "doc", "docx", "mp4", "rtf", "pdf", "txt", "log", "xls", "xlsx", "zip", "7z", "rar", "cfg", "config", "vsd", "vdx", "vsx", "vtx", "vsdx", "vsdm", "xml", "AVI", "JPG", "JPEG", "PNG", "GIF", "DOC", "DOCX", "MP4", "RTF", "PDF", "TXT", "LOG", "XLS", "XLSX", "ZIP", "7Z", "RAR", "CFG", "CONFIG", "VSD", "VDX", "VSX", "VTX", "VSDX", "VSDM", "XML", "har", "sig"],
        callback: function(newFiles, uploadProcess) {
            callback(newFiles, uploadProcess);

            if (!uploadProcess)
                upload.destroy();
        }
    };

    upload = uploadFactory(data);
    upload.show();

    return upload;
};