'use strict';
function findPropertyInPrototype(property, obj) {
    if (!obj.hasOwnProperty(property)) {
        return obj[property];
    }

    return undefined;

}

module.exports = findPropertyInPrototype;
