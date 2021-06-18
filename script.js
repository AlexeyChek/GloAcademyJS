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

const AppData = function() {
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
  this.getStarted = false;
};

AppData.prototype.reset = function(){
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
};

AppData.prototype.start = function() {
  this.getExpenses();
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
  this.blockForm();
};

AppData.prototype.getAddExpenses = function(){
  let addExpenses = additionalExpensesItem.value.split(',');
  const _this = this;
  addExpenses.forEach(function(item){
    item = item.trim();
    if (item !== ''){
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function(){
  const _this = this;
  additionalIncome.forEach(function(item){
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.addExpensesBlock = function() {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
  expensesItems = document.querySelectorAll('.expenses-items');
  if(expensesItems.length === 3) {
    expensesAdd.style.display = 'none';
  }
};

AppData.prototype.addIncomeBlock = function() {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
  incomeItems = document.querySelectorAll('.income-items');
  if(incomeItems.length === 3) {
    incomeAdd.style.display = 'none';
  }
};

AppData.prototype.resetExpensesBlock = function(){
  for (let i = 1; i < expensesItems.length; i++) {
    expensesItems[i].remove();
  }
  expensesItems = document.querySelectorAll('.expenses-items');
  expensesAdd.style.display = 'inline-block';
};

AppData.prototype.resetIncomeBlock = function(){
  for (let i = 1; i < incomeItems.length; i++) {
    incomeItems[i].remove();
  }
  incomeItems = document.querySelectorAll('.income-items');
  incomeAdd.style.display = 'inline-block';
};

AppData.prototype.getExpensesMonth = function(){
  let sum = 0;
  const _this = this;
  for(let expense in _this.expenses) {
    sum += +_this.expenses[expense];
  }
  this.expensesMonth = sum;
};

AppData.prototype.getExpenses = function() {
  const _this = this;
  expensesItems.forEach(function(item){
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== ''){
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};

AppData.prototype.getIncome = function(){
  const _this = this;
  incomeItem.forEach(function(item){
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if(itemIncome !== '' && cashIncome !== ''){
      _this.income[itemIncome] = cashIncome;
    }
    for (let key in _this.income){
      _this.incomeMonth += +_this.income[key];
    }
  });
};

AppData.prototype.showResult = function(){
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcPeriod();
  const _this = this;
  periodSelect.addEventListener('input', ()=>{
    incomePeriodValue.value = _this.calcPeriod();
  });
};

AppData.prototype.getBudget = function(){
  this.budgetMonth = this.budget - this.expensesMonth + this.incomeMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function(){
  this.getBudget();
  const _this = this;
  if (_this.budgetMonth === 0) { return 0 ; }
  return Math.ceil(targetAmount.value / _this.budgetMonth);
};

AppData.prototype.getStatusIncome = function(){
  this.getBudget();
  const _this = this;
  if (_this.budgetDay > 1200) { return 'У вас высокий уровень дохода.';}
  if (_this.budgetDay > 600) { return 'У вас средний уровень дохода.';}
  if (_this.budgetDay >= 0) { return 'К сожалению, у вас уровень дохода ниже среднего.';}
  return 'Пора что-то менять в этой жизни!';
};

AppData.prototype.getInfoDeposit = function(){
  const _this = this;
  if (_this.deposit){
    do {
      _this.percentDeposit = prompt('Какой годовой процент?', 10);
    } while(!isNumber(_this.percentDeposit));
    do {
    _this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    } while(!isNumber(_this.moneyDeposit));
  }
};

AppData.prototype.calcSavedMoney = function(){
  return this.budgetMonth * this.period;
};

AppData.prototype.calcPeriod = function(){
  return this.budgetMonth * periodSelect.value;
};


AppData.prototype.blockForm = function(){
  const _this = this;
  let dataInputs = dataSection.querySelectorAll('[type="text"]');
  dataInputs.forEach(function(item){
    item.setAttribute('readOnly', true);
  });

  startButton.style.display = 'none';
  cancelButton.style.display = 'block';

  expensesAdd.removeEventListener('click', _this.addExpensesBlock);
  incomeAdd.removeEventListener('click', _this.addIncomeBlock);
};

AppData.prototype.unBlockForm = function(){
  const _this = this;
  let dataInputs = dataSection.querySelectorAll('[type="text"]');
  dataInputs.forEach(function(item){
    item.removeAttribute('readOnly');
    item.value = '';
  });

  let resultInputs = resultSection.querySelectorAll('[type="text"]');
  resultInputs.forEach(function(item){
    item.value = '';
  });

  periodSelect.value = 1;
  periodAmount.textContent = '1';

  startButton.style.display = 'block';
  cancelButton.style.display = 'none';

  expensesAdd.addEventListener('click', _this.addExpensesBlock);
  incomeAdd.addEventListener('click', _this.addIncomeBlock);
};

AppData.prototype.resetForm = function(){
  this.unBlockForm();
  this.reset();
  this.resetExpensesBlock();
  this.resetIncomeBlock();
};

AppData.prototype.addListeners = function(){
  const _this = this;
  salaryAmount.addEventListener('change', ()=>{
    if(salaryAmount.value !== '' && !_this.getStarted) {
      startButton.addEventListener('click', _this.start.bind(_this));
      _this.getStarted = true;
    } else if(salaryAmount.value === '' && _this.getStarted) {
      startButton.removeEventListener('click', _this.start);
      _this.getStarted = false;
    }
  });
  
  cancelButton.addEventListener('click', _this.resetForm.bind(_this));
  
  expensesAdd.addEventListener('click', _this.addExpensesBlock);
  incomeAdd.addEventListener('click', _this.addIncomeBlock);
  periodSelect.addEventListener('input', function(){
    periodAmount.textContent = periodSelect.value;
  });
};

const appData = new AppData();
appData.addListeners();






