'use strict';
function Sweet(name, production, weight, shape) {
  this.name = name;
  this.production = production;
  this.weight = weight;
  this.shape = shape;
}

function ChocolateBar(chocolateType) {
  this.type = 'Chocolate';
  this.chocolateType = chocolateType;
  this.caloric = function() {
    if (this.chocolateType === 'Dark') {
      return this.weight/100 * 549;
    }
    
    return this.weight/100 * 554;
  };
}

function ChocolateCandy() {
  this.type = 'Chocolate candy';
  this.caloric = function() {    
    return this.weight/100 * 535;
  };
}

function Lollipop(isStick) {
  this.type = 'Lollipop';
  this.isStick = isStick;
  this.caloric = function() {    
    return this.weight/100 * 337;
  };
}

function Wafer(waferNumber) {
  this.type = 'Wafer';
  this.waferNumber = waferNumber;
  this.caloric = function() {    
    return this.weight/100 * 291;
  };
}

function Gift(...sweet) {
  this.sweet = sweet;
  this.showContent = () => {
    return this.sweet;
  };
  this.getWeight = function() {
    let weight = 0;

    this.sweet.map(elem => { weight = weight + elem.weight; });
    return console.log(`Gift's weight is ${weight} g`);
  };
  this.getCaloric = function() {
    let caloric = 0;

    this.sweet.map(elem => { caloric = caloric + elem.caloric(); });

    return console.log(`Gift's caloric is ${caloric} cal`);
  };
  this.sort = function(sweetType) {
    return this.sweet.filter(elem => elem.type === sweetType);
  };
  this.find = function(name) {
    return this.sweet.find(elem => elem.name === name);
  };
}

ChocolateBar.prototype = new Sweet('Alyonka', 'Red factory', 100, 'square');

const alyonkaChoсolateDark = new ChocolateBar('Dark');
const alyonkaChoсolateMilk = new ChocolateBar('Milk');

ChocolateCandy.prototype = new Sweet('Gummy in forest', 'Victory factory', 50, 'square');

const gummyInForest = new ChocolateCandy();

Lollipop.prototype = new Sweet('Chupa Chups', 'Chupa Chups', 100, 'round');

const chupaChups = new Lollipop(true);
const gift = new Gift(alyonkaChoсolateDark, alyonkaChoсolateMilk, gummyInForest, chupaChups);
