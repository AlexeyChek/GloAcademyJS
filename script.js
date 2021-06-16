'use strict';

// урок 09 получение элементов
const startButton = document.getElementById('start');
const cancelButton = document.getElementById('cancel');
const incomeAdd = document.querySelectorAll('button')[0];
const expensesAdd = document.querySelectorAll('button')[1];
const depositChek = document.querySelector('#deposit-check');
const additionalIncome = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('input.income-title');
// const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('input.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const budgetMonthValue = document.querySelector('.budget_month-value');
let incomeItem = document.querySelectorAll('.income-items');

let dataSection = document.querySelector('.data');
let resultSection = document.querySelector('.result');

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};  

let appData = {
  income: {}, // дополнительный доход
  addIncome: [],
  incomeMonth: 0,
  addExpenses: [], // дополнительные расходы
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  expenses: {},
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  reset: function(){
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.expenses = {};
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  },
  start: function() {
    this.getExpenses();
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    
    this.showResult();
    
    blockForm();
  },
  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function(){
    additionalIncome.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }
  },
  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
      incomeAdd.style.display = 'none';
    }
  },
  resetExpensesBlock: function(){
    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].remove();
    }
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesAdd.style.display = 'inline-block';
  },
  resetIncomeBlock: function(){
    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].remove();
    }
    incomeItems = document.querySelectorAll('.income-items');
    incomeAdd.style.display = 'inline-block';

  },
  getExpensesMonth: ()=> {
    let sum = 0;
    for(let expense in appData.expenses) {
      sum += +appData.expenses[expense];
    }
    appData.expensesMonth = sum;
  },
  getExpenses: function() {
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function(){
    incomeItem.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome;
      }

    for (let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }

    });
  },
  showResult: function(){
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();

    periodSelect.addEventListener('input', ()=>{
      incomePeriodValue.value = appData.calcPeriod();
    });

  },
  getBudget: ()=> {
    appData.budgetMonth = appData.budget - appData.expensesMonth + appData.incomeMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },  
  getTargetMonth: ()=> {
    appData.getBudget();
    if (appData.budgetMonth === 0) { return 0 ; }
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },  
  getStatusIncome: ()=> {
    appData.getBudget();
    if (appData.budgetDay > 1200) { return 'У вас высокий уровень дохода.';}
    if (appData.budgetDay > 600) { return 'У вас средний уровень дохода.';}
    if (appData.budgetDay >= 0) { return 'К сожалению, у вас уровень дохода ниже среднего.';}
    return 'Пора что-то менять в этой жизни!';
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
  calcPeriod: function(){
    return appData.budgetMonth * periodSelect.value;
  },
};

const blockForm = function() {
  let dataInputs = dataSection.querySelectorAll('[type="text"]');
  dataInputs.forEach(function(item){
    item.setAttribute('readOnly', true);
  });

  startButton.style.display = 'none';
  cancelButton.style.display = 'block';

  expensesAdd.removeEventListener('click', appData.addExpensesBlock);
  incomeAdd.removeEventListener('click', appData.addIncomeBlock);
};

const unBlockForm = function() {
  let dataInputs = dataSection.querySelectorAll('[type="text"]');
  dataInputs.forEach(function(item){
    item.removeAttribute('readOnly');
    item.value = '';
  });

  resultSection
  let resultInputs = resultSection.querySelectorAll('[type="text"]');
  resultInputs.forEach(function(item){
    item.value = '';
  });



  periodSelect.value = 1;
  periodAmount.textContent = '1';

  startButton.style.display = 'block';
  cancelButton.style.display = 'none';

  expensesAdd.addEventListener('click', appData.addExpensesBlock);
  incomeAdd.addEventListener('click', appData.addIncomeBlock);
};


const reset = function(){
  unBlockForm();
  appData.reset();
  appData.resetExpensesBlock();
  appData.resetIncomeBlock();

};

let getStarted = false;

salaryAmount.addEventListener('change', ()=>{
  if(salaryAmount.value !== '' && !getStarted) {
    startButton.addEventListener('click', appData.start.bind(appData));
    getStarted = true;
  } else if(salaryAmount.value === '' && getStarted) {
    startButton.removeEventListener('click', appData.start);
    getStarted = false;
  }
});

cancelButton.addEventListener('click', reset);

expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function(){
  periodAmount.textContent = periodSelect.value;
});
