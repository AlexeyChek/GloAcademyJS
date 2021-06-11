'use strict';
/*
let num = 266219;
num += '';

let prod = 1;

for (let i = 0; i < num.length; i++) {
  prod *= +num[i];
}
console.log(prod);

prod **= 3;

console.log(('' + prod).substr(0, 2));
*/

// lesson03-hard
/*
let lang = document.documentElement.lang;

let now = (new Date()).getDay();
console.log(now);

// a. через if
console.log('через if:');

if (lang == 'ru') {
  if (now == 0) console.log('Воскресенье');
  if (now == 1) console.log('Понедельник');
  if (now == 2) console.log('Вторник');
  if (now == 3) console.log('Среда');
  if (now == 4) console.log('Четверг');
  if (now == 5) console.log('Пятница');
  if (now == 6) console.log('Суббота');
} else if (lang == 'en') {
  if (now == 0) console.log('Sunday');
  if (now == 1) console.log('Monday');
  if (now == 2) console.log('Tuesday');
  if (now == 3) console.log('Wednesday');
  if (now == 4) console.log('Thursday');
  if (now == 5) console.log('Friday');
  if (now == 6) console.log('Saturday');
} else {
  console.log('Ду ю спик инглишь? Херштейн?');
}

// b. через switch-case
console.log('через switch-case:');

switch (lang) {
  case 'ru':
    switch (now) {
      case 0:
        console.log('Воскресенье');
        break;
      case 1:
        console.log('Понедельник');
        break;
      case 2:
        console.log('Вторник');
        break;
      case 3:
        console.log('Среда');
        break;
      case 4:
        console.log('Четверг');
        break;
      case 5:
        console.log('Пятница');
        break;
      case 6:
        console.log('Суббота');
        break;
    }
    break;
    case 'en':
      switch (now) {
        case 0:
          console.log('Sunday');
          break;
        case 1:
          console.log('Monday');
          break;
        case 2:
          console.log('Tuesday');
          break;
        case 3:
          console.log('Wednesday');
          break;
        case 4:
          console.log('Thursday');
          break;
        case 5:
          console.log('Friday');
          break;
        case 6:
          console.log('Saturday');
          break;
      }
      break;
      default:
        console.log('Ду ю спик инглишь? Херштейн?');
        break;
}

// c. через многомерный массив без ифов и switch
console.log('через многомерный массив без ифов и switch:');

const days = {'ru' : ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
              'en' : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']};

console.log(days[lang][now]);
*/

// lesson03-hard 2.
/*
let namePerson = prompt('Введите имя.');

console.log(namePerson === 'Артем' ? 'директор' : namePerson === 'Максим' ? 'преподаватель' : 'студент');
*/

// lesson04-hard

const returnInfo = (data)=> {
  if (typeof data === 'string') {
    data = data.trim();
    return data.length <= 30 ? data : data.substring(0, 30) + '...';
  } else {
    return 'Это не строка';
  }
};

console.log(returnInfo(5));
console.log(returnInfo('   это короткая строка      '));
console.log(returnInfo('      Это строка длинная оооооооооооочень        '));