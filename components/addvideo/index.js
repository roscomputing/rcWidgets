require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const consts = require('../../shared/consts');
const componentsShared = require('../../shared/components');
const template = require('./index.html');

const addVideoFactory = (config) => {
    const el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-addvideo-template', true);

    const services = consts.video.services;

    const remoteIds = {
        ['yandex-music-track']: (v) => `${v[2]}/${v[1]}`,
        ['yandex-music-playlist']: (v) => `${v[1]}/${v[2]}`,
        ['giphy']: (v) => v[1] || v[2]
    };

    const vm = {
        getHtml: shared.getHtml,
        title: config.title || 'Прикрепить видео',
        description: config.description || 'YouTube, Vimeo, Twitch, Coub, VK, Gfycat, Imgur, Giphy, OK',
        url: '',
        searchVideoTimeout: null,
        video: {},
        getRemoteId: function (source, execArray) {
            const idGetter = remoteIds[source];
            return (shared.isFunction(remoteIds[source]) && idGetter(execArray)) || execArray[1];
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
        searchVideo: function() {
            this.searchVideoTimeout && clearTimeout(this.searchVideoTimeout);
            this.searchVideoTimeout = setTimeout(() => {
                let url = this.get('url');
                let pattern = consts.video.pastePatterns.find((v) => v.regex.test(url));
                pattern && this.urlPastedCallback(url, pattern);
            }, 300);
        },

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

    const data = {
        selector: config.selector,
        log: config.log,
        description: config.description,
        title: config.title,
        callback: (video) => {
            callback(video);
            bpvideo.destroy();
        }
    };

    bpvideo = addVideoFactory(data);
    bpvideo.show();

    return bpvideo;
};
