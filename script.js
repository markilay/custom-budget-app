const monthlyColumns = document.querySelector('.monthlyColumns');
const incomeMonthly = document.querySelector('.grid-header__one h3');
const incomeInput = document.querySelector('[name="income"]');
const incomeAmountNumber = document.querySelector('.income');
const columnAmount = monthlyColumns.querySelectorAll('.amount');
const moneyLeft = document.querySelector('.money-left');
const totalExpenses = document.querySelector('.total-expenses');
const shoppingList = document.querySelectorAll('.list');

const inputsOfPrizes = monthlyColumns.querySelectorAll("[name='sum']");
const inputsOfItems = document.querySelectorAll("input[data-item='item']")

// amount that I get every new month + the leftover from the previous month
let incomeAmount = 0;

// sum for each column
let sumOfEveryColumn = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0
};

// the list of item written down for each column
let itemsOfEveryColumn = {
    first: [],
    second: [],
    third: [],
    fourth: [],
    fifth: []
}

// add and show monthly income + the leftover from the previous month
function salaryAmount(e) {
    incomeAmount += parseFloat(e.currentTarget.value);
    if(!incomeAmount > 0) return ;
    incomeAmountNumber.textContent = incomeAmount.toFixed(2);
    e.currentTarget.value = "";
    localStorage.setItem('Income', JSON.stringify(incomeAmount))
    sumAllColumns(sumOfEveryColumn);
}

// get the sum that was written down in the column
function valueOfItemPrice(e){
    // find active the input by data-name
    const sameAttr = e.currentTarget.dataset.name;
    // get the value from this input
    const priceOfItem = parseFloat(e.currentTarget.value);
    // loop over each column and check if data-name for the active
    // input is the same as p for this column,
    // then display new amount in p and sum it all up
    columnAmount.forEach(p => {   
        if (p.getAttribute("data-name") === sameAttr)
        {   // we take data-name and use it as objetct[key] to find correct column
            sumOfEveryColumn[sameAttr] += priceOfItem;
            p.textContent = sumOfEveryColumn[sameAttr].toFixed(2);
        } 
    })
    e.target.value = "";
    addItemToList(priceOfItem, sameAttr);
    displayTheList(itemsOfEveryColumn);
    sumAllColumns(sumOfEveryColumn);
}

// loop over each column and take total amount , then sum them all up
function sumAllColumns (objectOfSum) {
    // make temporare arr and loop over all columns and push values to arr
    let arrOfSumAllColumns = [];
    // loop over each key of Object to get value
    for (const [key, value] of Object.entries(objectOfSum)) {
       arrOfSumAllColumns.push(value);
    }
    // take only last 5 added values from the arr and sum it all
    const sumOfAllColumns = arrOfSumAllColumns
        .splice(arrOfSumAllColumns.length - 5)
        .reduce((prev, cur) => {
            return prev + cur;
        })
    countMoneyLeft(moneyLeft, incomeAmount, sumOfAllColumns)
    // moneyLeft.textContent = (incomeAmount - sumOfAllColumns).toFixed(2);
    // totalExpenses.textContent = sumOfAllColumns.toFixed(2);
}

function countMoneyLeft(moneyAll, income, allExpences) {
    moneyAll.textContent = (income - allExpences).toFixed(2);
    totalExpenses.textContent = allExpences.toFixed(2);
}

// add items from input to the list for each column separately 
function addItemToList(inputValue, number) {
    for ([key, value] of Object.entries(itemsOfEveryColumn)) {
        if(key === number && inputValue > 0) {
            value.push(inputValue)
            addToLocalStorage(itemsOfEveryColumn)
        }
    }
}

