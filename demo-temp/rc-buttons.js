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

function initButtons(buttonSelector, config, handler) {
    function btn () {
        window.rc.buttons(config, function(value) {
            typeof handler === 'function' && handler(value);
            btn();
        });
    }

    var button;
    var buttons = [
        {
            name: 'Cancel',
            slug: 'cancel',
        }
    ];
    //var items = getRandomFields();

    config = config || {
        buttons: buttons,
        title: 'Buttons Widget',
        fields: [{
            name: 'Selection 1',
            slug: '1',
        }, {
            name: 'Selection 2',
            slug: '2',
        }, {
            name: 'Selection 3',
            slug: '3',
        }],
    };

    if (buttonSelector) {
        $(buttonSelector)[0].addEventListener('click', function (e) {
            if (!button) {
                config.pageX = e.pageX;
                config.pageY = e.pageY;

                button = window.rc.buttons(config, function(value) {
                    typeof handler === 'function' && handler(value);
                    button = null;
                });
            }
        })
    } else {
        btn();
    }
}