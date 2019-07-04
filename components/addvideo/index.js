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

    let services = consts.video.services;

    let remoteIds = {
        ['yandex-music-track']: (v) => v[2]+'/'+v[1],
        ['yandex-music-playlist']: (v) => v[1]+'/'+v[2],
        ['giphy']: (v) => v[1] || v[2]
    };

    let vm = {
        getHtml: shared.getHtml,
        getRemoteId: function(source, execArray) {
            let idGetter = remoteIds[source];
            return (shared.isFunction(idGetter) && idGetter(execArray)) || execArray[1];
        },
        getHtmlWithEmbedId: function (type, id) {
            return services[type].html.replace(/<\%\= remote\_id \%\>/g, id);
        },
        urlPastedCallback: function(url, pattern) {
            let execArray = pattern.regex.exec(url),
                id = this.getRemoteId(pattern.type, execArray);
            this.video = {
                source: pattern.type,
                remote_id: id,
                url: url,
                height: services[pattern.type].height,
                width: services[pattern.type].width,
                caption: '',
            };

            componentsShared.performClose(el);
        },

        title: config.title || 'Прикрепить видео',
        description: config.description || 'YouTube, Vimeo, Twitch, Coub, VK, Gfycat, Imgur, Giphy, OK',

        url: '',
        searchVideoTimeout: null,
        searchVideo: function() {
            this.searchVideoTimeout && clearTimeout(this.searchVideoTimeout);
            this.searchVideoTimeout = setTimeout(() => {
                let url = this.get('url');
                let pattern = consts.video.pastePatterns.find((v) => v.regex.test(url));
                pattern && this.urlPastedCallback(url, pattern);
            }, 300);
        },

        video: {},
        close: function() {
            componentsShared.performClose(el);
        },
        onClose() {
            config.callback(this.get('video'));
        },
        init: function() {
            componentsShared.onCloseSetup(config, el, this.onClose.bind(this));
        },
        show: function() {
            componentsShared.show(el, true);
            setTimeout(() => {
                el.find('input').focus();
            }, 100);
        },
        destroy: function() {
            componentsShared.destroy(el);
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