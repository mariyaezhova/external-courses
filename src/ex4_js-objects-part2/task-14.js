'use strict';
function returnRandomNumberBetweenMinAndMax(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

module.exports = returnRandomNumberBetweenMinAndMax;
