const months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

let savedMonth = [];
const saveButton = document.querySelector('button')
const history = document.querySelector('.history')
const modalOuter = document.querySelector('.modal-outer')
const modalInner = document.querySelector('.modal-inner')

const now = new Date();
const month = months[now.getMonth()];
const year = now.getFullYear();

function addMonth() {
    let item = {
        month,
        year,
        income: JSON.parse(localStorage.getItem('Income')),
        total: JSON.parse(localStorage.getItem('Total')),
        food: getTotal('food'),
        coffeeAndOut: getTotal('coffee_and_out'),
        other: getTotal('other'),
        shopping: getTotal('shopping'),
        travel: getTotal('travel'),
        balance: JSON.parse(localStorage.getItem('Balance'))
    } 
    savedMonth.push(item)
    localStorage.setItem('history', JSON.stringify(savedMonth))
    history.innerHTML = savedMonth.map(generateMonthsHTML).join("")
}

function getTotal(columnName) {
    const arr = JSON.parse(localStorage.getItem(`column - ${columnName}`))
    return arr.reduce((prev, next) => (prev + next.price), 0)
}

function generateMonthsHTML({
    month,
    year
}, id) {
    return `<li id="${id}">${month} ${year}</li>`
}

function showMonthAnalysis(item) {
    modalInner.innerHTML = `
    <div>
        <h3>${item["month"]} ${item["year"]}</h3>
        <p>Income for ${item["month"]} ${item["year"]}: ${item.income} pln</p>
        <p>Spent Total: ${item.total} pln</p>
    </div>
    <div>
    <p>Food: ${item.food} pln</p>
    <p>Coffe and Out: ${item.coffeeAndOut} pln</p>
    <p>Other: ${item.other} pln</p>
    <p>Shopping: ${item.shopping} pln</p>
    <p>Travel: ${item.travel} pln</p>
    </div>
    <p>Balance: ${item.balance} pln</p>
    `
    modalOuter.classList.add('open')
    modalInner.classList.add('open')
}

function closeModalWindow(e) {
    if (e.currentTarget === e.target) {
        modalInner.classList.remove('open')
        modalOuter.classList.remove('open')
    }
}


function restoreFromLocalStorage() {
    savedMonth = JSON.parse(localStorage.getItem('history')) || []
    history.innerHTML = savedMonth.map(generateMonthsHTML).join("")
}

function validation(){
    if (savedMonth.length === 0 || !(savedMonth[month - 1] == savedMonth[month])) {
        const question = prompt(`Are you ready to close month ${month} ${year}?`)
        if(question === 'yes'){
            alert(`The current month has been stored and added to the history. Your budget will be reset`)
            addMonth()
        } else {
            'do not hurry up'
        }
    } else {
        alert('Upps this month has already been saved')
    }
}


saveButton.addEventListener('click', validation)

history.addEventListener('click', function (e) {
    savedMonth.forEach((month, id) => id == +e.target.id ? showMonthAnalysis(month) : console.log('wrong month'))
})

modalOuter.addEventListener('click', closeModalWindow)


restoreFromLocalStorage()