// Объявление переменных строковых констант
let LIMIT = 10000;
const CURRENCY = 'руб';
const STATUS_IN_LIMIT = 'Все хорошо';
const STATUS_OUT_OF_LIMIT = 'Все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';

// Объявление переменных ссыдок на html документ
const inputNode = document.querySelector('.js-expenses-input');
const buttonNode = document.querySelector('.js-expenses-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const historyClear = document.querySelector('.js-btn-reset_expenses');
const categorySelect = document.querySelector('.category-list');
const buttonLimit = document.querySelector('.js-btn-limit');
const limitInput = document.querySelector('.js-input-limit');


//Объявление основной переменной
//При запуске содержит пустой массив
//попоняем при помощи кажатия кнопки Добваить 
let expanses = [];

init(expanses);

buttonNode.addEventListener('click', function() {
    const expanse = getExpanseFromUser(); 
    const category = getCategoryFromUser();                      //получаю расход от пользователя
    if(!expanse || !category) {                                              //проверка на наличие расхода, если нет то ничего не делаем
    return;
}
    trackExpanse(expanse, category);                                        //трекаем затраты и категрию
    render(expanses);                                             //отрисовываем интерфейс
})

buttonLimit.addEventListener('click', function () {
    let newLimit = getLimitFromUser();
    if (newLimit !== null) {
        LIMIT = newLimit;
        limitNode.innerHTML = LIMIT;
        render(expanses);
        togglePopup();
        localStorage.setItem('limit', newLimit)
    }
})

function init(expanses) {
    limitNode.innerText = LIMIT ;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpenses(expanses);
};

function trackExpanse(expanse, category) {                                 //2. Сохраняем трату в список
    expanses.push({amount: expanse, category:category});
}

function getExpanseFromUser() {                                 //1. Получаем значение из поля ввода
    if (!inputNode.value ) {
        alert('Не заданна сумма')
     return null;                                               /* если строка пустая то верни, если нет то ниже код выполни  */ 
    }
    const expanse = parseInt(inputNode.value);
    clearInput();
    return expanse;
}
function getCategoryFromUser() {
        if (categorySelect.value === "Категория") {
            alert('Не заданна категория')
        return null;
    }
    const category = categorySelect.value;
    clearCategory();
    return category;
    
}

function clearCategory() {
    categorySelect.value = '';
}

function clearInput() {
    inputNode.value = '';
}

function calculateExpenses(expanses) {                          //4. Посчитать сумму и вывести ее
    let sum = 0;

    expanses.forEach(expanse => {                               //создаем цикл, повторение нескольких действий
      sum += expanse.amount;
    });
    return sum;
}

function render(expanses) {
    const sum = calculateExpenses(expanses);

    renderHistory(expanses);                                   //отобразить затраты
    renderSum(sum);                                             //отобразить сумму
    renderStatus(sum);                                          //отобразить статус  
}


function renderHistory(expanses) {                            // 3. Выведем новый список трат
    let expansesListHTML = '';                               /*создаем переменную в которую будет собираться список*/

    expanses.forEach(expanse => {                            //создаем цикл, повторение нескольких действий                                                   
    expansesListHTML += `<li>${expanse.amount} ${CURRENCY} - ${expanse.category} </li>`;  //элемент конкретный элемент массива
});
    historyNode.innerHTML = `<ol>${expansesListHTML}</ol>`;  /*внутрь элемента задаем html*/
   
}; 

historyClear.addEventListener('click', function() {
    expanses = [];
    render(expanses);
});
    

function renderSum(sum) {
    sumNode.innerText = sum;
}

function renderStatus(sum) {                                // 5. Сравнение с лимитом и вывод статуса
    if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
    } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT-sum} р.)`;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME); //добавляем элементу класс
    }
}

function getLimitFromUser() {
    if (!limitInput.value){
        alert('Не задан лимит')
    return null;
}
    const newLimit = parseInt(limitInput.value);
    clearLimit()
    return newLimit;
};

function clearLimit () {
    limitInput.value = '';
}


    
