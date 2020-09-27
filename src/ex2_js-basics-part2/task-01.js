'use strict';
function defineNumberOrString(argument) {
    if ((typeof argument === 'object') || isNaN(argument)) {
        return undefined;
    }
    return typeof argument;
}
module.exports = defineNumberOrString;