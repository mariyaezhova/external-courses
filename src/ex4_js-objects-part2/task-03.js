'use strict';
function deleteFirstAndLastGaps(str) {
    if ((str[0] === ' ') && (str[str.length - 1] === ' ')) {
        return str.slice(1, (str.length - 1));
    }

    return str;
}

module.exports = deleteFirstAndLastGaps;
