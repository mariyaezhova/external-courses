'use strict';
function returnStringWithUpperCaseForEachWord(str) {
    return str.split(' ').map((word) => word.replace(word[0], word[0].toUpperCase())).join(' ');

}

module.exports = returnStringWithUpperCaseForEachWord;
