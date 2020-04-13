require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const template = require('./index.html');
const componentsShared = require('../../shared/components');

const cityFactory = function(config) {
    const el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-city-template', true);

    let isSaveClicked;

    const vm = {
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
            if (this.selectedAreasIds.indexOf(e.data.Id) !== -1) {
                this.unselectArea(e);
                return false;
            }

            this.selectedAreasIds.push(e.data.Id);
            this.selectedAreas.push(e.data);
        },

        unselectArea: function(e) {
            this.set('selectedAreasIds', this.get('selectedAreasIds').filter(item => item !== e.data.Id));
            this.set('selectedAreas', this.get('selectedAreas').filter(item => item.Id !== e.data.Id));
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
            this.set('selectedCitiesIds', this.get('selectedCitiesIds').filter(item => item !== e.data.Id));
            this.set('selectedCities', this.get('selectedCities').filter(item => item.Id !== e.data.Id));
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
                this.set('cities', this.get('allCities').filter(item => item.Title.toLowerCase().trim().indexOf(str) !== -1));
            }, 300);
        },

        // Selected
        selectedAreasIds: config.areas ? config.areas.map(item =>item.Id): [],
        selectedAreas: config.areas ? config.areas : [],


        selectedCitiesIds: config.cities ? config.cities.map(item =>item.Id): [],
        selectedCities: config.cities ? config.cities : [],

        // Save
        saveIt: function() {
            isSaveClicked = true;
            componentsShared.performClose(el);
        },

        close: function() {
            componentsShared.performClose(el);
        },

        onClose() {
            if (isSaveClicked) {
                config.callback(this.get('selectedCities'), this.get('selectedAreas'));
            } else {
                config.callback();
            }
        },

        init: function() {
            componentsShared.onCloseSetup(config, el, this.onClose.bind(this));

            if (this.popupMode) {
                el.find('.w-popup').addClass('no-close');
            }

            this.getCountries();
        },

        show: function() {
            componentsShared.show(el, true, null, true);
        },

        destroy: function() {
            componentsShared.destroy(el);
        }
    };

    return shared.bindViewModel(el, vm);
};

module.exports = function(config, callback) {
    let city;

    const data = {
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
