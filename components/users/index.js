require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');

const usersFactory = function(config) {
    let el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-users-template', false, [{
        templateName: 'rc-users-user-item-template',
        userTemplate: config.template
    }, {
        templateName: 'rc-users-button-item-template'
    }]);

    let vm = {
        // Buttons
        onButtonClick: function(e) {
            if (e.data.dontClose) {
                let params = {
                    pageX: e.pageX,
                    pageY: e.pageY
                };
                config.callback([], e.data.slug || null, params, (items, params) => {
                    if (params) {
                        if (!params.addAfterValues) {
                            this.found = [];
                        }
                    }

                    if (items) {
                        this.getUsersSuccess(items);
                    }
                });
            } else {
                el.find('.w-popup').off('onClose').on('onClose', function() {
                    config.callback([], e.data.slug || null);
                });
                el.find('> .w-popup').removeClass('showing');
                el.find('> .w-popup').trigger('onClose');
            }
        },

        actionButtons: config.actionButtons || [],
        buttons: config.buttons || [],

        // Values
        values: config.values ? config.values : [],
        valuesExists: function() {
            return !!this.get('values').length;
        },

        dataParams: config.userOptions.dataParams || '',

        // Found
        found: config.found ? config.found : [],
        showLoader: false,
        usersTypeUrlExtens: config.usersTypeUrlExtens || '',
        searchStr: '',
        total: 0,
        searchStrTimeout: null,
        searchStrChange: function() {
            if (this.searchStrTimeout) {
                clearTimeout(this.searchStrTimeout);
            }

            this.searchStrTimeout = setTimeout(() => {
                if (!this.searchStr) {
                    this.set('total', 0);
                }

                this.set('found', []);
                this.getPossibleUsers();
            }, 300);
        },

        getUsersSuccess: function(items) {
            let ids = $.map(this.get('values'), item => item.id);
            let valIds = $.map(this.values, item => parseInt(item.id));

            if (this.total) {
                this.set('total', this.total + items.length);

                let newItems = [];
                if (ids.length || valIds.length) {
                    newItems = $.grep(items, function (item) {
                        return (ids.indexOf(item.id) === -1) && (item.name != null || item.fullName != null) && (valIds.indexOf(item.id) === -1);
                    });
                } else {
                    newItems = items;
                }

                this.set('found', $.merge($.extend([], this.found), newItems));
            } else {
                this.set('total', this.total + items.length);
                items = $.grep(items, function(item) {
                    return (ids.indexOf(item.id) === -1) && (item.name != null || item.fullName != null) && (valIds.indexOf(item.id) === -1);
                });

                this.set('found', $.grep(items.splice(0, 40), function(item) {
                    return ids.indexOf(item.id) === -1 && (item.name != null || item.fullName != null);
                }));
            }
        },

        getPossibleUsersAjax: null,
        getPossibleUsers: function () {
            if (!config.getUsers) {
                return false;
            }

            let hasSearchString = !!this.searchStr;
            if (hasSearchString) {
                this.total = 0;
                this.set('found', []);
            }

            config.getUsers({
                Skip: this.total || (this.dataParams ? this.dataParams.skip || 0 : 0),
                SearchStr: this.searchStr,
            }, (items) => {
                this.getUsersSuccess(items);
            });
        },
        getDataAfterEndScroll: function() {
            let scrollEndTimeout = null;

            el.find('ul.found').on('scroll', (e) => {
                let thatScrEv = e.target;
                //по достижению конца, подгружаем ещё пользователей
                if (scrollEndTimeout) {
                    clearTimeout(scrollEndTimeout);
                }

                scrollEndTimeout = setTimeout(() => {
                    let t = $(thatScrEv),
                        firstElementHeight = t.find('li:first').length ? t.find('li:first').innerHeight() : 0;
                    //+ высота одного из элементов списка
                    if (t.height() + t.scrollTop() + firstElementHeight >= thatScrEv.scrollHeight && !this.searchStr) {
                        this.getPossibleUsers();
                    }
                }, 400);
            });
        },

        // Click
        userClick: function(e) {
            let isOld = $(e.target).closest('li').parent().hasClass('values');

            if (isOld) {
                this.found.unshift(e.data);
                this.set('values', $.grep(this.get('values'), item => item.id !== e.data.id));
                return false;
            }

            this.values.unshift(e.data);

            if (!config.maxValuesCount && this.values.length > 1) {
                this.found.unshift(this.values.pop());
            } else if ((typeof(config.maxValuesCount) == 'number') && this.values.length > config.maxValuesCount) {
                this.found.unshift(this.values.pop());
            }

            this.set('found', $.grep(this.get('found'), item => item.id !== e.data.id));

            if (!config.maxValuesCount && this.values.length > 0) {
                el.find('> .w-popup').removeClass('showing');
                el.find('> .w-popup').trigger('onClose');
            }
        },


        init: function() {
            this.getPossibleUsers();

            if (config.callback) {
                el.find('.w-popup').on('onClose', () => {
                    config.callback(this.get('values'));
                });
            }
        },
        show: function() {
            if (config.pos) {
                shared.findWidgetPos(el.find('> .w-popup'), config.pos);
            }

            el.find('> .w-popup').addClass('showing');
            el.find('input').focus();

            //доступ к скроллу в общем виде
            if (config.loadDataAfterScroll) {
                this.getDataAfterEndScroll();
            }
            shared.setMainOverflow(true);
        },
        destroy: function() {
            kendo.unbind(el.find('> .w-popup'));
            el.find('> .w-popup').off('mouseup');

            el.off();
            el.remove();

            let showingEl = $('.rc-select.w-popup.showing');

            if (showingEl.length) {
                showingEl.trigger('onClose');
            }
            shared.setMainOverflow();
        }
    };

    return shared.bindViewModel(el, vm);
};

module.exports = function(config, callback) {
    let users;

    let data = {
        selector: config.selector,
        log: config.log,
        template: config.template,
        getUsers: config.getUsers,
        maxValuesCount: config.maxValuesCount || true,
        loadDataAfterScroll: true,
        values: config.values || [],
        buttons: config.buttons || [],
        pos: {
            x: config.pageX,
            y: config.pageY,
        },
        buttonHoverEvent: true,
        userOptions: {
            dataParams: {
                take: 20,
                skip: 0
            }
        },

        callback: function(values, slug, params, returnResults) {
            typeof callback === 'function' && callback(values, slug, params, returnResults);

            let closeIt = true;

            $.each(config.buttons, function(k,v) {
                if (v.slug === slug) {
                    if (v.dontClose) {
                        closeIt = false;
                    }
                }
            });

            if (closeIt)
                users.destroy();
        }
    };

    users = usersFactory(data);
    users.show();

    return users;
};