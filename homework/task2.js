"Use strict";
/* task 4 - проверки на тип написаны внутри функций */
/* task 1 */

let userNumber = +prompt("Введите число");

function outputNumbers (num) {
    if (isNaN(num)) {
        return "Ошибка!";
    }

    for (let i = 1; i <= num; i++) {
        if(i % 4 === 0) { 
            continue;
        }

    console.log(i); 
    } 
}

console.log(outputNumbers(userNumber));

/* task 2 */

function factorial(num) {
    if(!Number.isInteger(num) || num < 0){
        return 'Ошибка!';
    }

    if(num === 0 || num === 1) {
        return 1;
    }

    let result = num;
    
    while(num > 1) {
        
        result = result * (num - 1);
        num--;
    }

    return result;
}

console.log(factorial(userNumber));

/* task 3 */

let number = +prompt("Введите число");
let degreeOfNumber = +prompt("Введите степень числа");

function pow(x, n) {
    if(isNaN(x) || isNaN(n) || x === 0){
        return 'Ошибка!';
    }

    let resultWithPositiveExp = x;
    let resultWithNegativeExp = 1 / x;

    if(n === 0) {
        return 1;
    } else if (n > 0) {
        for(let i = 1; i < n; i++) {
            resultWithPositiveExp *= x;
        }
        return resultWithPositiveExp;
    } else {
        for(let i = -1; i > n; i--) {
            resultWithNegativeExp = resultWithNegativeExp * (1 / x);
        }
        return resultWithNegativeExp;
    }

} 

console.log(pow(number, degreeOfNumber));

/* task 5 */

function guessNumber() {
    let random = Math.floor(1 + Math.random() * 10);
    let number = +prompt("Угадайте число");

    while (random !== number) {
        number = +prompt("Угадайте число");
    }

    if (random === number) {
        return `Победа! ${random} - правильный ответ!`;
    }
}

console.log(guessNumber());
    
