require('../../shared/dev-dependencies');
require('./index.less');
require('./index.theme.less');
require('./index.theme.dark.less');

const shared = require('../../shared/index');
const componentsShared = require('../../shared/components');
const template = require('./index.html');

const calendarFactory = function(config) {
    let el = shared.anyWidgetInitialActions(config);

    if (!el) {
        return null;
    }

    shared.initTemplates(el, template, '#rc-calendar-template', false, [{
        templateName: 'rc-calendar-slide-2-template',
    }]);

    let vm = {};
    let to = config.to ? config.to.date : null;
    let type = config.type ? config.type : 2;

    // Месяцы, которые рисуем
    let drawMonthRight = (to ? moment(to) : moment()).clone();
    let drawMonthLeft;

    // Если тип "Период", включаем нужный режим
    if (type === 2) {
        el.find('.rc-calendar').addClass('period-type');
    } else {
        el.find('.rc-calendar .h .type button').toggleClass('active');
    }

    // Если нужны только даты
    if (config.onlyDate) {
        el.find('.rc-calendar').addClass('only-date');
    }

    // Надписи по умолчанию
    el.find('.blue-zone .to .empty-label').html(config.toLabel ? config.toLabel : 'не задано');
    el.find('.blue-zone .from .empty-label').html(config.fromLabel ? config.fromLabel : 'не задано');

    // Нарисовать месяц
    let generateMonth = function(d) {
        let str = '';
        let key = d.format('YYYY-M-');
        let i = 1;

        while (i < d.date(1).isoWeekday()) {
            str += '<li></li>';
            i++;
        }

        i = 1;

        while (i <= d.daysInMonth()) {
            str += `<li class="item" data-id="${key + i}">${i}</li>`;
            i++;
        }
        return str;
    };

    let generateRegulations = function() {
        if (!config.regulations) {
            return false;
        }

        let processTheMinMaxDay = (day, isMinDay) => {
            let dayId = moment(day).format('YYYY-M-D');
            let dayFromLeft = el.find(`.calendar .dates li[data-id=${dayId}]`);
            let compareDateToPred = isMinDay ? (v) => v <= 0 : (v) => v >= 0;

            // Найдем от какого дня
            if (dayFromLeft.length) {
                dayFromLeft = dayFromLeft[isMinDay ? 'prev' : 'next']();
            } else {
                let lastDayId = el.find(`.calendar .dates li:${isMinDay ? 'last' : 'first'}`).attr('data-id');
                if (moment(lastDayId, 'YYYY-M-D').diff(moment(day)) < 0) {
                    dayFromLeft = el.find(`.calendar .dates li:${isMinDay ? 'last' : 'first'}`);
                }
            }

            // И пойдем от него влево
            if (dayFromLeft && dayFromLeft.length) {
                let compareDateFrom = moment($(dayFromLeft).attr('data-id'), 'YYYY-M-D');
                el.find('.calendar .dates li').forEach((v) => {
                    v = $(v);
                    if (v.attr('data-id')) {
                        let compareDateTo = moment(v.attr('data-id'), 'YYYY-M-D');
                        compareDateToPred(compareDateTo.diff(compareDateFrom)) && v.addClass('disabled');
                    }
                });
            }
        };
        let sevenDisable = (el, v, pred) => pred && el.find(`.calendar .dates li:nth-child(7n + ${v.DayId})`).addClass('disabled');
        let specialDisable = (el, v, pred) => pred && el.find(`.calendar .dates li[data-id=${moment(v.Date).format('YYYY-M-D')}]`).addClass('disabled');
        let sunday = 0;
        let saturday = 6;

        config.regulations.BaseDays.forEach((v,k) => sevenDisable(el, v, config.regulations.OffHoursSelectable ? (k !== sunday && k !== saturday && !v.IsWorking) : !v.IsWorking));
        config.regulations.SpecialDays.forEach((v) => specialDisable(el, v, !v.IsWorking));
        config.minDate && processTheMinMaxDay(config.minDate, true);
        config.maxDate && processTheMinMaxDay(config.maxDate);
    };

    let setMonths = function() {
        drawMonthLeft = drawMonthRight.clone().date(25).subtract(1, 'month');

        // Генерируем сам календарь
        el.find('.calendar.right .dates').html(generateMonth(drawMonthRight));
        el.find('.calendar:not(.right) .dates').html(generateMonth(drawMonthLeft));

        // Обновляем заголовки
        el.find('.title .r .slide-1 .month').html(drawMonthRight.format('MMMM'));
        el.find('.title .r .slide-1 .year').html(drawMonthRight.year());

        el.find('.title .l .slide-1 .month').html(drawMonthLeft.format('MMMM'));
        el.find('.title .l .slide-1 .year').html(drawMonthLeft.year());

        let today = moment().format('YYYY-M-D');

        if (el.find('[data-id=' + today + ']').length)
            el.find('[data-id=' + today + ']').addClass('today');

        generateRegulations();
        setDays();
    };

    let setDays = function() {
        el.find('.selected-from').removeClass('selected-from');
        el.find('.selected-to').removeClass('selected-to');
        el.find('.selected-between').removeClass('selected-between');
        el.find('.selected-item').removeClass('selected-item');

        if (vm.to) {
            el.find('.blue-zone .to').removeClass('empty');
            el.find('.blue-zone .to .choice-time').html(moment(vm.to).format('HH:mm'));

            let toKey = moment(vm.to).format('YYYY-M-D');
            if (el.find('[data-id=' + toKey + ']').length) {
                el.find('[data-id=' + toKey + ']').addClass('selected-to');
            }
        } else {
            el.find('.blue-zone .to').addClass('empty');
        }

        if (vm.from) {
            el.find('.blue-zone .from').removeClass('empty');
            el.find('.blue-zone .from .choice-time').html(moment(vm.from).format('HH:mm'));

            let fromKey = moment(vm.from).format('YYYY-M-D');
            if (el.find('[data-id=' + fromKey + ']').length) {
                el.find('[data-id=' + fromKey + ']').addClass('selected-from');
                if (vm.type === 1) {
                    el.find('[data-id=' + fromKey + ']').addClass('selected-item');}
            }
        } else {
            el.find('.blue-zone .from').addClass('empty');
        }

        let lFirst = el.find('.calendar:not(.right) .dates li.item:first');
        let rFirst = el.find('.calendar.right .dates li.item:first');

        let toId = moment(vm.to).month();
        let fromId = moment(vm.from).month();

        let drawToId = drawMonthRight.month();
        let drawFromId = drawMonthLeft.month();

        if (vm.to) {
            if (moment(vm.to).month() >= drawToId) {
                if ((!vm.from) || (moment(vm.from).month() < drawToId)) {
                    rFirst.addClass('selected-from').addClass('selected-between');
                }
            }
        }

        if (vm.from) {
            if (moment(vm.from).month() < drawFromId) {
                if ((!vm.to) || (moment(vm.to).month() >= drawFromId)) {
                    lFirst.addClass('selected-from').addClass('selected-between');
                }
            }
        }

        if (vm.type === 2) {
            if (vm.to && !vm.from) {
                if (moment(vm.to).month() >= drawMonthRight.month()) {
                    rFirst.addClass('selected-from').addClass('selected-between');
                    lFirst.addClass('selected-from').addClass('selected-between');
                }

                if (moment(vm.to).month() === drawMonthLeft.month()) {
                    lFirst.addClass('selected-from').addClass('selected-between');
                }
            }

            if (!vm.to && vm.from) {
                if (moment(vm.from).month() === drawMonthLeft.month()) {
                    rFirst.addClass('selected-from').addClass('selected-between');
                }
                if (moment(vm.from).month() < drawMonthLeft.month()) {
                    rFirst.addClass('selected-from').addClass('selected-between');
                    lFirst.addClass('selected-from').addClass('selected-between');
                }
            }
        }
    };

    // Events

    let plusMonth = function() {
        drawMonthRight.date(25).add(1, 'month');
        drawMonthLeft.date(25).add(1, 'month');
        setMonths();
    };

    let moinMonth = function() {
        drawMonthRight.date(25).subtract(1, 'month');
        drawMonthLeft.date(25).subtract(1, 'month');
        setMonths();
    };

    // Time Choice
    let setTime = function(time, isTo) {
        let mTo = moment(vm.to);
        let mFrom = moment(vm.from);

        if (isTo) {
            mTo.hour(parseInt(time.split(':')[0])).minutes(parseInt(time.split(':')[1]));

            if (vm.from && mFrom.diff(mTo) > 0) {
                mTo.hour(mFrom.hour()).minutes(mFrom.minutes())
            }
        }
        else {
            mFrom.hour(parseInt(time.split(':')[0])).minutes(parseInt(time.split(':')[1]));
            if (vm.to && mFrom.diff(mTo) > 0) {
                mFrom.hour(mTo.hour()).minutes(mTo.minutes())
            }
        }

        if (vm.to) {
            vm.set('to', mTo.format('YYYY-MM-DDTHH:mm:ss'));
        }

        if (vm.from) {
            vm.set('from', mFrom.format('YYYY-MM-DDTHH:mm:ss'));
        }

        vm.dateIsChange();

        setDays();
    };

    let timeChoice = function(e) {
        if (e.target.nodeName.toUpperCase() !== 'LI') {
            return false;
        }
        setTime($(e.target).text(), !!$(e.target).closest('.to').length);
    };

    el.find('.time-choice ul').on('click', timeChoice);


    let getTimeRange = function(date) {
        if (!date) {
            return false;
        }

        let defaultTimeRange = {
            iMin: 0,
            iMax: 23,
            jMin: 0,
            jMax: 59
        };
        let baseDays = config.regulations && config.regulations.BaseDays;

        if (baseDays && baseDays.length) {
            date = moment(date).day();
            let getNumber = (o, p, d) => (o && !Number.isNaN(o[p])) ? o[p] : d;
            let ranges = baseDays.filter((d) => d.DayId === date).map((d) => {
                return {
                    iMin: getNumber(d.StartWorkingTime, 'Hour', 0),
                    iMax: getNumber(d.EndWorkingTime, 'Hour', 23),
                    jMin: getNumber(d.StartWorkingTime, 'Minutes', 0),
                    jMax: getNumber(d.EndWorkingTime, 'Minutes', 59)
                }
            });
            return (ranges && ranges.length && ranges[0]) || defaultTimeRange;
        }

        return defaultTimeRange;
    };

    let showTimeChoice = function(e) {
        let date = $(e.target).closest('.to').length ? vm.to : vm.from;

        if (!date) {
            return false;
        }

        let tRange = getTimeRange(date);

        if (tRange.iMax === -1) {
            return false;
        }

        el.find('.blue-zone .time-choice ul').empty('');
        // Сгенерируем выбор времени
        let i,j;
        let makeTimeLabel = function(h, m) {
            el.find('.blue-zone .time-choice ul').append('<li>' + ('0' + h).slice (-2) + ':' + ('0' + m).slice (-2) + '</li>');
        };

        makeTimeLabel(tRange.iMin, tRange.jMin);
        for (i = tRange.iMin * 60 + tRange.jMin + 30; i < tRange.iMax * 60 + tRange.jMax; i += 30) {
            makeTimeLabel( parseInt(i / 60),    (parseInt((i % 60) / 30) * 30) % 60)
        }
        makeTimeLabel(tRange.iMax, tRange.jMax);

        $(e.target).closest('div').find('> .time-choice').addClass('showing');
    };

    if (!vm.toDisabled || !vm.fromDisabled) {
        el.find('.blue-zone .choice-time').on('click', showTimeChoice);
    }

    el.find('> .w-popup').on('mouseup', function(e) {
        el.find('> .w-popup').find('.showing').removeClass('showing');
    });

    vm = {
        to:  config.to ? config.to.date : null,
        from: config.from ? config.from.date : null,
        toDisabled: config.to ? !! config.to.disabled: false,
        fromDisabled: config.from ? !! config.from.disabled: false,
        slide: 1,

        setSlideThree: function(year) {
            this.set('leftTitle', (year - 16) + '-' + (year - 1));
            this.set('rightTitle', (year) + '-' + (year + 15));

            let leftArray = [];
            let rightArray = [];

            for (let i = 0; i < 16; i++) {
                leftArray.push({
                    id: year - (16 - i),
                    name: year - (16 - i),
                });
                rightArray.push({
                    id: year + i,
                    name: year + i,
                });
            }

            this.set('leftArray', leftArray);
            this.set('rightArray', rightArray);
        },
        setSlideTwo: function(year) {
            this.set('leftTitle', year - 1);
            this.set('rightTitle', year);

            let leftArray = [];
            let rightArray = [];

            for (let i = 0; i < 12; i++) {
                leftArray.push({
                    id: i,
                    name: moment().month(i).format('MMMM'),
                    year: year - 1
                });
                rightArray.push({
                    id: i,
                    name: moment().month(i).format('MMMM'),
                    year: year
                });
            }

            this.set('leftArray', leftArray);
            this.set('rightArray', rightArray);
        },

        addSlide: function() {
            this.set('slide', Math.min(this.slide + 1, 4));

            if (this.slide === 4) {
                let year;

                if (this.get('from')) {
                    year = moment(this.get('from')).year();
                } else if (this.get('to')) {
                    year = moment(this.get('to')).year();
                } else {
                    year = moment().year();
                }

                this.set('leftTitle', (year - 128) + '-' + (year - 1));
                this.set('rightTitle', (year) + '-' + (year + 127));

                let leftArray = [];
                let rightArray = [];

                for (let i = 0; i < 8; i++) {
                    leftArray.push({
                        year: year - (8 - i) * 16 + 15 + 1,
                        id: (year - (8 - i) * 16) + ' - ' + (year - (8 - i) * 16 + 15),
                        name: (year - (8 - i) * 16) + ' - ' + (year - (8 - i) * 16 + 15),
                    });
                    rightArray.push({
                        year: year + i * 16,
                        id: (year + i * 16) + ' - ' + (year + i * 16 + 15),
                        name: (year + i * 16) + ' - ' + (year + i * 16 + 15),
                    });
                }

                this.set('leftArray', leftArray);
                this.set('rightArray', rightArray);
            }

            if (this.slide === 3) {
                let year;

                if (this.get('from')) {
                    year = moment(this.get('from')).year();
                } else if (this.get('to')) {
                    year = moment(this.get('to')).year();
                } else {
                    year = moment().year();
                }

                this.setSlideThree(year);
            }

            if (this.slide === 2) {
                let year;
                if (this.get('from')) {
                    year = moment(this.get('from')).year();
                } else if (this.get('to')) {
                    year = moment(this.get('to')).year();
                } else {
                    year = moment().year();
                }
                this.setSlideTwo(year);
            }
        },

        choiceSlide2Item: function(e) {
            if (this.slide === 4) {
                this.setSlideThree(e.data.year);
                this.set('slide', 3);
            } else if (this.slide === 3) {
                if ($(e.target).closest('.left').length) {
                    this.setSlideTwo(e.data.id + 1);
                } else {
                    this.setSlideTwo(e.data.id);
                }
                this.set('slide', 2);
            } else if (this.slide === 2) {
                if ($(e.target).closest('.left').length) {
                    if (this.get('leftTitle')) {
                        drawMonthLeft.year(this.get('leftTitle'));
                    }

                    drawMonthLeft.date(1).month(e.data.id);
                    drawMonthRight = drawMonthLeft.clone();
                    drawMonthRight.date(25).add(1, 'month');
                } else {
                    if (this.get('rightTitle')) {
                        drawMonthRight.year(this.get('rightTitle'));
                    }

                    drawMonthRight.date(1).month(e.data.id);
                    drawMonthLeft = drawMonthRight.clone();
                    drawMonthLeft.date(25).subtract(1, 'month');
                }
                setMonths();

                this.set('slide', 1);
            }
        },

        // Title
        leftTitle: '',
        rightTitle: '',
        leftArray: [],
        rightArray: [],


        // Visible
        getVisibleDayChoice: function() {
            return this.get('slide') === 1;
        },

        moin: function() {
            if (this.slide === 4) {
                let year = this.leftArray[0].year - 16;

                if (year - 128 < 0) {
                    return false;
                }

                this.set('rightTitle', this.get('leftTitle'));
                this.set('rightArray', $.merge([], this.get('leftArray')));
                this.set('leftTitle', (year - 128) + '-' + (year - 1));

                let leftArray = [];
                let rightArray = [];

                for (let i = 0; i < 8; i++) {
                    leftArray.push({
                        year: year - (8 - i) * 16 + 15 + 1,
                        id: (year - (8 - i) * 16) + ' - ' + (year - (8 - i) * 16 + 15),
                        name: (year - (8 - i) * 16) + ' - ' + (year - (8 - i) * 16 + 15),
                    });
                }

                this.set('leftArray', leftArray);
            }
            else if (this.slide === 3) {
                let year = this.leftArray[0].id;

                if (year - 16 < 0) {
                    return false;
                }

                this.set('rightTitle', this.get('leftTitle'))
                this.set('rightArray', $.merge([], this.get('leftArray')));
                this.set('leftTitle', (year - 16) + '-' + (year - 1));

                let leftArray = [];
                for (let i = 0; i < 16; i++) {
                    leftArray.push({
                        id: year - (16 - i),
                        name: year - (16 - i),
                    });
                }
                this.set('leftArray', leftArray)
            }
            else if (this.slide === 1) {
                moinMonth();
            }
            else if (this.slide === 2) {
                this.set('rightTitle', this.get('leftTitle'));
                this.set('leftTitle', +this.get('leftTitle') - 1);
            }
        },
        plus: function() {
            if (this.slide === 4) {
                let year = this.rightArray[this.rightArray.length - 1].year + 16;

                if (year > 3000) {
                    return false;
                }

                this.set('leftTitle', this.get('rightTitle'));
                this.set('leftArray', $.merge([], this.get('rightArray')));
                this.set('rightTitle', (year) + '-' + (year + 127));

                let rightArray = [];

                for (let i = 0; i < 8; i++) {
                    rightArray.push({
                        year: year + i * 16,
                        id: (year + i * 16) + ' - ' + (year + i * 16 + 15),
                        name: (year + i * 16) + ' - ' + (year + i * 16 + 15),
                    });
                }

                this.set('rightArray', rightArray);
            }
            else if (this.slide === 3) {
                let year = this.rightArray[this.rightArray.length - 1].id + 1;

                if (year > 3000) {
                    return false;
                }

                this.set('leftTitle', this.get('rightTitle'));
                this.set('leftArray', $.merge([], this.get('rightArray')));
                this.set('rightTitle', (year) + '-' + (year + 15));

                let rightArray = [];
                for (let i = 0; i < 16; i++) {
                    rightArray.push({
                        id: year + i,
                        name: year + i,
                    });
                }
                this.set('rightArray', rightArray);
            }
            else if (this.slide === 1) {
                plusMonth();
            }
            else if (this.slide === 2) {
                this.set('leftTitle', this.get('rightTitle'));
                this.set('rightTitle', +this.get('rightTitle') + 1);
            }
        },

        removeButtonVisible: function() {
            return !this.get('toDisabled') && !this.get('fromDisabled')
                && (!!this.get('from') || !!this.get('to'));
        },
        removeIt: function() {
            this.set('to', null);
            this.set('from', null);
            this.dateIsChange();
            setDays();
        },

        getVisibleBlueZone: function() {
            return (config.type === 2 || !config.onlyDate);
        },

        // Дергается тогда, когда пользователь РУКАМИ меняет to или from
        dateIsChange: function() {
        },

        type: config.type || 2,

        onlyDate: config.onlyDate,

        // Day choice
        dayChoice: function(e) {
            if ($(e.target).hasClass('item') && (!$(e.target).hasClass('disabled'))) {
                let dayId = $(e.target).attr('data-id');
                let val = moment(dayId, 'YYYY-M-D');

                if (!this.fromDisabled && !this.toDisabled) {

                    if (!this.from) {
                        this.set('from', val.clone().format('YYYY-MM-DDTHH:mm:ss'));
                    } else if (!this.to) {
                        if (moment(this.from).diff(val) > 0) {
                            this.set('to', moment(this.from).clone().format('YYYY-MM-DDTHH:mm:ss'));
                            this.set('from', val.clone().format('YYYY-MM-DDTHH:mm:ss'));
                        } else {
                            this.set('to', val.clone().format('YYYY-MM-DDTHH:mm:ss'));
                        }
                    } else {
                        this.set('from', val.clone().format('YYYY-MM-DDTHH:mm:ss'));
                        this.set('to', null);
                    }

                    if (this.from && this.to) {
                        if (moment(this.to).diff(moment(this.from)) < 0) {
                            val = this.to;
                            this.set('to', this.from);
                            this.set('from', this.val);
                        }
                    }
                } else if (this.fromDisabled && !this.toDisabled) {
                    if (this.from && (moment(this.from).diff(val) > 0)) {
                        this.set('to', moment(this.from).format('YYYY-MM-DDT23:59:59'));
                    }
                    else {
                        this.set('to', val.clone().format('YYYY-MM-DDT23:59:59'));
                    }

                    let tRange = getTimeRange(this.to);
                    if (tRange) {
                        setTime(tRange.iMin + ':' + tRange.jMin, true);
                    }

                    // Кнопка применить в этом случае скрыта и применяем изменения автоматом
                    if (this.onlyDate)
                        this.apply();

                } else if (!this.fromDisabled && this.toDisabled) {
                    if (this.to && (moment(this.to).diff(val) < 0)) {
                        this.set('from', moment(this.to).format('YYYY-MM-DDT00:00:01'));
                    }
                    else {
                        this.set('from', val.clone().format('YYYY-MM-DDT00:00:01'));
                    }

                    let tRange = getTimeRange(this.from);
                    if (tRange)
                        if (config.autoSetTime) {

                            //
                            // "Для выходного с возможностью выбора должны отображаться все часы даты,
                            // а по умолчанию  должно проставлять последнее рабочее время из последнего
                            // рабочего дня в рабочем календаре до выбранного нерабочего дня"
                            //
                            let isOffDay = false;
                            $.each(config.regulations.BaseDays, function(k,v) {
                                if (v.DayId === val.day() && config.regulations.OffHoursSelectable && !v.IsWorking) {
                                    if (config.regulations.OffHoursSelectable && !v.IsWorking) {
                                        isOffDay = true;
                                    }
                                }
                            });

                            if (isOffDay) {

                                var lastWorkingDayBeforeId = -1;
                                $.each(config.regulations.BaseDays, function (k, v) {
                                    let aDay = val.day() === 0 ? 7 : val.day();
                                    if (v.DayId < aDay && v.IsWorking && v.DayId > lastWorkingDayBeforeId) {
                                        lastWorkingDayBeforeId = v.DayId;
                                    }
                                });

                                if (lastWorkingDayBeforeId) {
                                    var range = config.regulations.BaseDays[lastWorkingDayBeforeId];
                                    var aRange = {
                                        iMin: range.StartWorkingTime.Hour,
                                        iMax: range.EndWorkingTime.Hour,
                                        jMin: range.StartWorkingTime.Minutes,
                                        jMax: range.EndWorkingTime.Minutes
                                    };
                                    setTime(aRange.iMax + ':' + aRange.jMax, false);
                                } else {
                                    setTime(tRange.iMax + ':' + tRange.jMax, false);
                                }

                            } else {
                                setTime(tRange.iMax + ':' + tRange.jMax, false);
                            }
                        } else {
                            setTime(tRange.iMin + ':' + tRange.jMin, false);
                        }

                    // Кнопка применить в этом случае скрыта и применяем изменения автоматом
                    if (this.onlyDate)
                        this.apply();
                }

                vm.dateIsChange();

                setDays();
            }
        },


        getFromDateLabel: function() {
            let from = this.get('from');

            if (from) {
                return moment(from).format('DD MMM YYYY');
            }

            return '';
        },

        getToDateLabel: function() {
            let to = this.get('to');

            if (to) {
                return moment(to).format('DD MMM YYYY');
            }

            return '';
        },

        onClose() {
            config.callback(this.get('from'), this.get('to'), null);
        },

        init: function() {
            componentsShared.onCloseSetup(config, el, this.onClose.bind(this));
            setMonths();
        },

        apply: function () {
            if (config.callback) {
                config.callback(this.from, this.to, this.get('option'));
            }
        },

        show: function() {
            if (config.pos) {
                config.pos.height = 500;
            }
            componentsShared.show(el, false, config.pos);
        },

        destroy: function() {
            el.find('.choice-time').off('click');
            el.find('.time-choice li').off('click');
            el.find('.calendar').off('click');
            el.find('.title .r button').off('click');
            el.find('.title .l button').off('click');
            componentsShared.destroy(el);
        }
    };

    vm = shared.bindViewModel(el, vm);

    return vm;
};

module.exports = function(config, callback) {
    let calendar;

    let data = {
        selector: config.selector,
        log: config.log,
        pos: {
            x: config.pageX || 0,
            y: config.pageY || 0,
        },
        toLabel: config.toLabel || '',
        type: config.type || 1,
        fromLabel: config.fromLabel || '',
        to: {
            date: config.to || null,
            disabled: config.type !== 2
        },
        from: {
            date: config.from || null
        },
        regulations: config.regulations,
        onlyDate: config.onlyDate,
        callback: function(from, to) {
            callback(from, to);
            calendar.destroy();
        }
    };

    calendar = calendarFactory(data);
    calendar.show();

    return calendar;
};