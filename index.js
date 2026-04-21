let beverageCount = 1;

document.querySelector('.add-button').addEventListener('click', () => {
    beverageCount++;
    const form = document.querySelector('form');
    const buttonContainer = document.querySelector('.add-button').closest('div');
    
    const newFieldset = createBeverageFieldset(beverageCount);
    form.insertBefore(newFieldset, buttonContainer);
});

function createBeverageFieldset(number) {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'beverage';
    
    const h4 = document.createElement('h4');
    h4.className = 'beverage-count';
    h4.textContent = 'Напиток №' + number;
    
    const label = document.createElement('label');
    label.className = 'field';
    
    const spanLabel = document.createElement('span');
    spanLabel.className = 'label-text';
    spanLabel.textContent = 'Я буду';
    
    const select = document.createElement('select');
    
    const espressoOption = document.createElement('option');
    espressoOption.value = 'espresso';
    espressoOption.textContent = 'Эспрессо';
    
    const capuccinoOption = document.createElement('option');
    capuccinoOption.value = 'capuccino';
    capuccinoOption.textContent = 'Капучино';
    
    const cacaoOption = document.createElement('option');
    cacaoOption.value = 'cacao';
    cacaoOption.textContent = 'Какао';
    
    select.appendChild(espressoOption);
    select.appendChild(capuccinoOption);
    select.appendChild(cacaoOption);
    
    label.appendChild(spanLabel);
    label.appendChild(select);
    
    const milkField = document.createElement('div');
    milkField.className = 'field';
    
    const milkLabel = document.createElement('span');
    milkLabel.className = 'checkbox-label';
    milkLabel.textContent = 'Сделайте напиток на';
    
    milkField.appendChild(milkLabel);
    
    const milkTypes = [
        { value: 'usual', text: 'обычном молоке' },
        { value: 'no-fat', text: 'обезжиренном молоке' },
        { value: 'soy', text: 'соевом молоке' },
        { value: 'coconut', text: 'кокосовом молоке' }
    ];
    
    milkTypes.forEach((milk, index) => {
        const labelElem = document.createElement('label');
        labelElem.className = 'checkbox-field';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'milk-' + number;
        input.value = milk.value;
        if (index === 0) input.checked = true;
        
        const span = document.createElement('span');
        span.textContent = milk.text;
        
        labelElem.appendChild(input);
        labelElem.appendChild(span);
        milkField.appendChild(labelElem);
    });
    
    const optionsField = document.createElement('div');
    optionsField.className = 'field';
    
    const optionsLabel = document.createElement('span');
    optionsLabel.className = 'checkbox-label';
    optionsLabel.textContent = 'Добавьте к напитку:';
    
    optionsField.appendChild(optionsLabel);
    
    const options = [
        { value: 'whipped cream', text: 'взбитых сливок' },
        { value: 'marshmallow', text: 'зефирок' },
        { value: 'chocolate', text: 'шоколад' },
        { value: 'cinnamon', text: 'корицу' }
    ];
    
    options.forEach(option => {
        const labelElem = document.createElement('label');
        labelElem.className = 'checkbox-field';
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'options-' + number;
        input.value = option.value;
        
        const span = document.createElement('span');
        span.textContent = option.text;
        
        labelElem.appendChild(input);
        labelElem.appendChild(span);
        optionsField.appendChild(labelElem);
    });
    
    fieldset.appendChild(h4);
    fieldset.appendChild(label);
    fieldset.appendChild(milkField);
    fieldset.appendChild(optionsField);
    
    return fieldset;
}
