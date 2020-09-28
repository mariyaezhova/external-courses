function findMaxValueOfArray(numbers) {
    if (numbers.length === 0) {
        return undefined;
    }

    let maxValue = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > maxValue) {
            maxValue = numbers[i];
        }
    }

    return maxValue;
}

module.exports = findMaxValueOfArray;
