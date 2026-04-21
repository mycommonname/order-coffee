let beverageCount = 1;

const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
const form = document.querySelector('form');
const addButton = document.querySelector('.add-button');

const dictionary = {
    "обычном молоке": "обычное",
    "обезжиренном молоке": "обезжиренное",
    "соевом молоке": "соевое",
    "кокосовом молоке": "кокосовое",
    "взбитых сливок": "взбитые сливки",
    "зефирок": "зефирки",
    "шоколад": "шоколад",
    "корицу": "корица"
};

function getBeveragePlural(n) {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) 
        return 'напитков';
    if (n1 > 1 && n1 < 5) 
        return 'напитка';
    if (n1 === 1) 
        return 'напиток';
    return 'напитков';
}

function refreshNumbers() {
    const forms = document.querySelectorAll('.beverage');
    beverageCount = forms.length;
    forms.forEach((form, index) => {
        form.querySelector('.beverage-count').textContent = `Напиток №${index + 1}`;
    });
}

function removeBeverage(e) {
    const forms = document.querySelectorAll('.beverage');
    if (forms.length > 1) {
        e.target.closest('.beverage').remove();
        refreshNumbers();
    }
}

addButton.addEventListener('click', () => {
    beverageCount++;
    const forms = document.querySelectorAll('.beverage');
    const lastForm = forms[forms.length - 1];
    
    const newForm = lastForm.cloneNode(true);
    newForm.querySelector('.beverage-count').textContent = `Напиток №${beverageCount}`;
    
    newForm.querySelectorAll('input').forEach(input => {
        if (input.type === 'radio') {
            input.name = `milk-${beverageCount}`;
        } else {
            input.checked = false;
        }
    });

    newForm.querySelector('.remove-button').onclick = (e) => removeBeverage(e);
    lastForm.after(newForm);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const beverages = document.querySelectorAll('.beverage');
    const count = beverages.length;
    
    document.getElementById('modal-message').textContent = `Вы заказали ${count} ${getBeveragePlural(count)}`;

    let tableHtml = `
        <table>
            <thead>
                <tr>
                    <th>Напиток</th>
                    <th>Молоко</th>
                    <th>Дополнительно</th>
                </tr>
            </thead>
            <tbody>`;

    beverages.forEach(beverage => {
        const type = beverage.querySelector('select option:checked').text;
        
        const milkRaw = beverage.querySelector('input[type="radio"]:checked + span').textContent.trim();
        const milk = dictionary[milkRaw] || milkRaw;
        
        const extras = Array.from(beverage.querySelectorAll('input[type="checkbox"]:checked'))
            .map(el => {
                const text = el.nextElementSibling.textContent.trim();
                return dictionary[text] || text;
            })
            .join(', ');

        tableHtml += `
            <tr>
                <td>${type}</td>
                <td>${milk}</td>
                <td>${extras}</td>
            </tr>`;
    });

    tableHtml += `</tbody></table>`;
    
    document.getElementById('modal-table-container').innerHTML = tableHtml;
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

document.querySelector('.remove-button').onclick = (e) => removeBeverage(e);
