const months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

let savedMonth = [];
const saveButton = document.querySelector('button')
const history = document.querySelector('.history')
const modalOuter = document.querySelector('.modal-outer')
const modalInner = document.querySelector('.modal-inner')


function addMonth() {
    const now = new Date();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    if (savedMonth.length === 0 || !(savedMonth[month - 1] == savedMonth[month])) {
        let item = {
            month,
            year,
            income: 5000,
            total: 4500,
        }
        savedMonth.push(item)
        localStorage.setItem('history', JSON.stringify(savedMonth))
        history.innerHTML = savedMonth.map(generateMonthsHTML).join("")
    }

}

function generateMonthsHTML({
    month,
    year
}, id) {
    return `<li id="${id}">${month} ${year}</li>`
}

function showMonthAnalysis(item) {
    modalInner.innerHTML = `
    <h3>${item["month"]} ${item["year"]}</h>
    <p>Income for this Month: ${item.income}</p>
    <p>Spent Total: ${item.total}</p>
    `
    modalOuter.classList.add('open')
    modalInner.classList.add('open')
}


function restoreFromLocalStorage() {
    savedMonth = JSON.parse(localStorage.getItem('history')) || []
    history.innerHTML = savedMonth.map(generateMonthsHTML).join("")

}

function closeModalWindow(e) {
    if (e.currentTarget === e.target) {
        modalInner.classList.remove('open')
        modalOuter.classList.remove('open')
    }
}

saveButton.addEventListener('click', addMonth);
history.addEventListener('click', function (e) {
    savedMonth.forEach((month, id) => id == +e.target.id ? showMonthAnalysis(month) : console.log('wrong month'))
})

modalOuter.addEventListener('click', closeModalWindow)


restoreFromLocalStorage()