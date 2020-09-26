function sameElementsOfArray(numbers) {
    if (numbers.length < 2) {
        return false;
    }
    numbers.sort((a, b) => a - b);
    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] === numbers[i + 1]) {
            return true;
        }
    }
    return false;
}
sameElementsOfArray([23, 34, 23, 65, 89, 65]); // true
sameElementsOfArray([0, 3, 6, 8, 23, 90, -5]); // false
sameElementsOfArray([3, 1, 5, 5, 89, 3]); // true
sameElementsOfArray([0]); // false
sameElementsOfArray([]); // false
module.exports = sameElementsOfArray;