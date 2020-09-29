'use strict';
function defineNumberOrString(argument) {
    const argType = typeof argument;

    if (!Number.isNaN(argument)) {
        if ((argType === 'number') || (argType === 'string')) {
            return argType;
        }
    }

    return undefined;
}

module.exports = defineNumberOrString;
