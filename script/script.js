
const totalBalance = document.querySelector('.total__balance'),
    totalMoneyIncome = document.querySelector('.total__money-income'),
    totalMoneyExpenses = document.querySelector('.total__money-expenses'),
    historyList = document.querySelector('.history__list'),
    form = document.getElementById('#form'),
    operationName = document.querySelector('.operation__name'),
    operationAmount = document.querySelector('.operation__amount');

let dbOperation = [
    {
        id: '1',
        description: 'Получил зарплату!',
        amount: 30000,
    },
    {
        id: '2',
        description: 'Квартплата!',
        amount: -10000,
    },
    {
        id: '3',
        description: 'Премия!',
        amount: 6000,
    },
    {
        id: '4',
        description: 'Заказ одежды!',
        amount: -2000,
    },
    {
        id: '5',
        description: 'Купил книги!',
        amount: -500,
    },
];