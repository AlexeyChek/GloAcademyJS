var money = 100000; // Доход за месяц
var income = 'фриланс'; // дополнительный доход
var addExpenses = 'интернет, такси, коммуналка'; // дополнительные расходы
var deposit = false;
var mission = 1000000; // нужно накопить
var period = 6; // количество месяцев

var budgetDay = money / 30;

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