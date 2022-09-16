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
// ES6 Classes && Inheritance

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
    console.log(
      `Hey ${this.fullName}.One month you will be free... And then..Wedding day- The End.`
    );
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already axists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey = function () {
    console.log('Hey there');
  };
}

class StudentCl extends PersonCl {
  constructor(fullName, month, birthYear, course) {
    super(fullName, month, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I am ${
        2022 - this.birthYear
      } years old,but as a student I feel more like ${
        2022 - this.birthYear + 10
      }`
    );
  }
}

const aleksandra = new StudentCl(
  'Aleksandra Janeva',
  'September',
  1996,
  'Computer Science'
);

aleksandra.introduce();
aleksandra.calcAge();

const kosta = new PersonCl('Kosta Stojanovski', 'august', '1990');
console.log(kosta);
kosta.calcAge();

console.log(kosta.__proto__ === Person.prototype);

// PersonCl.prototype.greet() = function(){
//     console.log(`Hey ${this.firstName}`);
// }

kosta.greet();
console.log(kosta.age);

const walter = new PersonCl('Walter White', 'january', 1965);
console.log(walter);

PersonCl.hey();

///////////////////////////////////////
// Setters and Getters

const account = {
  owner: 'Ilija',
  movements: [200, 530, 120, 360],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

///////////////////////////////////////
//  Inheritance Between "Classes" : Object.create

const PersonProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const kristina = Object.create(PersonProto);
console.log(kristina);
kristina.name = 'Kristina';
kristina.birthYear = 2000;
kristina.calcAge();

console.log(kristina.__proto__);

const darko = Object.create(PersonProto);
darko.init('Darko', 2003);
darko.calcAge();

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const violeta = Object.create(StudentProto);
violeta.init('Violeta', 1985, 'Software Tester');
violeta.introduce();
violeta.calcAge();

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
  constructor(make, speed) {
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
    return this;
  }

  get speedUs() {
    return this.speed / 1.6;
  }

  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUs);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUs = 50;
console.log(ford);

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

*/

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

 console.log(rivian.speedUs);

///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

const PersonNew = function (firstName, month, birthYear) {
  this.firstName = firstName;
  this.month = month;
  this.birthYear = birthYear;
};

PersonNew.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

const Student = function (firstName, month, birthYear, course) {
  PersonNew.call(this, firstName, month, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(PersonNew.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const martin = new Student('Martin', 'April', 1992, 'FrontEnd Programming.');
console.log(martin);
martin.introduce();
martin.calcAge();

console.log(martin.__proto__);
console.log(martin.__proto__.__proto__);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'!

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

*/

// From the FIRST CHALLENGE

// const Car = function (make, speed) {
//     this.make = make;
//     this.speed = speed;
//   };

//   Car.prototype.accelerate = function () {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   };

//   Car.prototype.brake = function () {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// // Link the prototypes
// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(
//     `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);
// tesla.chargeBattery(90);
// console.log(tesla);
// tesla.brake();
// tesla.accelerate();

///////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods

class Account {
  // 1. Public fields (instances)
  locale = navigator.language;

  // 2.Private fields (instances)

  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account,${owner}.`);
  }

  // 3. Public methods
  // Public interface

  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._aproveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
    } else {
      console.log('Loan rejected');
    }
    return this;
  }

  static helper() {
    console.log('Helper');
  }

  // 4. Private methods
  _aproveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Ilija', 'EUR', 1111);

// acc1._movements.push(250);
// acc1._movements.push(-140);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();

// Chaining

acc1.deposit(300).deposit(500).withdraw(50).requestLoan(25000).withdraw(400);
console.log(acc1.getMovements());
