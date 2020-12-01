'use strict';
function Sweet(name, production, weight, shape) {
  this.name = name;
  this.production = production;
  this.weight = weight;
  this.shape = shape;
}

function ChocolateBar(name, production, weight, shape, chocolateType) {
  Sweet.call(this, name, production, weight, shape);
  this.type = 'Chocolate';
  this.chocolateType = chocolateType;
  this.caloric = function() {
    if (this.chocolateType === 'Dark') {
      return this.weight/100 * 549;
    }
    
    return this.weight/100 * 554;
  };
}

function ChocolateCandy(name, production, weight, shape) {
  Sweet.call(this, name, production, weight, shape);
  this.type = 'Chocolate candy';
  this.caloric = function() {    
    return this.weight/100 * 535;
  };
}

function Lollipop(name, production, weight, shape, isStick) {
  Sweet.call(this, name, production, weight, shape);
  this.type = 'Lollipop';
  this.isStick = isStick;
  this.caloric = function() {    
    return this.weight/100 * 337;
  };
}

function Wafer(name, production, weight, shape, waferNumber) {
  Sweet.call(this, name, production, weight, shape);
  this.type = 'Wafer';
  this.waferNumber = waferNumber;
  this.caloric = function() {    
    return this.weight/100 * 291;
  };
}

function Gift(...sweet) {
  this.sweet = sweet;
  this.showContent = function() {
    return this.sweet;
  };
  this.getWeight = function() {
    const weight = this.sweet.reduce((weight, elem) => weight + elem.weight, 0);

    return console.log(`Gift's weight is ${weight} g`);
  };
  this.getCaloric = function() {
    const caloric = this.sweet.reduce((caloric, elem) => caloric + elem.caloric(), 0);

    return console.log(`Gift's caloric is ${caloric} cal`);
  };
  this.sort = function(sweetType) {
    return this.sweet.filter(elem => elem.type === sweetType);
  };
  this.find = function(name) {
    return this.sweet.find(elem => elem.name === name);
  };
}

ChocolateBar.prototype = Object.create(Sweet.prototype);
ChocolateCandy.prototype = Object.create(Sweet.prototype);
Lollipop.prototype = Object.create(Sweet.prototype);
Wafer.prototype = Object.create(Sweet.prototype);

const alyonkaChoсolateDark = new ChocolateBar('Alyonka', 'Red factory', 100, 'square', 'Dark');
const alyonkaChoсolateMilk = new ChocolateBar('Alyonka', 'Red factory', 100, 'square', 'Milk');
const gummyInForest = new ChocolateCandy('Gummy in forest', 'Victory factory', 50, 'square');
const chupaChups = new Lollipop('Chupa Chups', 'Chupa Chups', 100, 'round', true);
const gift = new Gift(alyonkaChoсolateDark, alyonkaChoсolateMilk, gummyInForest, chupaChups);
