var rrw = ['Пипица', 'Хабара', 'Мимозыря', 'Ендовочник', 'Яга', 'Волглый', 'Алкать', 'Анахорет', 'Яхон', 'Шепотник', 'Ужик', 'Торок', 'Анчутки',
    'Титла', 'Талан', 'Ококоветь', 'Супря', 'Студенец', 'Странь', 'Наопако', 'Мужатица', 'Любительный', 'Звездочетство', 'Анчутки',
    'Вавакать', 'Взбутусить', 'Выдень', 'Копырзиться', 'Наопако', 'Нюни', 'Огуртво', 'Ономнясь', 'Сарынь', 'Странь', 'Сычёный'];

function getRandomFields() {
    var items = [];
    var i = 0;
    while (i < 3 + parseInt(Math.random() * 10)) {
        items.push({
            slug: i + 1,
            name: rrw[parseInt(Math.random() * rrw.length)]
        });
        i++;
    }
    return items;
}

function initButtons(selector, buttonSelector, config, handler) {
    function btn () {
        rcWidgets.buttons(config, function(value) {
            typeof handler === 'function' && handler(value);
            btn();
        });
    }

    var button;
    var buttons = [
        {
            name: 'Отменить всё что можно',
            slug: 'cancel',
        }
    ];
    var items = getRandomFields();

    config = config || {
        selector: selector,
        buttons: buttons,
        title: 'Изменить статус',
        fields: items,
    };

    if (buttonSelector) {
        $(buttonSelector)[0].addEventListener('click', function (e) {
            if (!button) {
                config.pageX = e.pageX;
                config.pageY = e.pageY;

                button = rcWidgets.buttons(config, function(value) {
                    typeof handler === 'function' && handler(value);
                    button = null;
                });
            }
        })
    } else {
        btn();
    }
}