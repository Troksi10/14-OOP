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

Person.prototype.calcAge = function(){
    console.log(2022 - this.birthYear);
};

ilija.calcAge();
stefan.calcAge();

console.log(ilija.__proto__);
console.log(ilija.__proto__ === Person.prototype);

Person.prototype.species = 'Homo Sapiens';
console.log(ilija.species,angela.species);

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

const arr = [3,4,2,5,3,7,6,3,3];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function() {
    return [new Set(this)];
}

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

const Car = function(make,speed){
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  };
  

Car.prototype.brake = function(){
    this.speed -=5
    console.log(`${this.make} is going at ${this.speed} km/h`);
}

const car1 = new Car('BMW',120);
const car2 = new Car('Mercedes',95);

car1.accelerate();
car2.accelerate();
car1.brake();
car2.brake();




