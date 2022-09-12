'use strict';

console.log('Connected');

///////////////////////////////////////
// Constructor Functions and the new Operator

const Person = function (firstName, month, birthYear) {
  this.firstName = firstName;
  this.month = month;
  this.birthYear = birthYear;

  // Never fo this... Bad practice
  //   this.calcAge = function(){
  //     console.log(2022 - this.birthYear);
  //   }
};

const ilija = new Person('Ilija', 'may', 1990);
console.log(ilija);

const angela = new Person('Angela', 'september', 1993);
const zlatko = new Person('Zlatko', 'july', 1994);
const stefan = new Person('Stefan', 'october', 1991);
const bojan = new Person('Bojan', 'november', 1990);
console.log(angela, zlatko, stefan, bojan);

console.log(ilija instanceof Person);

///////////////////////////////////////
// Prototypes

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

ilija.calcAge();
stefan.calcAge();

console.log(ilija.__proto__);
console.log(ilija.__proto__ === Person.prototype);

Person.prototype.species = 'Homo Sapiens';
console.log(ilija.species, angela.species);

console.log(ilija.hasOwnProperty('firstName'));
console.log(ilija.hasOwnProperty('species'));

console.log(Person.prototype.isPrototypeOf(ilija));
console.log(Person.prototype.isPrototypeOf(zlatko));

///////////////////////////////////////
// Prototypal Inheritance on Built-In Objects

console.log(ilija.__proto__);
console.log(ilija.__proto__.__proto__);
console.log(ilija.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 4, 2, 5, 3, 7, 6, 3, 3];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car2.accelerate();
car1.brake();
car2.brake();

///////////////////////////////////////
// ES6 Classes

class PersonCl {
  constructor(fullName, month, birthYear) {
    this.fullName = fullName;
    this.month = month;
    this.birthYear = birthYear;

    // Instance methods
  }
  calcAge() {
    console.log(2022 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}.One month you will be free... And then..Wedding day- The End.`);
  }

  get age(){
    return 2037 - this.birthYear;
  }

  // Set a property that already axists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName(){
    return this._fullName;
  }

  // Static method
  static hey = function(){
    console.log('Hey there');
  }
}

const kosta = new PersonCl('Kosta Stojanovski', 'august', '1990');
console.log(kosta);
kosta.calcAge();

console.log(kosta.__proto__ === Person.prototype);

// PersonCl.prototype.greet() = function(){
//     console.log(`Hey ${this.firstName}`);
// }

kosta.greet();
console.log(kosta.age);

const walter = new PersonCl('Walter White','january',1965);
console.log(walter);

PersonCl.hey();

///////////////////////////////////////
// Setters and Getters

const account = {
    owner : 'Ilija',
    movements : [200,530,120,360],

    get latest(){
        return this.movements.slice(-1).pop();
    },

    set latest(mov){
        this.movements.push(mov);
    }
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

///////////////////////////////////////
// Object.create

const PersonProto = {
    calcAge() {
        console.log(2022 - this.birthYear);
    },

    init(firstName,birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
};

const kristina = Object.create(PersonProto);
console.log(kristina);
kristina.name = 'Kristina';
kristina.birthYear = 2000;
kristina.calcAge();

console.log(kristina.__proto__);

const darko = Object.create(PersonProto);
darko.init('Darko',2003);
darko.calcAge();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

*/

class CarCl {
    constructor(make,speed){
       this.make = make;
       this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed} km/h`);
      }
    
      brake() {
        this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed} km/h`);
      }

    get speedUs(){
        return this.speed / 1.6
    }
    
    set speedUs(speed){
        this.speed = speed * 1.6;
    }
}

const ford = new CarCl('Ford',120);
console.log(ford.speedUs);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUs = 50;
console.log(ford);



