var weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var birthDayCount = 0;
var container = document.getElementById('container');

var textareadata = [{
        name: 'Tyrion Lannister',
        birthday: '12/02/1978',
    },
    {
        name: 'Cersei Lannister',
        birthday: '11/30/1975',
    },
    {
        name: 'Daenerys Targaryen',
        birthday: '11/24/1991',
    },
    {
        name: 'Arya Stark',
        birthday: '11/25/1996',
    },
    {
        name: 'Jon Snow',
        birthday: '12/03/1989',
    },
    {
        name: 'Sansa Stark',
        birthday: '15/08/1992',
    },
    {
        name: 'Jorah Mormont',
        birthday: '12/16/1968',
    },
    {
        name: 'Jaime Lannister',
        birthday: '12/06/1975',
    },
    {
        name: 'Sandor Clegane',
        birthday: '11/07/1969',
    },
    {
        name: 'Tywin Lannister',
        birthday: '10/12/1951',
    },
    {
        name: 'Theon Greyjoy',
        birthday: '12/31/1989',
    },
    {
        name: 'Samwell Tarly',
        birthday: '12/07/1990',
    },
    {
        name: 'Joffrey Baratheon',
        birthday: '06/12/1992',
    },
    {
        name: 'Catelyn Stark',
        birthday: '12/03/1962',
    },
    {
        name: 'Bran Stark',
        birthday: '12/02/1995',
    },
    {
        name: 'Petyr Baelish',
        birthday: '11/20/1974',
    },
    {
        name: 'Robb Stark',
        birthday: '11/28/1986',
    },
    {
        name: 'Brienne of Tarth',
        birthday: '11/27/1985',
    },
    {
        name: 'Margaery Tyrell',
        birthday: '12/02/1989',
    },
    {
        name: 'Stannis Baratheon',
        birthday: '09/14/1971',
    },
    {
        name: 'Davos Seaworth',
        birthday: '02/13/1973',
    },
    {
        name: 'Tormund Giantsbane',
        birthday: '12/14/1974',
    },
    {
        name: 'Jeor Mormont',
        birthday: '11/01/1955',
    },
    {
        name: 'Eddard Stark',
        birthday: '12/02/1963',
    },
    {
        name: 'Khal Drogo',
        birthday: '12/05/1980',
    },
    {
        name: 'Ramsay Bolton',
        birthday: '12/05/1976',
    },
    {
        name: 'Robert Baratheon',
        birthday: '12/02/1965',
    },
    {
        name: 'Daario Naharis',
        birthday: '12/02/1985',
    },
    {
        name: 'Viserys Targaryen',
        birthday: '12/06/1984',
    },
];
document.getElementById('input-data').value = JSON.stringify(
    textareadata,
    undefined,
    2
);

createCard();

function update() {
    var yearInput = document.getElementById('input-year').value;
    validateInput(yearInput);
    createCard();
    cardData(yearInput).forEach(e => {
        usercardDisplay(e)
    });
}


function birthDayText(birthDayCount) {
    return birthDayCount > 0 ? birthDayCount + " birthdays" : "No birthday"
}

function createCard() {

    weekDays.forEach(weekDay => {
        var cardExist = document.getElementById(weekDay);
        if (cardExist != null) {
            cardExist.parentNode.removeChild(cardExist);
        }
        var card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('id', weekDay);

        var cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        card.appendChild(cardHeader);

        var text = document.createTextNode(weekDay);
        cardHeader.appendChild(text);

        var p2 = document.createElement('p');
        p2.id = weekDay + "birthday";
        p2.classList.add('birthday-txt');
        p2.innerHTML = birthDayText(0);
        card.append(p2)
        container.appendChild(card);
    });
}

function cardData(yearInput) {
    let cardDataList = [];
    cardDataList = JSON.parse(document.getElementById('input-data').value).reduce(
        function(filtered, option) {
            var birthday = new Date(option.birthday);
            console.log(birthday)

            if (birthday.getFullYear() == parseInt(yearInput)) {
                var cardDetailObj = {
                    userInitial: option.name
                        .split(' ')
                        .map(n => n[0])
                        .join(''),
                    weekDay: weekDays[birthday.getDay()],
                    backgroundColor: getRandomColor(),
                };
                filtered.push(cardDetailObj);
            }
            return filtered;
        }, []
    );
    return cardDataList;
}

function validateInput(yearInput) {
    var minlen = 4;
    var maxlen = 4;
    if (yearInput.length < minlen || yearInput.length > maxlen) {
        alert("Only 4 character allowed!!")
        return;
    }
    if (isNaN(yearInput)) {
        alert("Only Number allowed!!");
        return;
    }
    if (cardData(yearInput).length == 0) {
        alert("NO birthday found!!");
    }
}


function usercardDisplay(e) {

    var cardBody = document.getElementById(e.weekDay);
    var text = document.createTextNode(e.userInitial);

    var cardUser = document.createElement('div');
    cardUser.classList.add('card-user');
    cardUser.style.background = e.backgroundColor;
    cardUser.setAttribute('id', e.userInitial + e.backgroundColor);
    cardUser.appendChild(text);
    cardBody.appendChild(cardUser);
    var birtdaytext = document.getElementById(e.weekDay + "birthday");
    var parent = document.querySelector('#' + e.weekDay);
    var birthDayListCount = parent.querySelectorAll('.card-user').length;
    birtdaytext.innerHTML = birthDayText(birthDayListCount);
}

function getRandomColor() {
    var varters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += varters[Math.floor(Math.random() * 16)];
    }
    return color;
}