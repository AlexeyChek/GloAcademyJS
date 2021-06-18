


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
