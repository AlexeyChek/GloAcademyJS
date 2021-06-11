'use strict';
let money = 100000; // Доход за месяц
let income = 'фриланс'; // дополнительный доход
let addExpenses = 'интернет, такси, коммуналка'; // дополнительные расходы
let deposit = false;
let mission = 1000000; // нужно накопить
let period = 6; // количество месяцев

let budgetDay = money / 30;

// alert('любой текст');
// console.log('любой текст');

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев.');
console.log('Цель заработать ' + mission + ' рублей.');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');

let budgetMonth = money - amount1 - amount2;

console.log('Бюджет на месяц: ', budgetMonth);
console.log('Цель будет дотигнута за ', Math.ceil(mission / budgetMonth), ' месяцев.');

budgetDay = budgetMonth / 30;

console.log('Бюджет на день: ', Math.floor(budgetDay));

if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода.');
} else if (budgetDay > 600) {
  console.log('У вас средний уровень дохода.');
} else if (budgetDay >= 0) {
  console.log('К сожалению, у вас уровень дохода ниже среднего.');
} else {
  console.log('Пора что-то менять в этой жизни!');
}