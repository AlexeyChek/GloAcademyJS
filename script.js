'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};  

let money = 100000; // Доход за месяц

let start = function() {
  do {
    money = prompt('Ваш месячный доход?', 100000);
  } while (!isNumber(money));
};

start();

let appData = {
  income : {}, // дополнительный доход
  addExpenses : ['интернет', 'такси', 'коммуналка'], // дополнительные расходы
  deposit : false,
  depositPercent: 0,
  depositSum: 0,
  mission : 150000, // нужно накопить
  period : 2, // количество месяцев
  expenses : {},
  budget : 0,
  budgetDay : 0,
  budgetMonth : 0,
  expensesMonth : 0,
  getExpensesMonth : ()=> {
    let sum = 0;
    for(let expense in appData.expenses) {
      sum += appData.expenses[expense];
    }
    appData.expensesMonth = sum;
  },  
  getBudget : ()=> {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },  
  getTargetMonth : ()=> {
    appData.getBudget();
    if (appData.budgetMonth === 0) return 0;
    return Math.ceil(appData.budget / appData.budgetMonth);
  },  
  getStatusIncome : ()=> {
    appData.getBudget();
    if (appData.budgetDay > 1200) return 'У вас высокий уровень дохода.';
    if (appData.budgetDay > 600) return 'У вас средний уровень дохода.';
    if (appData.budgetDay >= 0) return 'К сожалению, у вас уровень дохода ниже среднего.';
    return 'Пора что-то менять в этой жизни!';
  },
  asking: function() {
    appData.budget = money;
    let addExpenses = prompt('Перечислите возможные расходы через запятую', 'кино, вино,домино,    падшие женщины    ');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    for(let expense in appData.addExpenses) {
      appData.addExpenses[expense] = appData.addExpenses[expense].trim();
    }
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    if (appData.deposit) {
      let answer;
      do {
        answer = prompt('Какой процент по депозиту?', 4);
      } while(isNumber(answer));
      appData.depositPercent = +answer;
      do {
        answer = prompt('Сумма депозита?', 5000);
      } while(isNumber(answer));
      appData.depositSum = +answer;
    }

    for (let i = 0; i < 2; i++) {
      let answer1;
      do {
        answer1 = prompt('Введите обязательную статью расходов?', 'машина');
      } while(isNumber(answer1));
      let answer2;
      do {
        answer2 = prompt('Во сколько это обойдется?', 25000);
      } while(!isNumber(answer2));
      appData.expenses[answer1] = +answer2;
    }
    appData.getExpensesMonth();
    appData.getTargetMonth();
    appData.getBudget();
  }
};

appData.asking();

console.log('Расходы за месяц: ', appData.expensesMonth);
console.log(appData.getTargetMonth() > 0 ? ('Цель будет дотигнута за ' + appData.getTargetMonth() + ' месяцев.') : 'Цель не будет достигнута. Увы и Ах.');
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные:');
for(let value in appData) {
  if (typeof appData[value] === 'function') continue;
  console.log(value, ": ", appData[value]);
}