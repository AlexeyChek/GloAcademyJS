'use strict';
let money = 1; // Доход за месяц
let income = 'фриланс'; // дополнительный доход
let addExpenses = 'интернет, такси, коммуналка'; // дополнительные расходы
let deposit = false;
let mission = 1000000; // нужно накопить
let period = 6; // количество месяцев

let budgetDay = money / 30;

// alert('любой текст');
// console.log('любой текст');

function showTypeOf(data) {
  console.log(typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
// console.log(addExpenses.length);
// console.log('Период равен ' + period + ' месяцев.');
// console.log('Цель заработать ' + mission + ' рублей.');
// console.log(addExpenses.toLowerCase().split(', '));
// console.log(budgetDay);

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function() {
  do {
    money = prompt('Ваш месячный доход?', 100000);
  } while (!isNumber(money));
};

start();

let expenses = [];
let amount = [];

let getExpensesMonth = function() {
  let sum = 0;
  let answer;

  for (let i = 0; i < 2; i++) {
    expenses[i]  = prompt('Введите обязательную статью расходов?', 'машина');
    answer = prompt('Во сколько это обойдется?', 25000)
    amount[i] = isNumber(answer) ? +answer : 0;
    sum += amount[i];
  }
  return sum;
};

// addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.', 'кино, вино, домино');
deposit = confirm('Есть ли у вас депозит в банке?');

// console.log('Бюджет на месяц: ', budgetMonth);
// console.log('Цель будет дотигнута за ', Math.ceil(mission / budgetMonth), ' месяцев.');

// console.log('Бюджет на день: ', Math.floor(budgetDay));

const getStatusIncome = ()=> {
  if (budgetDay > 1200) return 'У вас высокий уровень дохода.';
  if (budgetDay > 600) return 'У вас средний уровень дохода.';
  if (budgetDay >= 0) return 'К сожалению, у вас уровень дохода ниже среднего.';
  return 'Пора что-то менять в этой жизни!';
};

// const getExpensesMonth = ()=> {
//   return +amount1 + +amount2;
// };

const getAccumulatedMonth = function() {
  return money - getExpensesMonth();
};

let accumulatedMonth  = getAccumulatedMonth();

const getTargetMonth = ()=> {
  if (accumulatedMonth === 0) return 0;
  return Math.ceil(mission / accumulatedMonth);
  };

  budgetDay = accumulatedMonth / 30;

console.log('Расходы за месяц: ', accumulatedMonth);
console.log('Возможные расходы: ', expenses);
console.log(getTargetMonth() > 0 ? ('Цель будет дотигнута за ', getTargetMonth(), ' месяцев.') : 'Цель не будет достигнута. Увы и Ах.');
console.log('Бюджет на день: ', budgetDay >= 0 ? Math.floor(budgetDay) : 'а нет его, одни долги.');
console.log(getStatusIncome());