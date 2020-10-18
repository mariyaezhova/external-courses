'use strict';
function implementSliceMethod(arr, begin, end) {
    let arraySlice = [];
    let startLoop;
    let endLoop;

    if (begin >= 0) {
        startLoop = begin;
    } else if (begin !== undefined && arr.length + begin > 0) {
        startLoop = arr.length + begin;
    } else {
        startLoop = 0;
    }

    if (end >= 0 && arr.length > end) {
        endLoop = end;
    } else if (end < 0) {
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
