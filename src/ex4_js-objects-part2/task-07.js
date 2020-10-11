'use strict';
function compareStringLengthWithNumber(str, num) {
    if (str.length > num) {
        return str.replace(str.substring(num - 1), '…');
    }

    return str;
}

module.exports = compareStringLengthWithNumber;
