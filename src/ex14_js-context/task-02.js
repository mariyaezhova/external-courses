'use strict';
function Hangman(word) {
    this.guessWord = word;
    this.guessedWordFromUser = this.guessWord.split('').map(() => {return '_'});
    this.errorsLeft = 6;
    this.wrongSymbols = [];

    this.guess = (letter) => {
        this.guessWord.split('').map((elem, index) => {
            if (elem === letter) {
                this.guessedWordFromUser = this.guessedWordFromUser.map((elem, i) => {
                    if (i === index) {
                        return letter;
                    }

                    return elem;
                })
            }
        })

        if (!this.guessedWordFromUser.includes(letter)) {
            this.wrongSymbols.push(letter);
            this.errorsLeft--;

            if (this.errorsLeft <= 0) {
                console.log(`You lost. The right word is ${this.guessWord}`);
                return this;
            }

            console.log(`wrong letter, errors left ${this.errorsLeft} | ${this.wrongSymbols.join(',')}`);
            return this;
        }

        if (!this.guessedWordFromUser.includes('_')) {
            console.log(`${this.guessWord} | You won!`);
            return this;
        }

        console.log(this.guessedWordFromUser.join(''));
        return this;
    };

    this.getGuessedString = () => {
        return this.guessedWordFromUser.join('');
    };

    this.getErrorsLeft = () => {
        return this.errorsLeft;
    };

    this.getWrongSymbols = () => {
        return this.wrongSymbols;
    };

    this.getStatus = () => {
        console.log(`${this.guessedWordFromUser.join('')} | errors left ${this.errorsLeft}`)
        return this;
    };

    this.startAgain = (newWord) => {
        this.guessWord = newWord;
        this.guessedWordFromUser = this.guessWord.split('').map(() => {return '_'});
        this.errorsLeft = 6;
        this.wrongSymbols = [];

        return this;
    };
}

const hangman = new Hangman('webpurple');

module.exports = hangman;
