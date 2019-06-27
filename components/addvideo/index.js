require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const consts = require('../../shared/consts');
const componentsShared = require('../../shared/components');
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
            this.video = {
                source: pattern.type,
                remote_id: id,
                url: url,
                height: consts.video.services[pattern.type].height,
                width: consts.video.services[pattern.type].width,
                caption: '',
            };

            componentsShared.performClose(el);
        },

        title: config.title || 'Прикрепить видео',
        description: config.description || 'YouTube, Vimeo, Twitch, Coub, VK, Gfycat, Imgur, Giphy, OK',

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

        onClose() {
            config.callback(this.get('video'));
        },
        init: function() {
            componentsShared.onCloseSetup(config, el, this.onClose.bind(this));
        },
        show: function() {
            let wPopup = el.find('> .w-popup');
            wPopup.addClass('showing');

            setTimeout(() => {
                el.find('input').focus();
            }, 100);
            shared.setMainOverflow(true);
            shared.setYCenterPosition(wPopup);
        },
        destroy: function() {
            let wPopup = el.find('> .w-popup');
            kendo.unbind(wPopup);
            wPopup.off('mouseup');
            el.off();
            el.remove();
            shared.setMainOverflow();
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