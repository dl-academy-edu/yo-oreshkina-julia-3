"Use strict";
/* task 4 - проверки на тип прописаны внутри заданий */
/* task 1 */

let userNumber = prompt("Введите число", "");

if(!Number(userNumber)) {
    console.log("Ошибка!");
}
for (let i = 1; i <= Number(userNumber); i++) {
    if(i % 4 === 0) continue;
    console.log(i); 
}

/* task 2 */

let number = prompt("Введите число", "");

if (Number(number)) {
    let num = +number;

    if(!Number.isInteger(num) || num < 0) { // невозможно вычислить факториал дробного или отрицательного числа
        console.log("Ошибка!");
    } else if(num === 0 || num === 1) { // 0! = 0 1! = 1
        console.log(1);
    } else {
        let result = num;

        while(num > 1) {
            result = result * (num - 1);
            num--;
        }
        
        console.log(result);
    }
} else {
    console.log("Ошибка!");
}

/* task 3 */

let baseNumber = prompt("Введите число", "");
let degree = prompt("Введите степень числа", "");


if(Number(baseNumber) && Number(degree) && Number(baseNumber) !== 0) {  //  Number(x) !== 0 -  0 не принято возводить в степень
    let base = +baseNumber;
    let exponent = +degree;

    if(exponent === 0) {
        console.log(1);
    } else if (exponent > 0) {
        let resultWithPositiveExp = base;

        for(let i = 1; i < exponent; i++) {
            resultWithPositiveExp *= base;
        }

        console.log(resultWithPositiveExp);
    } else {
        let resultWithNegativeExp = 1 / base;

        for(let i = -1; i > exponent; i--) {
            resultWithNegativeExp = resultWithNegativeExp * (1 / base);
        }
        console.log(resultWithNegativeExp);
    }
} else {
    console.log("Ошибка!");
}

/* task 5 */

let random = Math.floor(1 + Math.random() * 10);
let guess= +prompt("Угадайте число");

while (true) {
    if (random === guess) {
        console.log(`Победа! ${random} - правильный ответ!`);
        break;
    } 
    
    guess = +prompt("Угадайте число");    
}






