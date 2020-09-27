function maxValueOfArray(numbers) {
    if (numbers.length === 0) {
        return undefined;
    }

    let maxValue = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > maxValue) {
            maxValue = numbers[i];
        }
    }

    return maxValue;
}

maxValueOfArray([23, 34, 23, 65, 89, 65]); // 89
maxValueOfArray([3, 1, 5, 5, -89, 3]); // 5
maxValueOfArray([0]); // 0
maxValueOfArray([]); // undefined
module.exports = maxValueOfArray;
