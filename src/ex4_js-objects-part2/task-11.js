'use strict';
function countNumberOfEachSymbol(str) {
    let lettersObj = {};

    for (let i = 0; i < str.length; i++) {
        if (lettersObj[str[i]] === undefined) {
            lettersObj[str[i]] = 1;
        } else {
            lettersObj[str[i]]++;
        }
    }

    Object.keys(lettersObj).forEach((element) => console.log(`Character ${element} occurs in the string ${lettersObj[element]} times`));
        
}

module.exports = countNumberOfEachSymbol;
