require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');
const componentsShared = require('../../shared/components');

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

    const vm = {
        // Buttons
        onButtonClick: function(e) {
            if (e.data.dontClose) {
                const params = {
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
                componentsShared.performClose(el, [[], e.data.slug || null]);
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
            const ids = this.get('values').map(item => item.id);
            const valIds = this.values.map(item => parseInt(item.id));

            const checkIfItemExist = item => ids.indexOf(item.id) === -1 && (item.name != null || item.fullName != null);

            if (this.total) {
                this.set('total', this.total + items.length);

                let newItems = items;
                if (ids.length || valIds.length) {
                    newItems = items.filter(item => checkIfItemExist(item) && (valIds.indexOf(item.id) === -1));
                }

                this.set('found', $.merge($.extend([], this.found), newItems));
            } else {
                this.set('total', this.total + items.length);
                items = items.filter(item => checkIfItemExist(item) && valIds.indexOf(item.id) === -1);

                this.set('found', items.splice(0, 40).filter(item => checkIfItemExist(item)));
            }
        },

        getPossibleUsersAjax: null,
        getPossibleUsers: function () {
            if (!config.getUsers) {
                return false;
            }

            if (!!this.searchStr) {
                this.total = 0;
                this.set('found', []);
            }

            config.getUsers({
                Skip: this.total || (this.dataParams ? this.dataParams.skip || 0 : 0),
                SearchStr: this.searchStr,
            }, items => {
                this.getUsersSuccess(items);
            });
        },
        getDataAfterEndScroll: function() {
            let scrollEndTimeout = null;

            el.find('ul.found').on('scroll', e => {
                const thatScrEv = e.target; //по достижению конца, подгружаем ещё пользователей

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
            const isOld = $(e.target).closest('li').parent().hasClass('values');

            if (isOld) {
                this.found.unshift(e.data);
                this.set('values', this.get('values').filter(item => item.id !== e.data.id));

                return false;
            }

            this.values.unshift(e.data);

            if (!config.maxValuesCount && this.values.length > 1) {
                this.found.unshift(this.values.pop());
            } else if ((typeof(config.maxValuesCount) == 'number') && this.values.length > config.maxValuesCount) {
                this.found.unshift(this.values.pop());
            }

            this.set('found', this.get('found').filter(item => item.id !== e.data.id));

            if (!config.maxValuesCount && this.values.length > 0) {
                componentsShared.performClose(el);
            }
        },

        onClose(e, ...onCloseParams) {
            if (onCloseParams && onCloseParams.length) {
                config.callback(...onCloseParams);
            } else {
                config.callback(this.get('values'));
            }
        },

        init: function() {
            this.getPossibleUsers();
            componentsShared.onCloseSetup(config, el, this.onClose.bind(this));
        },
        show: function() {
            componentsShared.show(el, false, config.pos);
            //доступ к скроллу в общем виде
            if (config.loadDataAfterScroll) {
                this.getDataAfterEndScroll();
            }
        },
        destroy: function() {
            const showingEl = $('.rc-select.w-popup.showing');

            if (showingEl.length) {
                showingEl.trigger('onClose');
            }

            componentsShared.destroy(el);
        }
    };

    return shared.bindViewModel(el, vm);
};

module.exports = function(config, callback) {
    let users;

    const data = {
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

        callback: (values, slug, params, returnResults) => {
            typeof callback === 'function' && callback(values, slug, params, returnResults);

            let closeIt = true;

            config.buttons.forEach(item => {
                if (item.slug === slug && item.dontClose) {
                    closeIt = false;
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
