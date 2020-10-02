'use strict';
function setNewProperty (property, obj) {
    if (!obj.hasOwnProperty(property)) {
        // eslint-disable-next-line no-param-reassign
        obj[property] = 'new';
    }
    
    return obj;
}

module.exports = setNewProperty;
