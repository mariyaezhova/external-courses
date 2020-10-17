'use strict';
function implementReduceMethod(array, callback, initialValue) {
    let accumulator;
    let result;
    let iterator;

    if (array.length === 0 && !initialValue) {
        return 'TypeError: implementReduceMethod called on null or undefined'
    }

    if (
        (array.length === 0 && initialValue) ||
        (array.length === 1 && !initialValue)
    ) {
        result = initialValue || array[0];

        return result;
    } 
    
    if (initialValue) {
        accumulator = initialValue;
        iterator = 0;        
    } else {
        accumulator = array[0];
        iterator = 1;
    }

    for (let i = iterator; i < array.length; i++) {
        result = callback(accumulator, array[i], i, array);
        accumulator = result;
    }

    return result;
}

module.exports = implementReduceMethod;
