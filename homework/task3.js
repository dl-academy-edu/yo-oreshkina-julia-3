"Use strict";

/* task 1 */

function askUserAge() {
    let age = +prompt("Сколько вам лет?", 0);

    if (Number(age) && age >= 18) {
        return "отлично!"; 
    }

    return askUserAge(); 
}

console.log(askUserAge());

/* task 2 */

/* Во всех функциях ниже, если параметр будет не числом, результатом функций будет undefined */

function add(a, b) {  //  ф-ция не содержит HTTP-методов, ничего не выводит на экран, не влияет на другие функции (работа приложения)
    if(typeof a === 'number' && typeof b === 'number') {
        return a + b;
    } //  a,b - локальные переменные, глобальные переменные отсутсвуют и не читаются данной функцией;
}

add(5, 8);  //  ф-ция выводит одинаковый результат, опираясь исключительно на свои входные данные (аргументы a, b), т.е складывая 5 и 8, мы всегда получим 13

function subtract(a, b) {  //  ф-ция не содержит HTTP-методов, ничего не выводит на экран, не влияет на другие функции (работа приложения)
    if(typeof a === 'number' && typeof b === 'number') {
        return a - b;    //  a,b - локальные переменные, глобальные переменные отсутсвуют и не читаются данной функцией;
    }
}

subtract(8, 5);  //  ф-ция выводит одинаковый результат, опираясь исключительно на свои входные данные (аргументы a, b), т.е. вычитая 5 из 8, мы всегда получим 3

function divide(a, b) {  //  ф-ция не содержит HTTP-методов, ничего не выводит на экран, не влияет на другие функции (работа приложения)
    if(typeof a === 'number' && typeof b === 'number') {
        return a / b;
    }    //  a,b - локальные переменные, глобальные переменные отсутсвуют и не читаются данной функцией;
}

console.log(divide(27, 9));  //  ф-ция выводит одинаковый результат, опираясь исключительно на свои входные данные (аргументы a, b), т.е. при делении 27 на 9, мы всегда получим 3

function multiply(a, b) {  //  ф-ция не содержит HTTP-методов, ничего не выводит на экран, не влияет на другие функции (работа приложения)
    if(typeof a === 'number' && typeof b === 'number') {
        return a * b;    //  a,b - локальные переменные, глобальные переменные отсутсвуют и не читаются данной функцией;
    }
}

multiply(5, 3);  //  ф-ция выводит одинаковый результат, опираясь исключительно на свои входные данные (аргументы a, b), т.е. умножая 5 на 3, мы всегда получим 15

/* task 3 */

function addCreator(a) {
    return function addCreator(b) {
        if(typeof a === "number" && typeof b === "number") {
            return a + b;
        }
    };
}

const addNum = addCreator(5);

console.log(addNum(5)); // 10
console.log(addCreator(1)(3)); // 4
console.log(addCreator(4)(8)); // 12
console.log(addCreator("YPS")(8)); // undefined

/* task 4 */

function counterCreater(step = 2) {
    let index = 0; 

    return  function() {
        return index += step;
    };
}

let myCounter1 = counterCreater(-1);
console.log(myCounter1()); // -1
console.log(myCounter1()); // -2

let myCounter2 = counterCreater(4);
console.log(myCounter2()); // 4
console.log(myCounter2()); // 8

let myCounter3 = counterCreater();
console.log(myCounter3()); // 2
console.log(myCounter3()); // 4





