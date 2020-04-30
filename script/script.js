// 

const generateId = () => `${Math.round(Math.random() * 1e8).toString(16)}`;
const totalBalance = document.querySelector('.total__balance'),
    totalMoneyIncome = document.querySelector('.total__money-income'),
    totalMoneyExpenses = document.querySelector('.total__money-expenses'),
    historyList = document.querySelector('.history__list'),
    form = document.getElementById('form'),
    operationName = document.querySelector('.operation__name'),
    operationAmount = document.querySelector('.operation__amount');

let dbOperation = JSON.parse(localStorage.getItem('calc')) || [];


const renderOperation = (operation) => {
    // оператор сравнивает значение 
    const className = operation.amount < 0 ? 'history__item-minus' : 'history__item-plus';
    // создаем элемент li
    const listItem = document.createElement('li');
    // добавляем ему класс
    listItem.classList.add('history__item');
    listItem.classList.add(className);
    // вставляем в верстку
    listItem.innerHTML = `${operation.description}
        <span class="history__money">${operation.amount}</span>
        <button class="history_delete" data-id='${operation.id}'>x</button>
    `;

    historyList.append(listItem);
};

const updateBalance = () => {
    //из списка берем положитедбные числа и складываем
    const resultIncome = dbOperation
        .filter((item) => item.amount > 0)
        .reduce((result, item) => result + item.amount, 0);
    console.log(resultIncome);
    // берем отрицательные числа и складываем
    const resultExpenses = dbOperation
        .filter((item) => item.amount < 0)
        .reduce((result, item) => result + item.amount, 0);
    console.log(resultExpenses);
    // выводим результаты в верстку
    totalMoneyIncome.textContent = resultIncome + ' ₽';
    totalMoneyExpenses.textContent = resultExpenses + ' ₽';
    totalBalance.textContent = (resultIncome + resultExpenses) + ' ₽';
};

const addOperation = (event) => {
    // запрещает браузеру стандартное поведение, чтобы он не перезагружался
    event.preventDefault();

    const operationNameValue = operationName.value,
        operationAmountValue = operationAmount.value;
    // проверяем вводимое значение на пустую строку и задаем границы формы по дефолту
    operationName.style.borderColor = '';
    operationAmount.style.borderColor = '';

    if(operationNameValue && operationAmountValue) {
        const operation = {
            id: generateId(),
            description: operationNameValue,
            amount: +operationAmountValue,
        };
        dbOperation.push(operation);
        init();
    } else {
        if(!operationNameValue) operationName.style.borderColor = 'red';
        if(!operationAmountValue) operationAmount.style.borderColor = 'red';
    }
    // после ввода отчищаем поля
    operationName.value = '';
    operationAmount.value = '';
};

const deleteOperation = (event) => {
    const target = event.target;
    if(target.classList.contains('history_delete')) {
        dbOperation = dbOperation
            .filter(operation => operation.id !== target.dataset.id);
        init();
    }
};

const init = () => {
    // при включении очищаем список истории
    historyList.textContent = ``;
    // 
    dbOperation.forEach(renderOperation);
    updateBalance();
    localStorage.setItem('calc', JSON.stringify(dbOperation))
};

form.addEventListener('submit', addOperation);

historyList.addEventListener('click', deleteOperation);

init();