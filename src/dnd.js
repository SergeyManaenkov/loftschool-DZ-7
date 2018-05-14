/* Вспомогательные функции */

import * as h from './helper';

/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector( '#homework-container' );

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const div = document.createElement( 'div' );

    div.id = h.guid();

    div.setAttribute( 'draggable', 'true' );

    div.classList.add( 'draggable' );
    div.classList.add( 'draggable-div' );
    // Позицию
    div.style.top = h.randomSizePX();
    div.style.left = h.randomSizePX();
    // Размер
    div.style.width = h.randomSizePX();
    div.style.height = h.randomSizePX();
    // Цвет
    div.style.backgroundColor = h.randomColor();

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
let divs = [];
let dragSrcEl = null;
addListeners();
function addListeners() {

    let homeworkContainer = document.querySelector('#homework-container');

    // начали перетаскивать
    homeworkContainer.addEventListener( 'dragstart', function handleDragStart(e) {
        dragSrcEl = e.target;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.outerHTML);
    } );
    // перетаскиваемый элемент на элементе назначения
    homeworkContainer.addEventListener( 'dragenter', function handleDragEnter( e ) {
        e.target.classList.add( 'over' );
    } );
    // происходит каждые несколько сотен милисекунд, над
    homeworkContainer.addEventListener( 'dragover', function handleDragOver( e ) {
        if ( e.preventDefault ) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';

        return false;
    } );

    // Курсор выходит за пределы элемента
    homeworkContainer.addEventListener( 'dragleave', function handleDragLeave( e ) {
        e.target.classList.remove( 'over' );
    } );

    // Когда пользователь отпустил мышь
    homeworkContainer.addEventListener( 'drop', function handleDrop(e) {

        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (dragSrcEl != this) {
            e.target.classList.remove('over');
            dragSrcEl.classList.remove('over');
            dragSrcEl.outerHTML = e.target.outerHTML;
            e.target.outerHTML = e.dataTransfer.getData('text/html');
        }

        return false;
    } );

}

let addDivButton = homeworkContainer.querySelector( '#addDiv' );

addDivButton.addEventListener( 'click', function () {
    // создать новый div
    const div = createDiv();

    divs.push(div);

    // добавить на страницу
    homeworkContainer.appendChild( div );
    // назначить обработчики событий мыши для реализации D&D
    // addListeners( div );
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
} );

export {
    createDiv
};
