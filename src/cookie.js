/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

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
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector( '#filter-name-input' );
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector( '#add-name-input' );
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector( '#add-value-input' );
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector( '#add-button' );
// таблица со списком cookie
const listTable = homeworkContainer.querySelector( '#list-table tbody' );

const getFilterCookie = () => {
    if ( document.cookie == '' ) {
        return [];
    }
    let cookies = document.cookie.split( '; ' ).reduce( ( prev, current ) => {
        const [name, value] = current.split( '=' );
        const obj = {
            name: name,
            value: value
        };

        prev.push( obj );

        return prev;
    }, [] );

    if ( filterNameInput.value ) {
        const reg = new RegExp( filterNameInput.value, 'i' );

        cookies = cookies.filter( ( c ) => {
            return reg.test( c.name ) || reg.test( c.value );
        } );
    }

    return cookies;
};

filterNameInput.addEventListener( 'keyup', function ( e ) {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    renderTable();
} );

addButton.addEventListener( 'click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    document.cookie = `${addNameInput.value}=${addValueInput.value};`;

    renderTable();

    // addNameInput.value = '';
    // addValueInput.value = '';
} );

const renderTable = ( cookies = getFilterCookie() ) => {
    listTable.innerHTML = '';

    for ( const cookie of cookies ) {
        addTr( cookie.name, cookie.value );
    }
};

renderTable();

// Обработчик удаления cookie
listTable.addEventListener( 'click', ( e ) => {
    document.cookie = `${e.target.getAttribute( 'value' )}=; expires=${new Date().toUTCString()}`;
    renderTable();
} );

function addTr( name, val ) {
    const fDoc = document.createDocumentFragment();

    const tr = document.createElement( 'tr' );
    const tdName = document.createElement( 'td' );
    const tdVal = document.createElement( 'td' );
    const tdBtn = document.createElement( 'td' );
    const btn = document.createElement( 'button' );

    btn.setAttribute( 'type', 'button' );
    btn.setAttribute( 'value', name );

    fDoc.appendChild( tr );
    tr.appendChild( tdName );
    tr.appendChild( tdVal );
    tr.appendChild( tdBtn );
    tdBtn.appendChild( btn );

    btn.textContent = 'Удалить';
    tdName.textContent = name;
    tdVal.textContent = val;

    listTable.appendChild( fDoc );
}