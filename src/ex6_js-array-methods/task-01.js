'use strict';
function implementSliceMethod(arr, begin, end) {
    let arraySlice = [];
    let startLoop, endLoop;

    if (begin >= 0) {
        startLoop = begin;
    } else if (begin !== undefined) {
        startLoop = arr.length + begin;
    } else startLoop = 0;

    if (end >= 0) {
        endLoop = end;
    } else if (end !== undefined) {
        endLoop = arr.length + end;
    } else {
        endLoop = arr.length;
    }

    for (let i = startLoop; i < endLoop; i++) {
        arraySlice.push(arr[i]);
    }

    return arraySlice;
}

module.exports = implementSliceMethod;
