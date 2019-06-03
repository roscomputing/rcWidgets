require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');

const cityFactory = function(config) {
    let el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-city-template');

    let vm = {
        popupMode: !!config.popupMode,

        choiceMode: config.choiceMode || 1, // 1 - only city, 2 - city and areas
        withAreasMode: function() {
            return this.get('choiceMode') === 2;
        },

        maxValuesCount: config.maxValuesCount || null,

        description: config.description || '',
        help: config.help || '',
        title: config.title || '',

        // Countries
        countries: [],
        selectedCountryId: null,
        checkCountryIsActive: function(e) {
            return e.Id === this.get('selectedCountryId');
        },
        getCountries: function() {
            this.set('selectedAreaId', null);
            this.set('selectedCountryId', null);

            if (!config.getCountries) {
                return false;
            }

            config.getCountries({}, (items) => {
                this.set('countries', items);

                if (items.length) {
                    this.set('selectedCountryId', items[0].Id);
                    this.getAreas();
                }
            });
        },

        selectCountry: function(e) {
            this.set('searchStr', '');
            this.set('selectedCountryId', e.data.Id);
            this.getAreas();
        },

        // Areas
        areas: [],
        selectedAreaId: null,
        checkAreaIsActive: function(e) {
            return e.Id === this.get('selectedAreaId');
        },
        openArea: function(e) {
            this.set('selectedAreaId', e.data.Id);
            this.getCities();
        },

        selectArea: function(e) {
            this.selectedAreasIds.push(e.data.Id);
            this.selectedAreas.push(e.data);
            return false;
        },

        unselectArea: function(e) {
            this.set('selectedAreasIds', $.grep(this.get('selectedAreasIds'), item => item !== e.data.Id));
            this.set('selectedAreas', $.grep(this.get('selectedAreas'), item => item.Id !== e.data.Id));
        },
        getAreas: function() {
            if (!this.get('selectedCountryId')) {
                this.set('areas', []);
                this.set('selectedAreaId', null);
                return false;
            }

            if (!config.getAreas) {
                return false;
            }

            config.getAreas({
                CountryId: this.get('selectedCountryId')
            }, items => {
                items.unshift({
                    Id: null,
                    Title: 'Все города',
                    CountryId: this.get('selectedCountryId'),
                    Code: 'All cities'
                });

                this.set('areas', items);

                if (items.length) {
                    this.getCities();
                }
            });
        },

        checkAreaIsSelected: function(e) {
            return this.get('selectedAreasIds').indexOf(e.Id) !== -1;
        },

        // Cities
        cities: [],
        allCities: [],
        getCities: function() {
            this.set('cities', []);

            if (!config.getCities) {
                return false;
            }

            config.getCities({
                CountryId: this.get('selectedCountryId'),
                RegionId: this.get('selectedAreaId')
            }, (items) => {
                if (!this.get('selectedAreaId'))
                    this.set('allCities', items);
                this.set('cities', items);
            });
        },
        selectCity: function(e) {
            if (this.maxValuesCount && (this.selectedCitiesIds.length >= this.maxValuesCount)) {
                this.selectedCitiesIds.pop();
                this.selectedCities.pop();
            }

            this.selectedCitiesIds.unshift(e.data.Id);
            this.selectedCities.unshift(e.data);
        },
        unselectCity: function(e) {
            this.set('selectedCitiesIds', $.grep(this.get('selectedCitiesIds'), item => item !== e.data.Id));
            this.set('selectedCities', $.grep(this.get('selectedCities'), item => item.Id !== e.data.Id));
        },
        checkCitySelected: function(e) {
            return this.get('selectedCitiesIds').indexOf(e.Id) !== -1;
        },

        // Search
        searchStr: '',
        searchCityTimeout: null,
        searchCity: function() {
            this.set('selectedAreaId', null);

            if (this.searchCityTimeout) {
                clearTimeout(this.searchCityTimeout);
            }

            this.searchCityTimeout = setTimeout(() => {
                let str = this.searchStr.toLowerCase().trim();
                this.set('cities', $.grep(this.get('allCities'), item => item.Title.toLowerCase().trim().indexOf(str) != -1));
            }, 300);
        },

        // Selected
        selectedAreasIds: config.areas ? $.map(config.areas, function(item) { return item.Id;}): [],
        selectedAreas: config.areas ? config.areas : [],


        selectedCitiesIds: config.cities ? $.map(config.cities, function(item) { return item.Id;}): [],
        selectedCities: config.cities ? config.cities : [],

        // Save
        saveIt: function() {
            el.find('.w-popup').removeClass('no-close');
            el.find('.w-popup').off('onClose').on('onClose', () => {
                config.callback(this.get('selectedCities'), this.get('selectedAreas'));
            });
            el.find('> .w-popup').removeClass('showing');
            el.find('> .w-popup').trigger('onClose');
        },

        close: function() {
            el.find('.w-popup').removeClass('no-close');
            el.find('.w-popup').off('onClose').on('onClose', function() {
                config.callback();
            });
            el.find('> .w-popup').removeClass('showing');
            el.find('> .w-popup').trigger('onClose');
        },

        init: function() {
            if (config.callback)
                el.find('.w-popup').on('onClose', () => {
                    config.callback(this.get('values'));
                });

            if (this.popupMode) {
                el.find('.w-popup').addClass('no-close');
            }

            this.getCountries();
        },

        show: function() {
            if (config.pos) {
                shared.findWidgetPos(el.find('> .w-popup'), config.pos);
            }
            if (!this.popupMode) {
                el.find('> .w-popup').addClass('showing');
            }
        },
        destroy: function() {
            kendo.unbind(el.find('> .w-popup'));
            el.find('> .w-popup').off('mouseup');
            el.off();
            el.remove();
        }
    }

    return shared.bindViewModel(el, vm);
};

module.exports = function(config, callback) {
    let city;

    let data = {
        selector: config.selector,
        log: config.log,
        getCountries: config.getCountries,
        getAreas: config.getAreas,
        getCities: config.getCities,
        maxValuesCount: config.maxValuesCount,
        help: config.help || '',
        popupMode: true,
        choiceMode: config.choiceMode || 2,
        description: config.description || 'Получите города или области',
        title: config.title || 'Выберите города или области',
        cities: config.cities || [],
        areas: config.areas || [],
        callback: function(cities, areas) {
            callback(cities, areas);
            city.destroy();
        }
    };

    city = cityFactory(data);
    city.show();

    return city;
};