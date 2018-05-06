/* ДЗ 3 - работа с исключениями и отладчиком */

function isArray(array) {

    if (!Array.isArray(array) || !array.length) {
        throw new Error('empty array');
    }

}

function isFunction(fn) {

    if (typeof fn != 'function') {
        throw new Error('fn is not a function');
    }

}

/*
 Задание 1:

 1.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива

 1.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isAllTrue([1, 2, 3, 4, 5], n => n < 10) // вернет true
   isAllTrue([100, 2, 3, 4, 5], n => n < 10) // вернет false
 */
function isAllTrue(array, fn) {

    isArray(array);
    isFunction(fn);

    let rez = true;

    for (const val of array) {
        if (fn(val) === true) {

        } else {
            rez = false;
        }
    }

    return rez;
}

/*
 Задание 2:

 2.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива

 2.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isSomeTrue([1, 2, 30, 4, 5], n => n > 20) // вернет true
   isSomeTrue([1, 2, 3, 4, 5], n => n > 20) // вернет false
 */
function isSomeTrue(array, fn) {

    isArray(array);
    isFunction(fn);

    for (const val of array) {
        if (fn(val) === true) {
            return true;
        }
    }

    return false;

}

/*
 Задание 3:

 3.1: Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запустить fn для каждого переданного аргумента (кроме самой fn)

 3.2: Функция должна вернуть массив аргументов, для которых fn выбросила исключение

 3.3: Необходимо выбрасывать исключение в случаях:
   - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn, ...args) {

    isFunction(fn);

    let argErors = [];

    for (const item of args) {
        try {
            fn(item);
        } catch (e) {
            argErors.push(item);
        }
    }

    return argErors;
}

/*
 Задание 4:

 4.1: Функция имеет параметр number (по умолчанию - 0)

 4.2: Функция должна вернуть объект, у которого должно быть несколько методов:
   - sum - складывает number с переданными аргументами
   - dif - вычитает из number переданные аргументы
   - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
   - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно

 4.3: Необходимо выбрасывать исключение в случаях:
   - number не является числом (с текстом "number is not a number")
   - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {

    if (!Number.isInteger(number)) {
        throw new Error('number is not a number');
    }

    return {
        sum: (...args) => {
            let rez = number;

            for (const val of args) {
                rez += val;
            }

            return rez;
        },
        dif: (...args) => {
            let rez = number;

            for (const val of args) {
                rez -= val;
            }

            return rez;
        },
        div: function (...args) {
            let rez = number;

            if (args.indexOf(0) != -1) {
                throw new Error('division by 0');
            }
            for (const val of args) {
                rez /= val;
            }

            return rez;
        },
        mul: (...args) => {
            let rez = number;

            for (const val of args) {
                rez *= val;
            }

            return rez;
        }
    }
}

/* При решении задач, пострайтесь использовать отладчик */

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
