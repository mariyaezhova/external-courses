'use strict';
function setNewProperty (property, obj) {
    const modifyObj = obj;

    if (!obj.hasOwnProperty(property)) {
        modifyObj[property] = 'new';
    }
    
    return modifyObj;
}

module.exports = setNewProperty;
