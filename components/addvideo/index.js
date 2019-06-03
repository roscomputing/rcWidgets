require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const consts = require('../../shared/consts');
const template = require('./index.html');

const addvideoFactory = function(config) {
    let el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-addvideo-template', true);

    let vm = {
        getHtml: shared.getHtml,
        getRemoteId: function(source, execArray) {
            let id;
            switch(source) {
                case 'yandex-music-track':
                    id = execArray[2]+'/'+execArray[1];
                    break;
                case 'yandex-music-playlist':
                    id = execArray[1]+'/'+execArray[2];
                    break;
                case 'giphy':
                    id = execArray[1] || execArray[2];
                    break;
                default:
                    id = execArray[1];
            }

            return id;
        },
        getHtmlWithEmbedId: function (type, id) {
            return consts.video.services[type].html.replace(/<\%\= remote\_id \%\>/g, id);
        },
        urlPastedCallback: function(url, pattern) {
            let execArray = pattern.regex.exec(url),
                id = this.getRemoteId(pattern.type, execArray);
            let data = {
                source: pattern.type,
                remote_id: id,
                url: url,
                height: consts.video.services[pattern.type].height,
                width: consts.video.services[pattern.type].width,
                caption: '',
            };

            el.find('.w-popup').removeClass('no-close');
            el.find('.w-popup').off('onClose').on('onClose', function() {
                config.callback(data);
            });

            el.find('> .w-popup').removeClass('showing');
            el.find('> .w-popup').trigger('onClose');
        },

        title: 'Прикрепить видео',
        description: 'YouTube, Vimeo, Twitch, Coub, VK, Gfycat, Imgur, Giphy, OK',

        url: '',
        searchVideoTimeout: null,
        searchVideo: function() {
            if (this.searchVideoTimeout) {
                clearTimeout(this.searchVideoTimeout);
            }

            this.searchVideoTimeout = setTimeout(() => {
                let url = this.get('url');

                $.each(consts.video.pastePatterns, (k,v) => {
                    if (v.regex.test(url)) {
                        this.urlPastedCallback(url, v);
                    }
                });
            }, 300);
        },

        video: {},

        close: function() {
            el.find('.w-popup').removeClass('no-close');
            el.find('.w-popup').off('onClose').on('onClose', function() {
                config.callback();
            });
            el.find('> .w-popup').removeClass('showing');
            el.find('> .w-popup').trigger('onClose');
        },
        init: function() {
            if (config.callback) {
                el.find('.w-popup').on('onClose', () => {
                    config.callback(this.get('video'));
                });
            }
        },
        show: function() {
            el.find('> .w-popup').addClass('showing');

            setTimeout(() => {
                el.find('input').focus();
            }, 100);
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
    let bpvideo;

    let data = {
        selector: config.selector,
        log: config.log,
        description: config.description,
        title: config.title,
        callback: function(video) {
            callback(video);
            bpvideo.destroy();
        }
    };

    bpvideo = addvideoFactory(data);
    bpvideo.show();

    return bpvideo;
};