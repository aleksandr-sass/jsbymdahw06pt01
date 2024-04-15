# Домашняя работа к шестому занятию
## Часть 1. Добавить элементы *input type="radio"* и *textarea* в форму заказа плитки

### Работа с *input type="radio"*
1. Всем input'ам задаем атрибут *name*
2. Вставляем элементы *input type="radio"* в html-код (в моей верстке они обёрнуты в *fieldset*)
3. JS: 
const  radio1 = document.querySelector('#default')
const  radio2 = document.querySelector('#self-delivery')
radio1.addEventListener("click", launcher);
radio2.addEventListener("click", launcher);

4. JS: перепишем функцию recalculateDataObject()
```
function  recalculateDataObject() {
  if (inputDataIsOK()) {
    data = {};
    let  formData = new  FormData(form);
    for (const  entry  of  formData)
      data[entry[0]] = entry[1];
    showDataObjectInConsole();
  } else {
    alert('Проверьте исходные данные: ширину и длину участка');
  }
}
```
5. Реализуем дополнительный функционал: скидка 10% при самовывозе:
```
function  launcher() {
...
if (radio2.checked == true) total = Math.round(total * 0.9); // скидка 10% при самовывозе
payment.value = total;
...
}
```
6. Теперь в консоль браузера будет появляться содержимое объекта data. Одним из его полей будет **delivery** . В зависимости от того: что выбрал пользователь (DPD до двери/Самовывоз), та информация и будет записана в поле **delivery** .

### Работа с *textarea*
1. HTML
```
<div class="form__element">                
  <label>                    
    Комментарий:<br><br>
    <textarea name="comment" id="comment" cols="50" rows="8" placeholder="Укажите Ваш комментарий к заказу"></textarea>
  </label>
</div>
```
2. всё готово: теперь formData "подхватывает" и содержимое элемента textarea. В объекте data появляется поле **comment**, которое будет содержать текст из *textarea*.
3. чтобы пользователь не смог растянуть (изменить размеры) *textarea*, пропишем следующий css-код:
```
textarea {
    resize: none;
}
```
