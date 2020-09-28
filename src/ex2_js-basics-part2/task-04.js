function isIdenticalElementsOfArray(numbers) {
    if (numbers.length < 2) {
        return false;
    }

    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] !== numbers[i + 1]) {
            return false;
        }
    }

    return true;
}

module.exports = isIdenticalElementsOfArray;
