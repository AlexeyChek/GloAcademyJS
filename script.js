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
    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddIncExp();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
    this.blockForm();
    this.setLocalStorage();
    this.setCookies(604800);
  }

  getAddIncExp(){    
    const addExpenses = additionalExpensesItem.value.split(',');

    const count = (item, elem) => {
      item = item.trim();
      if (item !== ''){
        elem.push(item);
      }
    };

    addExpenses.forEach(item => {
      count(item, this.addExpenses)
    });
    additionalIncome.forEach(item => {
      count(item.value, this.addIncome)
    });
  }

  addExpIncBlock(e){
    const target = e.target;
    const item = e.target.className.split(' ')[1].split('_')[0];
    
    const addElem = (elem) => {
      const clone = elem[0].cloneNode(true);
      const input = clone.querySelectorAll('input');
      input.forEach((el) => el.value = '');
      target.insertAdjacentElement('beforebegin', clone);
      elem = document.querySelectorAll(`.${item}-items`);
      return [elem, target];
    };

    const removeButton = (elem, target) => {
      // console.log(elem, target);
      if(elem.length >= 3) {
        target.style.display = 'none';
      }
    };

    if (item === 'income') {
      let temp = addElem(incomeItems);
      // console.log(temp);
      incomeItems = temp[0];
      removeButton(...temp);
    }
    if (item === 'expenses') {
      let temp = addElem(expensesItems);   
      // console.log(temp);
      expensesItems = temp[0];
      removeButton(...temp);
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
  
  getExpInc(){

    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== ''){
        this[startStr][itemTitle] = itemAmount;
      }
    };

    expensesItems.forEach(count);
    incomeItems.forEach(count);

    for (let key in this.income){
      this.incomeMonth += +this.income[key];
    }
  }

  selectRun(){
    periodSelect.addEventListener('input', ()=>{
      incomePeriodValue.value = this.calcPeriod();
    });
  }
  
  showResult(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    this.selectRun();
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
    
    expensesAdd.removeEventListener('click', this.addExpIncBlock);
    incomeAdd.removeEventListener('click', this.addExpIncBlock);
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

    depositBank.removeAttribute('disabled');

    depositCheck.checked = false;
    this.depositHandler();

  
    startButton.style.display = 'block';
    cancelButton.style.display = 'none';
    
    expensesAdd.addEventListener('click', this.addExpIncBlock);
    incomeAdd.addEventListener('click', this.addExpIncBlock);
  }
  
  resetForm(){
    this.unBlockForm();
    this.reset();
    this.resetExpensesBlock();
    this.resetIncomeBlock();
    localStorage.clear();
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
    expensesAdd.addEventListener('click', this.addExpIncBlock);
    incomeAdd.addEventListener('click', this.addExpIncBlock);
    periodSelect.addEventListener('input', function(){
      periodAmount.textContent = periodSelect.value;
    });

    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }

  setLocalStorage(){
    localStorage.budgetMonthValue = budgetMonthValue.value;
    localStorage.budgetDayValue = budgetDayValue.value;
    localStorage.expensesMonthValue = expensesMonthValue.value;
    localStorage.additionalIncomeValue = additionalIncomeValue.value;
    localStorage.additionalExpensesValue = additionalExpensesValue.value;
    localStorage.budgetMonth = this.budgetMonth;
    localStorage.targetMonthValue = targetMonthValue.value;
  }

  reloadCalc(){
    if (this.checkReload()) {
      budgetMonthValue.value = localStorage.budgetMonthValue;
      budgetDayValue.value = localStorage.budgetDayValue;
      expensesMonthValue.value = localStorage.expensesMonthValue;
      additionalIncomeValue.value = localStorage.additionalIncomeValue;
      additionalExpensesValue.value = localStorage.additionalExpensesValue;
      this.budgetMonth = localStorage.budgetMonth;
      incomePeriodValue.value = this.calcPeriod();
      this.selectRun();
      targetMonthValue.value = localStorage.targetMonthValue;
      this.blockForm();
    } else {
      localStorage.clear();
      this.setCookies(0);
    }
  }

  getLocalStorage(){
    let localStr = {};
    localStr.budgetMonthValue = localStorage.budgetMonthValue;
    localStr.budgetDayValue = localStorage.budgetDayValue;
    localStr.expensesMonthValue = localStorage.expensesMonthValue;
    localStr.additionalIncomeValue = localStorage.additionalIncomeValue;
    localStr.additionalExpensesValue = localStorage.additionalExpensesValue;
    localStr.budgetMonth = localStorage.budgetMonth;
    localStr.targetMonthValue = localStorage.targetMonthValue;
    return localStr;
  }

  setCookies(age){
    document.cookie = encodeURIComponent('budgetMonthValue') + '=' + encodeURIComponent(`${budgetMonthValue.value};max-age=${age}`);
    document.cookie = encodeURIComponent('budgetDayValue') + '=' + encodeURIComponent(`${budgetDayValue.value};max-age=${age}`);
    document.cookie = encodeURIComponent('expensesMonthValue') + '=' + encodeURIComponent(`${expensesMonthValue.value};max-age=${age}`);
    document.cookie = encodeURIComponent('additionalIncomeValue') + '=' + encodeURIComponent(`${additionalIncomeValue.value};max-age=${age}`);
    document.cookie = encodeURIComponent('additionalExpensesValue') + '=' + encodeURIComponent(`${additionalExpensesValue.value};max-age=${age}`);
    document.cookie = encodeURIComponent('budgetMonth') + '=' + encodeURIComponent(`${this.budgetMonth};max-age=${age}`);
    document.cookie = encodeURIComponent('targetMonthValue') + '=' + encodeURIComponent(`${targetMonthValue.value};max-age=${age}`);
    document.cookie = `isLoad=true;max-age=${age}`;
  }

  checkReload(){
    let cook = this.getCookies();
    let localStr = this.getLocalStorage();
    let result = true;
    let keys = ['budgetMonthValue', 'budgetDayValue', 'expensesMonthValue', 'additionalIncomeValue', 'additionalExpensesValue', 'budgetMonth', 'targetMonthValue'];
    keys.forEach(item => {
      if (cook[item] !== localStr[item]) result = false;
    });
    return result;
  }

  getCookies(){
    let cookies = decodeURIComponent(document.cookie).split('; ');
    let cook = {};
    for (let i = 0; i < cookies.length; i++) {
      let temp = cookies[i].split(';')[0].split('=');
      cook[temp[0]] = temp[1];
    }
    return cook;
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
appData.reloadCalc();