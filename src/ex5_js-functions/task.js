'use strict';
function Calculator() {
    this.currentState = 0;

    this.add = (number = 0) => {
        this.currentState = this.currentState + number;

        return this.add;
    };

    this.subtract = (number = 0) => {
        this.currentState = this.currentState - number;

        return this.subtract;
    };

    this.divide = (number = 1) => {
        this.currentState = this.currentState / number;

        return this.divide;
    };

    this.multiply = (number = 1) => {
        this.currentState = this.currentState * number;

        return this.multiply;
    };

    this.reset = () => {
        this.currentState = 0;
        return this.currentState;
    };

    this.getResult = () => {
        return this.currentState;
    };
}

const calc = new Calculator();

module.exports = calc;
