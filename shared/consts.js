module.exports = {
    video: {
        services: {
            vimeo: {
                regex: /(?:http[s]?:\/\/)?(?:www.)?vimeo\.co(?:.+\/([^\/]\d+)(?:#t=[\d]+)?s?$)/,
                html: "<iframe src=\"https://player.vimeo.com/video/<%= remote_id %>?title=0&byline=0\" style=\"width:100%;\" height=\"320\" frameborder=\"0\"></iframe>",
                height: 320,
                width: 580
            },
            giphy: {
                regex: /^https?:\/\/(?:media)?.?giphy\.com\/(?:embed|gifs|media)\/(?:(?:[^\/]+)-([\w+]+)|([\w+]+))/,
                html: "<iframe src=\"https://giphy.com/embed/<%= remote_id %>?\" style=\"width:100%;\" height=\"320\" frameborder=\"0\"></iframe>",
                height: 320,
                width: 580
            },
            youtube: {
                regex: /^.*(?:(?:youtu\.be\/)|(?:youtube\.com)\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*)(?:[\?\&]t\=(\d*)|)/,
                html: "<iframe src=\"https://www.youtube.com/embed/<%= remote_id %>\" style=\"width:100%;\" height=\"320\" frameborder=\"0\" allowfullscreen></iframe>",
                height: 320,
                width: 580
            },
            vk : {
                regex: /https?:\/\/(?:vk\.com|tjournal\.ru\/proxy)\/.*(?:video)([-0-9]+_[0-9]+)/,
                html: "<iframe src=\"https://tjournal.ru/proxy/video/<%= remote_id %>?rel=0&showinfo=0&enablejsapi=1&autoplay=0\" width=\"580\" height=\"320\" frameborder=\"0\" allowfullscreen></iframe>"
            },
            coub: {
                regex: /https?:\/\/coub\.com\/view\/([^\/\?\&]+)/,
                html: "<iframe src=\"//coub.com/embed/<%= remote_id %>\" style=\"width:100%;\" height=\"320\" frameborder=\"0\" allowfullscreen></iframe>",
                height: 320,
                width: 580
            },
            vine: {
                regex: /https?:\/\/vine\.co\/v\/([^\/\?\&]+)/,
                html: "<iframe src=\"https://vine.co/v/<%= remote_id %>/embed/simple/\" style=\"width:100%;\" height=\"320\" frameborder=\"0\" allowfullscreen></iframe>",
                height: 320,
                width: 580
            },
            imgur: {
                regex: /https?:\/\/imgur\.com\/(?:gallery\/)?(?!gallery)([a-zA-Z0-9]+)\/?$/,
                html: "<iframe allowfullscreen=\"true\" scrolling=\"no\" src=\"https://imgur.com/<%= remote_id %>/embed\" id=\"imgur-embed-iframe-pub-<%= remote_id %>\" class=\"imgur-embed-iframe-pub\" style=\"height: 500px; width: 100%; \"></iframe>",
                height: 500,
                width: 540
            },
            gfycat: {
                regex: /https?:\/\/gfycat\.com(?:\/ru\/gifs\/detail|\/ifr)?\/([a-zA-Z]+)/,
                html: "<iframe src='https://gfycat.com/ifr/<%= remote_id %>' frameborder='0' scrolling='no' style=\"width:100%;\" height='436' allowfullscreen ></iframe>",
                height: 436,
                width: 580
            },
            'twitch-channel': {
                regex: /https?:\/\/www.twitch.tv\/([^\/\?\&]*)/,
                html: "<iframe src=\"https://player.twitch.tv/?channel=<%= remote_id %>\" frameborder=\"0\" allowfullscreen=\"true\" scrolling=\"no\" height=\"366\" style=\"width:100%;\"></iframe>",
                height: 366,
                width: 600
            },
            'twitch-video': {
                regex: /https?:\/\/www.twitch.tv\/(?:[^\/\?\&]*\/v|videos)\/([0-9]*)/,
                html: "<iframe src=\"https://player.twitch.tv/?video=v<%= remote_id %>\" frameborder=\"0\" allowfullscreen=\"true\" scrolling=\"no\" height=\"366\" style=\"width:100%;\"></iframe>",
                height: 366,
                width: 600
            },
            'yandex-music-album': {
                regex: /https?:\/\/music.yandex.ru\/album\/([0-9]*)/,
                html: "<iframe frameborder=\"0\" style=\"border:none;width:540px;height:400px;\" style=\"width:100%;\" height=\"400\" src=\"https://music.yandex.ru/iframe/#album/<%= remote_id %>/\"></iframe>",
                height: 400,
                width: 540
            },
            'yandex-music-track': {
                regex: /https?:\/\/music.yandex.ru\/album\/([0-9]*)\/track\/([0-9]*)/,
                html: "<iframe frameborder=\"0\" style=\"border:none;width:540px;height:100px;\" style=\"width:100%;\" height=\"100\" src=\"https://music.yandex.ru/iframe/#track/<%= remote_id %>/\"></iframe>",
                height: 100,
                width: 540
            },
            'yandex-music-playlist': {
                regex: /https?:\/\/music.yandex.ru\/users\/([^\/\?\&]*)\/playlists\/([0-9]*)/,
                html: "<iframe frameborder=\"0\" style=\"border:none;width:540px;height:400px;\" width=\"540\" height=\"400\" src=\"https://music.yandex.ru/iframe/#playlist/<%= remote_id %>/show/cover/description/\"></iframe>",
                height: 400,
                width: 540
            },
            ok : {
                regex : /https?:\/\/(?:(?:www|m|mobile)\.)?(?:odnoklassniki|ok)\.ru\/(?:video|live|videoembed)\/(\d+)/,
                html : "<iframe src=\"https://ok.ru/videoembed/<%= remote_id %>/\" frameborder=\"0\" allowfullscreen=\"true\" scrolling=\"no\" height=\"400\" style=\"width:100%;\"></iframe>",
                width: 540,
                height: 400
            }
        },
        pastePatterns: [
            {
                type: 'vk',
                regex: /https?:\/\/(?:vk\.com|tjournal\.ru\/proxy)\/.*(?:video)([-0-9]+_[0-9]+)/,
            },
            {
                type: 'giphy',
                regex: /^https?:\/\/(?:media)?.?giphy\.com\/(?:embed|gifs|media)\/(?:(?:[^\/]+)-([\w+]+)|([\w+]+))/,
            },
            {
                type: 'youtube',
                regex: /^.*(?:(?:youtu\.be)|(?:youtube\.com))\/(?:v\/|u\/\w\/|embed\/|watch\?(?:time_continue=\d+&v=|v=|\&v=))?([^#\&\?]*)(?:[\?\&]t\=(\d*)|)/,
            },
            {
                type: 'vimeo',
                regex: /(?:http[s]?:\/\/)?(?:www.)?vimeo\.co(?:.+\/([^\/]\d+)(?:#t=[\d]+)?s?$)/,
            },
            {
                type: 'coub',
                regex: /https?:\/\/coub\.com\/view\/([^\/\?\&]+)/,
            },
            {
                type: 'vine',
                regex: /https?:\/\/vine\.co\/v\/([^\/\?\&]+)/,
            },
            {
                type: 'imgur',
                regex: /https?:\/\/imgur\.com\/(?:gallery\/)?(?!gallery)([a-zA-Z0-9]+)\/?$/,
            },
            {
                type: 'gfycat',
                regex: /https?:\/\/gfycat\.com(?:(?:\/ru)?\/gifs\/detail|\/ifr)?\/(\w+)/,
            },
            {
                type: 'twitch-channel',
                regex: /https?:\/\/www.twitch.tv\/([^\/\?\&]*)/,
            },
            {
                type: 'twitch-video',
                regex: /https?:\/\/www.twitch.tv\/(?:[^\/\?\&]*\/v|videos)\/([0-9]*)/,
            },
            {
                type: 'yandex-music-album',
                regex: /https?:\/\/music.yandex.ru\/album\/([0-9]*)/,
            },
            {
                type: 'yandex-music-track',
                regex: /https?:\/\/music.yandex.ru\/album\/([0-9]*)\/track\/([0-9]*)/,
            },
            {
                type: 'yandex-music-playlist',
                regex: /https?:\/\/music.yandex.ru\/users\/([^\/\?\&]*)\/playlists\/([0-9]*)/,
            },
            {
                type: 'ok',
                regex: /https?:\/\/(?:(?:www|m|mobile)\.)?(?:odnoklassniki|ok)\.ru\/(?:video|live|videoembed)\/(\d+)/,
            }
        ]
    }
};