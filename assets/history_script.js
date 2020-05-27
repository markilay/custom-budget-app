const months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

const savedMonth = [];
const saveButton = document.querySelector('button')
const history = document.querySelector('.history')


function addMonth() {
    const now = new Date();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    savedMonth.push(`${month} ${year}`)
    history.innerHTML = savedMonth.map(generateMonthsHTML).join("")

}

function generateMonthsHTML(name) {
    return `<li>${name}</li>`
}

saveButton.addEventListener('click', addMonth)