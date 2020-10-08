'use strict';
function returnStringLowerCamelCase(str) {
    return str.split(' ').map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }

        return (word[0].toUpperCase() + word.substring(1).toLowerCase());
        }).join('');
}

module.exports = returnStringLowerCamelCase;
