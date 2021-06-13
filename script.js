'use strict';

// урок 09 получение элементов
const startButton = document.getElementById('start');
const cancelButton = document.getElementById('cancel');
const incomeAdd = document.querySelectorAll('button')[0];
const expensesAdd = document.querySelectorAll('button')[1];
const depositChek = document.querySelector('#deposit-check');
const additionIncome = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('input.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('input.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const budgetMonthValue = document.querySelector('.budget_month-value');

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};  

let appData = {
  income : {}, // дополнительный доход
  addExpenses : ['интернет', 'такси', 'коммуналка'], // дополнительные расходы
  deposit : false,
  percentDeposit : 0,
  moneyDeposit : 0,
  mission : 150000, // нужно накопить
  period : 2, // количество месяцев
  expenses : {},
  budget : 0,
  budgetDay : 0,
  budgetMonth : 0,
  expensesMonth : 0,
  start : function() {
    if(salaryAmount.value === ''){
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    }
  // do {
  //     let money = prompt('Ваш месячный доход?', 100000);
  //   } while (!isNumber(money));

    appData.budget = salaryAmount.value;

    // appData.asking();
  },
  addExpensesBlock : function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }
  },
  getExpensesMonth : ()=> {
    let sum = 0;
    for(let expense in appData.expenses) {
      sum += appData.expenses[expense];
    }
    appData.expensesMonth = sum;
  },
  getExpenses : function() {
    
  },
  getBudget : ()=> {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },  
  getTargetMonth : ()=> {
    appData.getBudget();
    if (appData.budgetMonth === 0) { return 0 ; }
    return Math.ceil(appData.budget / appData.budgetMonth);
  },  
  getStatusIncome : ()=> {
    appData.getBudget();
    if (appData.budgetDay > 1200) { return 'У вас высокий уровень дохода.';}
    if (appData.budgetDay > 600) { return 'У вас средний уровень дохода.';}
    if (appData.budgetDay >= 0) { return 'К сожалению, у вас уровень дохода ниже среднего.';}
    return 'Пора что-то менять в этой жизни!';
  },
  asking: function() {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'фриланс');
      } while(isNumber(itemIncome));
      let cashIncome;
      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      } while(!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    appData.budget = money;
    let addExpenses = prompt('Перечислите возможные расходы через запятую', 'кино, вино,домино,    падшие женщины    ');
    appData.addExpenses = addExpenses.split(',');
    for(let expense in appData.addExpenses) {
      appData.addExpenses[expense] = appData.addExpenses[expense].trim();
      appData.addExpenses[expense] = appData.addExpenses[expense][0].toUpperCase() + appData.addExpenses[expense].slice(1).toLowerCase();
    }
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
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
  },
  getInfoDeposit: function(){
    if (appData.deposit){
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      } while(!isNumber(appData.percentDeposit));
      do {
      appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while(!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
  },
};

startButton.addEventListener('click', appData.start);
expensesAdd.addEventListener('click', appData.addExpensesBlock);

// console.log('Расходы за месяц: ', appData.expensesMonth);
// console.log(appData.getTargetMonth() > 0 ? ('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев.') : 'Цель не будет достигнута. Увы и Ах.');
// console.log(appData.getStatusIncome());
// console.log('Наша программа включает в себя данные:');
// for(let value in appData) {
//   if (typeof appData[value] === 'function') { continue;}
//   console.log(value, ": ", appData[value]);
// }
// console.log('Возможные расходы: ' + appData.addExpenses.join(', '));