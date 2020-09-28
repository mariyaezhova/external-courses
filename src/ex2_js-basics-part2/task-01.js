'use strict';
function defineNumberOrString(argument) {
    if (!Number.isNaN(argument)) {
        if ((typeof argument === 'number') || (typeof argument === 'string')) {
            return typeof argument;
        }
    }

    return undefined;
}

module.exports = defineNumberOrString;