// display the list all items for each column
function displayTheList(objectOfColumns) {
    for ([key, value] of Object.entries(objectOfColumns)) {
        if(value.length > 0) {
            const html = value.map((item, id)=>
            `
            <li class="item shopping-item">
                <span data-delete="${id}" data-value=${item} class='delete'>x</span>
                <span>${item}</span>
            </li>  
            `
            ).join('');
            shoppingList.forEach(list => {
                if(list.dataset.name === key) {
                    list.classList.add('open');
                    list.innerHTML = html;
                }
            })
        } else {
            shoppingList.forEach(list => {
                if(list.dataset.name === key) {
                    list.classList.remove('open');
                    list.innerHTML = ` `;
                }
            })
        }
    }
}

// click x to delete item from list and from Object Array
// Arguments: id - x[id] , list is current list of column , and then our Object
function deleteItem(deletedValue, id, list, objectOfColumns) {
    let newArr;
    for (let [key, value] of Object.entries(objectOfColumns)) {
        if(key === list.dataset.name) {
           newArr = value.filter((item, i) => i !== id);
           value = newArr;
        }
        objectOfColumns[key] = value;
    }
 
    updateAmount(list, deletedValue);
    displayTheList(itemsOfEveryColumn);
    addToLocalStorage(objectOfColumns);
}

// update all numbers after deleting items in columns
function updateAmount(numberOfList, deletedValue) {
    columnAmount.forEach(p => {   
        const columnNumber = numberOfList.dataset.name;
        if (p.dataset.name === columnNumber)
        {   // we take data-name and use it as objetct[key] to find correct column
            sumOfEveryColumn[columnNumber] -= deletedValue;
            p.textContent = sumOfEveryColumn[columnNumber].toFixed(2);
        } 
        sumAllColumns(sumOfEveryColumn);
    })
}

// set Local Storage
function addToLocalStorage(objectOfColumns) {
    for (let [key, value] of Object.entries(objectOfColumns)) {
        localStorage.setItem(`column - ${key}`, JSON.stringify(objectOfColumns[key]));
    }
}

function restoreFromLocalStorage(objectOfColumns) {
    //pull the items from local storage
    for (let [key, value] of Object.entries(objectOfColumns)) {
        if(key) {
            let listItems = JSON.parse(localStorage.getItem(`column - ${key}`)) || [];
            if (listItems.length > 0) {
                objectOfColumns[key].push(...listItems);
                displayTheList(itemsOfEveryColumn);
            }
        }
        columnAmount.forEach(p => {   
            if (p.dataset.name === key && value.length > 0) {   
                // we take data-name and use it as objetct[key] to find correct column
                const amountToDisplay = [];
                value.forEach(item => amountToDisplay.push(item));
                const x = amountToDisplay.reduce((prev, next) => prev + next)
                sumOfEveryColumn[key] += x;
                p.textContent = sumOfEveryColumn[key].toFixed(2);
            } 
        })
    }   
    let incomeStorage = JSON.parse(localStorage.getItem('Income')) || 0;
    incomeAmountNumber.textContent = incomeStorage;
    incomeAmount = incomeStorage;
    let arrOfSumAllColumns = [];
    // loop over each key of Object to get value
    for (const [key, value] of Object.entries(sumOfEveryColumn)) {
       arrOfSumAllColumns.push(value);
    }
    // take only last 5 added values from the arr and sum it all
    const sumOfAllColumns = arrOfSumAllColumns
        .splice(arrOfSumAllColumns.length - 5)
        .reduce((prev, cur) => {
            return prev + cur;
        })
    countMoneyLeft(moneyLeft, incomeAmount, sumOfAllColumns)
    //countMoneyLeft(moneyLeft, incomeAmount, sumOfAllColumns)
}

inputsOfPrizes.forEach(input => input.addEventListener('change', valueOfItemPrice));
incomeInput.addEventListener('change', salaryAmount);


shoppingList.forEach(list => {
    list.addEventListener('click', (e) => {
        const btn = parseInt(e.target.dataset.delete);
        const chosenValue = parseFloat(e.target.dataset.value);
        if(btn || btn === 0) {
            deleteItem(chosenValue, btn, list, itemsOfEveryColumn);
        }
    })
})


restoreFromLocalStorage(itemsOfEveryColumn);
displayTheList(itemsOfEveryColumn);

