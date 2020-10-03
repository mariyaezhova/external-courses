'use strict'
function deepClone(obj) {
    let cloneObject;
    if (Array.isArray(obj)) {
        cloneObject = [];
    } else {
        cloneObject = {};
    }

    for (let key in obj) {
        if ((typeof obj[key] === 'object') && (obj[key] !== null)) {
            cloneObject[key] = deepClone(obj[key]);
        } else {
            cloneObject[key] = obj[key];
        }
    }

    return cloneObject;
}

module.exports = deepClone;
