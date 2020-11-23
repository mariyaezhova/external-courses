'use strict';
function Calculator() {
    this.currentState = 0;

    this.add = (number = 0) => {
        this.currentState = this.currentState + number;

        return this;
    };

    this.subtract = (number = 0) => {
        this.currentState = this.currentState - number;

        return this;
    };

    this.divide = (number = 1) => {
        this.currentState = this.currentState / number;

        return this;
    };

    this.multiply = (number = 1) => {
        this.currentState = this.currentState * number;

        return this;
    };

    this.reset = () => {
        this.currentState = 0;

        return this;
    };

    this.getResult = () => {
        return this.currentState;
    };

    this.setState = (state = 0) => {
        this.currentState = state;

        return this;
    };

    this.fetchData = (func) => {
        setTimeout(() => func.call(this, 500), 2000);

        return this;
    };
}

const calc = new Calculator();
const setState = calc.setState;

calc.fetchData(setState);

module.exports = calc;
