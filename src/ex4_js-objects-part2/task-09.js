'use strict';
function insertSubstringToStringAfterWordNumber(str, substr, indexInsert) {
    const strBeforeIndexInsert = str.split(' ').slice(0, indexInsert + 1).join(' ');
    const strAfterIndexInsert = str.split(' ').slice(indexInsert + 1).join(' ');
    
    return strBeforeIndexInsert + ' ' + substr + ' ' + strAfterIndexInsert;
}

module.exports = insertSubstringToStringAfterWordNumber;
