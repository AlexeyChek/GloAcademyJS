'use strict';

const startButton = document.getElementById('start');
const cancelButton = document.getElementById('cancel');
const incomeAdd = document.querySelectorAll('button')[0];
const expensesAdd = document.querySelectorAll('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncome = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('input.income-title');
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

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};  

class AppData {
  constructor(){
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
  }

  reset(){
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
  }

  start(){
    this.getExpenses();
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
    this.blockForm();
  }

  getAddExpenses(){
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item)=>{
      item = item.trim();
      if (item !== ''){
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome(){
    additionalIncome.forEach((item)=>{
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  addExpensesBlock(){
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    const input = cloneExpensesItem.querySelectorAll('input');
    input.forEach((item) => {
      item.value = '';
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }
  }

  addIncomeBlock(){
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    const input = cloneIncomeItem.querySelectorAll('input');
    input.forEach((item) => {
      item.value = '';
    });
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
      incomeAdd.style.display = 'none';
    }
  }

  resetExpensesBlock(){
    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].remove();
    }
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesAdd.style.display = 'inline-block';
  }

  resetIncomeBlock(){
    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].remove();
    }
    incomeItems = document.querySelectorAll('.income-items');
    incomeAdd.style.display = 'inline-block';
  }
  
  getExpensesMonth(){
    // const _this = this;
    let sum = 0;
    for(let expense in this.expenses) {
      sum += +this.expenses[expense];
    }
    this.expensesMonth = sum;
  }
  
  getExpenses(){
    // const _this = this;
    expensesItems.forEach((item)=>{
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }
  
  getIncome(){
    // const _this = this;
    incomeItems.forEach((item)=>{
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        this.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income){
      this.incomeMonth += +this.income[key];
    }
  }
  
  showResult(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', ()=>{
      incomePeriodValue.value = this.calcPeriod();
    });
  }
  
  getBudget(){
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100 / 12);
    this.budgetMonth = this.budget - this.expensesMonth + this.incomeMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  
  getTargetMonth(){
    this.getBudget();
    // const _this = this;
    if (this.budgetMonth === 0) { return 0 ; }
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }
  
  getStatusIncome(){
    this.getBudget();
    // const _this = this;
    if (this.budgetDay > 1200) { return 'У вас высокий уровень дохода.';}
    if (this.budgetDay > 600) { return 'У вас средний уровень дохода.';}
    if (this.budgetDay >= 0) { return 'К сожалению, у вас уровень дохода ниже среднего.';}
    return 'Пора что-то менять в этой жизни!';
  }
  
  calcSavedMoney(){
    return this.budgetMonth * this.period;
  }
  
  calcPeriod(){
    return this.budgetMonth * periodSelect.value;
  }
  
  blockForm(){
    // const _this = this;
    const dataInputs = dataSection.querySelectorAll('[type="text"]');
    dataInputs.forEach(function(item){
      item.setAttribute('readOnly', true);
    });

    depositBank.setAttribute('disabled', true);
    
    startButton.style.display = 'none';
    cancelButton.style.display = 'block';
    
    expensesAdd.removeEventListener('click', this.addExpensesBlock);
    incomeAdd.removeEventListener('click', this.addIncomeBlock);
  }
  
  unBlockForm(){
    // const _this = this;
    const dataInputs = dataSection.querySelectorAll('[type="text"]');
    dataInputs.forEach(function(item){
      item.removeAttribute('readOnly');
      item.value = '';
    });
    
    const resultInputs = resultSection.querySelectorAll('[type="text"]');
    resultInputs.forEach(function(item){
      item.value = '';
    });
    
    periodSelect.value = 1;
    periodAmount.textContent = '1';
  
    startButton.style.display = 'block';
    cancelButton.style.display = 'none';
    
    expensesAdd.addEventListener('click', this.addExpensesBlock);
    incomeAdd.addEventListener('click', this.addIncomeBlock);
  }
  
  resetForm(){
    this.unBlockForm();
    this.reset();
    this.resetExpensesBlock();
    this.resetIncomeBlock();
  }
  
  getInfoDeposit(){
    if (this.deposit){
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    } else {
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
    }
  }

  changePercent(){
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.value = '';
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
      startButton.removeAttribute('disabled');
    }
  }

  percentValid(){
    let percent = depositPercent.value;
    console.log(percent);
    if(percent = '' || percent < 0 || percent > 100 || !isNumber(percent)) {
      startButton.setAttribute('disabled', true);
      alert('Введите корректное значение в поле проценты');
    } else {
      startButton.removeAttribute('disabled');
    }
  }

  depositHandler(){
    if(depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
      depositPercent.addEventListener('change', this.percentValid);
      startButton.setAttribute('disabled', true);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
      startButton.removeAttribute('disabled');
    }
  }
  
  addListeners(){
    salaryAmount.addEventListener('change', ()=>{
      if(salaryAmount.value !== '' && !this.getStarted) {
        startButton.addEventListener('click', this.start.bind(this));
        this.getStarted = true;
      } else if(salaryAmount.value === '' && this.getStarted) {
        startButton.removeEventListener('click', this.start);
        this.getStarted = false;
      }
    });
    
    cancelButton.addEventListener('click', this.resetForm.bind(this));    
    expensesAdd.addEventListener('click', this.addExpensesBlock);
    incomeAdd.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', function(){
      periodAmount.textContent = periodSelect.value;
    });

    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }
}

dataSection.addEventListener('keyup', (event) => {
  let target = event.target;
  if (target.matches('input[type="text"]')){
    let placeholder = target.getAttribute('placeholder').toLowerCase();
    if (placeholder === 'сумма' || placeholder === 'процент') {
      target.value = target.value.replace(/[^0-9]/g,'');
    } else {
      target.value = target.value.replace(/[^А-я\s?!,.]/g,'');
    }
  }
});

const appData = new AppData();
appData.addListeners();