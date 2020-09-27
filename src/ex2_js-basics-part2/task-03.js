'use strict';
function countEvenAndOddElements(numbers) {
    let evenCounter = 0;
    let oddCounter = 0;
    let zeroCounter = 0;
    for (let i = 0; i < numbers.length; i++) {
        if ((typeof numbers[i] !== 'number') || isNaN(numbers[i])) {
            continue;
        }
        if (numbers[i] === 0) {
            zeroCounter++;
        } else if (numbers[i] % 2 === 0) {
            evenCounter++;
        } else {
            oddCounter++;
        }
    }
    return [evenCounter, oddCounter, zeroCounter];
}
module.exports = countEvenAndOddElements;