const htmlElement = document.htmlElement
const bodyElement = document.body //только для body
const titleElement = bodyElement.children[0].children[0]

//children - дочерние элементы обьекта
//childNodes - все дочерние текстовые узлы и узлы-элементы
titleElement.innerHTML = "DOM2"
bodyElement.childNodes[0].data = 'hello'
//nextSibling - переход к следующему узлу
//previousSibling - переход к предыдущему узлу
//parentElement - переход к родительскому элементу
//previousElementSibling - предыдущий элемент
//nextElementSibling - следующий элемент
//lastElementChild - последний вложенный элемент
//firstElementChild - первый вложенный элемент
const liJs = bodyElement.children[0].children[2].lastElementChild

liJs.style.color = "red"
//получение списка в DOM-дереве
const liElements = bodyElement.children[0].children[2].children

//преобразование псевдомассива в массив

// const liElems = document.querySelectorAll('li')
// liElems.forEach((el)=> {
//     console.log('привет');
// })
let a = 5
for (const el of liElements) {
        el.style.fontSize = "28px"
        if (el.innerHTML === `Html`) {
            //innerHtml - изменяет внутреннюю разметку
            //outerHtml - изменяет сам элемент с разметкой
            //innerText - изменяет только текст внутри элемента
            el.style.fontStyle = 'italic'
            el.outerHTML = `HTML ${a} <li>Я заголовок 2 уровня </li>`
    }
}
//*************************** */
const form = document.querySelector('.form')

const widthArea = document.querySelector('#widthArea')
const lengthArea = document.querySelector('#lengthArea')
const squareArea = document.querySelector('#squareArea')
const formBtn = document.querySelector('.form__btn')
const colorPlate = document.querySelector('#color') 
const payment = document.querySelector('#payment')
const countInput = document.querySelector('#count')
const discount = document.querySelector('#discount')
const inputs = document.querySelectorAll('[id]')

const radio1 = document.querySelector('#default')
const radio2 = document.querySelector('#self-delivery')
// console.log(inputs);

let data = {};
// el[el.id] = el.value

// liJs.innerHTML =  `${widthArea.value * lengthArea.value}` 

formBtn.addEventListener("click", launcher);
discount.addEventListener("click", launcher);
radio1.addEventListener("click", launcher);
radio2.addEventListener("click", launcher);

function calcSquareArea() {
     squareArea.value = widthArea.value * lengthArea.value
     return squareArea.value
}
function numberOfPlates() {
    return Math.ceil(calcSquareArea() * 50);
}

function launcher() {
    let squareArea = calcSquareArea()
    let total = 0;
    if (colorPlate.value !== 'grey') {
        total =  squareArea * 50
    } else {
        total =  squareArea * 40
    }
    checkBoxValueHandler();
    if (discount.checked == true) total = Math.round(total * 0.95);
    if (radio2.checked == true) total = Math.round(total * 0.9); // скидка 10% при самовывозе
    payment.value = total;
    countInput.value = numberOfPlates();
    recalculateDataObject();
}

function recalculateDataObject() {
    if (inputDataIsOK()) {
        data = {};
        let formData = new FormData(form);
        for (const entry of formData)
            data[entry[0]] = entry[1];
        showDataObjectInConsole();
    } else {
        alert('Проверьте исходные данные: ширину и длину участка');
    }
}

function showDataObjectInConsole() {
    for (const key in data) {
        console.log(`${key} : ${data[key]}`);
    }
    console.log('\n\n\n\n\n\n\n\n\n');
}

function inputDataIsOK() {
    let a = widthArea.value;
    let b = lengthArea.value;

    let c = !Number.isNaN(+a);
    let d = !Number.isNaN(+b);
    let e = (((+a) * (+b)) > 0);
    if (c && d && e) {
        return true;
    } else {
        return false;
    }
}

function checkBoxValueHandler() {
    if (discount.checked == true) {
        discount.value = true;
    } else {
        discount.value = false;
    }
}


//FormData

let ff = () => {
    let f = new FormData(form);
    for (const entry of f) {
        console.log(entry);
    }
}
//FormData

// Решение ДЗ
// Часть 1. Подсчёт количества плиток
// согласно
// https://mogilev.belplitka.by/trotuarnaya-plitka-kirpichik
// Размеры (длина х ширина) одной плитки кирпичик составяют: 200х100 мм.
// В одном метре квадратном помещается 0 плиток.
// Таким образом, умножив площадь участка на 50, и
// (на всякий случай) округлив результат умножения до целого числа в большую
// Math.ceil() сторону, мы получим требуемый результат 

// Часть 2. <input type="checkbox">
// При нажатии на него сумма к оплате должна уменьшиться на 5%
// Решение:
// 1. Добавляем чек-бокс на страницу:
/* <div class="form__element">                
    <label>
        <input type="checkbox" id="discount">
            Хочу скидку 5%
    </label>
</div> */
// 2. то, что выполнялось при нажатии на кнопку "Рассчитать" упаковываем в функцию launcher()
// 3. добавляем в функцию launcher() обработку нажатия на чек-бокс со скидкой:
// if (discount.checked == true) total = Math.round(total * 0.95);
// 4. "Вешаем" функцию launcher() на событие "click" для formBtn и discount:
// formBtn.addEventListener("click", launcher);
// discount.addEventListener("click", launcher);


/* Часть 3. Создание объекта на основе данных формы
0) Добавим форме, содержащей все нужные input'ы, атрибут class="form"

I) Объявим в начале кода переменные/константы:
let data = {}; // пустой объект
const form = document.querySelector('.form') // указатель на форму
 
II) Объявим несколько функций (в конце кода):
* recalculateDataObject() - считает данные формы и  заполнит поля объекта data
* showDataObjectInConsole() - "красиво" отобразит объект data в консоль
* inputDataIsOK() - проверит длину и ширину участка на корректность; 
* checkBoxValueHandler() - меняет value у checkbox'а с "on" (по умолчанию) на true (при discount.checked == true) или false (при discount.checked == false). Это нужно для упрощения обработки данных формы, т.к. в противном случае придётся отдельно обрабатывать поле cheched у checkbox'а с id="discount".

III) Добавим в функцию launcher() вызовы функций checkBoxValueHandler() и recalculateDataObject()

*/