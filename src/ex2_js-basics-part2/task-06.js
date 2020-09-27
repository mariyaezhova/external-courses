function isPrime(number) {
    if ((number <= 1) || (number > 1000)) {
        return 'Данные неверны';
    }

    for (let i = 2; i ** 2 <= number; i++ ) {
        if (number % i === 0) {
            return `Число ${number} - составное число`;
        }
    }

    return `Число ${number} - простое число`;
}

isPrime(15); // Число 88 - составное число
isPrime(631); // Число 631 - простое число
isPrime(2); // Число 2 - простое число
isPrime(-5); // Данные неверны
isPrime(1010); // Данные неверны
module.exports = isPrime;
