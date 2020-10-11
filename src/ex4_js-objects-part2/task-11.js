'use strict';
function countNumberOfEachSymbol(str) {
    let lettersObj = {};

    for (let i = 0; i < str.length; i++) {
        if (lettersObj[str[i]]) {
            lettersObj[str[i]]++;
        } else {
            lettersObj[str[i]] = 1;
        }
    }

    Object.keys(lettersObj).forEach((element) => console.log(`Character ${element} occurs in the string ${lettersObj[element]} times`)); 
}

module.exports = countNumberOfEachSymbol;
