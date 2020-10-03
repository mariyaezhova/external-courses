'use strict';
function isProperty (property, obj) {
    if (obj.hasOwnProperty(property)) {
        return true
    }
    
    return false;
}

module.exports = isProperty;
