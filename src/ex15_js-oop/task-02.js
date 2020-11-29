'use strict';
class Flat {
  constructor(flatNumber) {
    this.flatNumber = flatNumber;
  }
  getPower(...rooms) {
    let power = 0;
    let devicesArr = [];

    rooms.map(elem => { devicesArr = devicesArr.concat(elem.devices); });

    devicesArr.map(elem => {
      if (elem.isTurnOn === true) {
        power = power + elem.power;
      }
    });
    return console.log(`Power in the ${this.flatNumber} 
    flat is ${power.toFixed(2)} kw/h`);
  }
  findDevice(name, ...rooms) {
    let devicesArr = [];

    rooms.map(elem => { devicesArr = devicesArr.concat(elem.devices); });
    return devicesArr.filter(elem => elem.nameDevice === name );
  }
}

class Room extends Flat {
  constructor(flatNumber, roomName, ...devices) {
    super(flatNumber);
    this.roomName = roomName;
    this.devices = devices;
  }
  getPower() {
    let power = 0;

    this.devices.map(elem => {
      if (elem.isTurnOn === true) {
        power = power + elem.power;
      }
    });

    return console.log(`Power in the ${this.roomName} 
    is ${power.toFixed(2)} kw/h`);
  }
}

class ElectricalEquipment {
  constructor(nameDevice, power, isTurnOn) {
    this.nameDevice = nameDevice;
    this.power = power;
    this.isTurnOn = isTurnOn;
  }
}

const mashaFlat = new Flat(112);

const tvSet = new ElectricalEquipment('TV', 0.18, true);
const lamp = new ElectricalEquipment('Lamp', 0.04, true);
const washingMachine = new ElectricalEquipment('Washing Machine', 3.3, false);
const hairdryer = new ElectricalEquipment('Hairdryer', 0.8, true);
const fridge = new ElectricalEquipment('Fridge', 0.2, true);
const microwave = new ElectricalEquipment('Microwave', 2, true);
const coffeeMaker = new ElectricalEquipment('Coffee maker', 0.5, true);

const sittingRoom = new Room(112, 'Sitting room', tvSet, lamp);
const kitchen = new Room(112, 'Kitchen', fridge, microwave, coffeeMaker);
const bathroom = new Room(112, 'Bathroom', washingMachine, hairdryer);
