require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');
const componentsShared = require('../../shared/components');

const filePreviewFactory = function(config) {
    const el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-file-preview-template', true);

    const vm = {
        name: '',
        href: '',
        type: '',

        checkLiteMode: function() {
            return !this.getHeaderInfo().trim().length;
        },

        headerInfo: config.headerInfo || '',

        getHeaderInfo: function() {
            return this.get('headerInfo');
        },

        inLoadProcess: false,

        // Zoom
        zoom: 1.4,

        checkDisabledZoomMin: function() {
            return this.get('zoom') === 1.4;
        },

        checkDisabledZoomMax: function() {
            return this.get('zoom') === 2.5;
        },

        pdfZoom: function() {
            return this.get('zoom') / 2
        },
        scaleZoom: function() {
            return 'scale(' + this.get('zoom') + ')';
        },

        pdfScaleZoom: function() {
            return 'scale(' + (this.get('zoom') / 2) + ')';
        },

        zoomIn: function() {
            this.set('zoom', Math.min(2.5, this.get('zoom') + .2));

            const c = el.find('.rc-file-preview > .body');
            c.scrollLeft(10000).scrollLeft(c.scrollLeft() / 2);
        },

        zoomOut: function() {
            this.set('zoom', Math.max(.5, this.get('zoom') - .2));

            const c = el.find('.rc-file-preview > .body');
            c.scrollLeft(10000).scrollLeft(c.scrollLeft() / 2);
        },

        // 1 Image
        isViewable: false,
        imgSrc: '',

        // 2 Pdf
        page: 1,
        pageCount: 1,
        getPageLabel: function() {
            return 'Страница ' + this.get('page') + ' из ' + this.get('pageCount');
        },

        isPdf: function() {
            return !this.get('inLoadProcess') && (this.get('type').toLowerCase() === 'pdf');
        },

        pdfInit: function(url) {
            const pdfjsLib = window.pdfjsLib;
            const canvas = document.getElementById('rc-file-preview-pdf-canvas');
            const ctx = canvas.getContext('2d');
            const scale = 4;


            pdfjsLib.GlobalWorkerOptions.workerSrc = config.pdfWorkerUrl;

            let pdfDoc = null,
                pageNum = 1,
                pageRendering = false,
                pageNumPending = null;

            const renderPage = num => {
                pageRendering = true;
                pdfDoc.getPage(num).then(function(page) {
                    const viewport = page.getViewport(scale);

                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    const renderContext = {
                        canvasContext: ctx,
                        viewport: viewport
                    };

                    const renderTask = page.render(renderContext);

                    renderTask.promise.then(() => {
                        pageRendering = false;
                        if (pageNumPending !== null) {
                            renderPage(pageNumPending);
                            pageNumPending = null;
                        }
                    });
                });

                this.set('page', num);
            };

            const queueRenderPage = num => {
                if (pageRendering) {
                    pageNumPending = num;
                } else {
                    renderPage(num);
                }
            };

            const onPrevPage = () => {
                if (pageNum <= 1) {
                    return;
                }

                pageNum--;
                queueRenderPage(pageNum);
            };

            const onNextPage = () => {
                if (pageNum >= pdfDoc.numPages) {
                    return;
                }

                pageNum++;
                queueRenderPage(pageNum);
            };

            $('#rc-file-review-pdf-paginator .prev').off('click').on('click', onPrevPage);
            $('#rc-file-review-pdf-paginator .next').off('click').on('click', onNextPage);

            this.set('inLoadProcess', true);

            pdfjsLib.getDocument(url).then((pdfDoc_) => {
                pdfDoc = pdfDoc_;
                this.set('pageCount', pdfDoc.numPages);
                this.set('inLoadProcess', false);

                renderPage(pageNum);
            });
        },

        // TODO: ??
        // там посмотри, если не сделает печать, можно самому на фронте сделать
        // add class 4 widget: print-mode. В нем отруби лишние элементы. И вызови печать
        getPrintLink: function() {
            return this.get('href') + '&printIt=true'
        },

        close: function() {
            componentsShared.performClose(el);
        },

        onClose() {
            config.callback();
        },

        init: function() {
            this.set('name', config.name);
            this.set('href', config.href);
            this.set('type', config.fileType);
            this.set('authorName', config.authorName);
            this.set('created', config.created);
            this.set('geoLocationDescription', config.geoLocationDescription);

            // Чекаем, что просматривабельно
            if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].indexOf(config.fileType.toLowerCase()) !== -1) {
                this.set('isViewable', true);

                if ($(document).width() <= 1400) {
                    this.set('zoom', 1.2);
                }

                if ($(document).width() <= 950) {
                    this.set('zoom', 1);
                }

                this.set('imgSrc', config.href);
            } else {
                if (['pdf'].indexOf(config.fileType.toLowerCase()) !== -1) {
                    this.pdfInit(config.href);
                }

                this.set('isViewable', false);
                this.set('imgSrc', '');
            }

            componentsShared.onCloseSetup(config, el, this.onClose.bind(this));
        },
        show: function() {
            componentsShared.show(el, false, config.pos);
        },
        destroy: function() {
            componentsShared.destroy(el);
        }
    };

    if (config.getHeaderInfo) {
        vm.getHeaderInfo = config.getHeaderInfo;
    }

    return shared.bindViewModel(el, vm);
};

module.exports = function(config) {
    let filepreview;

    const data = {
        selector: config.selector,
        log: config.log,
        href: config.href,
        fileType: config.fileType || 'jpg',

        headerInfo: config.headerInfo || '',
        getHeaderInfo: config.getHeaderInfo,

        pdfWorkerUrl: config.pdfWorkerUrl,

        name: config.fileName || '',

        pos: {
            x: config.pageX || 0,
            y: config.pageY || 0,
        },

        callback: function() {
            filepreview.destroy();
        }
    };

    filepreview = filePreviewFactory(data);
    filepreview.show();

    return filepreview;
};
