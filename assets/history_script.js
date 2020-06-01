const months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

let savedMonth = [];
const saveButton = document.querySelector('button')
const history = document.querySelector('.history')
const modalOuter = document.querySelector('.modal-outer')
const modalInner = document.querySelector('.modal-inner')
const validationModal = document.querySelector('.validation')
const validationModalInner = document.querySelector('.validation-inner')

const now = new Date();
const monthIndex = now.getMonth() -1;
const month = months[monthIndex];
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
    history.innerHTML = savedMonth.map(generateMonthsHTML).join("")
    localStorage.clear()
    localStorage.setItem('history', JSON.stringify(savedMonth));
}

function getTotal(columnName) {
    const arr = JSON.parse(localStorage.getItem(`column - ${columnName}`))
    return arr.reduce((prev, next) => (prev + next.price), 0).toFixed(2)
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
    history.classList.add('visibility')
}

function closeModalWindow(e) {
    if (e.currentTarget === e.target) {
        history.classList.remove('visibility')
        modalInner.classList.remove('open')
        modalOuter.classList.remove('open')
    }
}

function closeValidationWindow(e) {
    if (e.currentTarget === e.target) {
        history.classList.remove('visibility')
        validationModal.classList.remove('open')
    }
}

function restoreFromLocalStorage() {
    savedMonth = JSON.parse(localStorage.getItem('history')) || []
    history.innerHTML = savedMonth.map(generateMonthsHTML).join("")
}

function validation(){
    const warningText = validationModalInner.querySelector('.validation-inner_warning p')
    const confirm = validationModalInner.querySelector('.validation-inner_confirm')
    const yesBtn = validationModalInner.querySelector('.yesBtn')
    const noBtn = validationModalInner.querySelector('.noBtn')

    warningText.textContent = `Are you ready to save month ${month} ${year} ?   All data will be reset after you confirm`
    validationModal.classList.add('open')
    history.classList.add('visibility')
    yesBtn.addEventListener('click', ()=> {
        validationModalInner.querySelector('.validation-inner_warning').classList.add('close')
        addMonth()
        confirm.classList.add('open')
        setTimeout(function() {
            validationModal.classList.remove('open')
            history.classList.remove('visibility')
            confirm.classList.remove('open')
        }, 2000)
    })
    noBtn.addEventListener('click', closeValidationWindow)
}


saveButton.addEventListener('click', ()=> {
    (savedMonth.length === 0) || (savedMonth[savedMonth.length -1].month !== month) ? validation() : alert('Oops this month has already been saved')
})

history.addEventListener('click', function (e) {
    savedMonth.forEach((month, id) => id == +e.target.id ? showMonthAnalysis(month) : console.log('wrong month'))
})

modalOuter.addEventListener('click', closeModalWindow)
validationModal.addEventListener('click', closeValidationWindow)

restoreFromLocalStorage()