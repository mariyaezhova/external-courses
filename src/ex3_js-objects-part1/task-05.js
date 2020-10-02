'use strict';
function clone(obj) {
    const cloneObject = Object.assign({}, obj);
    return cloneObject;
}

module.exports = clone;
