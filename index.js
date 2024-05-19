// Объявление переменных строковых констант
const LIMIT = 10000;
const CURRENCY = 'руб';
const STATUS_IN_LIMIT = 'Все хорошо';
const STATUS_OUT_OF_LIMIT = 'Все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';

// Объявление переменных ссыдок на html документ
const inputNode = document.querySelector('.js-expenses-input');
const buttonNode = document.querySelector('.js-expenses-button');
const historyNode =document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status')
const historyClear = document.querySelector('.js-btn-reset_expenses')

//Объявление основной переменной
//При запуске содержит пустой массив
//попоняем при помощи кажатия кнопки Добваить 
let expanses = [];

init(expanses);

buttonNode.addEventListener('click', function() {
    const expanse = getExpanseFromUser();                         //получаю расход от пользователя
    if(!expanse) {                                                //проверка на наличие расхода, если нет то ничего не делаем
    return;
}
    trackExpanse(expanse);                                        //трекаем его
    render(expanses);                                             //отрисовываем интерфейс
})

function init(expanses) {
    limitNode.innerText = LIMIT ;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpenses(expanses);
};

function trackExpanse(expanse) {                                 //2. Сохраняем трату в список
    expanses.push(expanse);
}

function getExpanseFromUser() {                                 //1. Получаем значение из поля ввода
    if (!inputNode.value ) {
     return null;                                               /* если строка пустая то верни, если нет то ниже код выполни  */ 
    }
    const expanse = parseInt(inputNode.value);
    clearInput();
    return expanse;
}

function clearInput() {
    inputNode.value = '';
}

function calculateExpenses(expanses) {                          //4. Посчитать сумму и вывести ее
    let sum = 0;

    expanses.forEach(element => {                               //создаем цикл, повторение нескольких действий
      sum += element;
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

    expanses.forEach(element => {                            //создаем цикл, повторение нескольких действий                                                   
    expansesListHTML += `<li>${element} ${CURRENCY}</li>`;  //элемент конкретный элемент массива
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
    statusNode.innerText = STATUS_OUT_OF_LIMIT;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);//добавляем элементу класс
    }
}

