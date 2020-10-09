'use strict';
function findPropertyInPrototype(property, obj) {
    for (let key in obj) {
        if (!obj.hasOwnProperty(property)) {
            return obj[property];
        }
    }

    return undefined;
}

module.exports = findPropertyInPrototype;
