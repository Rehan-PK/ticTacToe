// *************************************************** Factory functions
// https://www.theodinproject.com/lessons/node-path-javascript-factory-functions-and-the-module-pattern#the-module-pattern-iifes

function makeAdding(firstNumber) {
  const first = firstNumber;
  return function resulting(secondNumber) {
      const second = secondNumber;
      return first + second;
  }
}

const add5 = makeAdding(5);

// add5 has the following:
//    - resulting(secondNumber) function
//    - 'first' constant available

console.log(add5(2));   // returns 7

// reason of this result:
//    - '2' provided as argument
//    - '5' already available to 'resulting' function in form of 'first' constant, due to closure
//    - '5' added to '2' & result returned

// *************************************************** Diff b/w constructor & Factory functions

// constructor for displaying inputted username as discordName
const User = function (name) {
    this.name = name;
    this.discordName = "@" + name;
}
// created user1 object
const user1 = new User('rehan');
console.log(user1);     // User {name: 'rehan', discordName: '@rehan'}

// above written as factory function
function makeUser(name) {
    const discordName = "@" + name;
    return { name, discordName };
}

    makeUser('faizan');     // {name: 'faizan', discordName: '@faizan'}


// *************************************************** Object shorthand notation
const name = 'Bob';
const age = 39;
const color = "black";

const thatObject = {name: name, age: age, color: color};

    console.log(thatObject);
    // {name: 'Bob', age: 39, color: 'black'}

// shorthand notation allows
const thatObject2 = {name, age, color};

    console.log(thatObject2);
    // {name: 'Bob', age: 39, color: 'black'}
    console.log({name, age, color});
    // {name: 'Bob', age: 39, color: 'black'}


// *************************************************** Destructuring
const obj = { a: 1, b: 2};
const {a, b} = obj;     //  a = 1, b = 2
const {c, d} = obj;     //  c = undefined, d = undefined
const {a, c} = obj;     //  a = 1, c = undefined

const obj2 = { x: 10, y: 20};
const { x, z } = obj2   //  x = 10, z = undefined

const array = [1,2,3,4,5,6,7];
const [ firstElement, secondElement ] = array;
console.log(firstElement, secondElement);   // 1 2


// *************************************************** Private variables & functions
function createUser (name) {
    const discordName = "@" + name;
    let reputation = 0;     
    // reputation is private variable, not returned - hence not accessible
    // can only be accessed via closures we define
    const getReputation = () => reputation;
    const giveReputation = () => reputation++;
    return { name, discordName, getReputation, giveReputation };
}

const josh = createUser('josh');
josh.getReputation();
josh.giveReputation();

console.log({
    discordName: josh.discordName, 
    reputation: josh.getReputation()
})

console.log(josh.reputation);   //  undefined


// *************************************************** Object.assign(target, source1, source2, sourceN);
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
Object.assign(target, source);
console.log(target);    // {a: 1, b: 4, c: 5}


// *************************************************** Prototypal inheritance with factories
function createPlayer (name, level) {
    const { getReputation, giveReputation } = createUser(name);
    const increaseLevel = () => level++;
    return { name, getReputation, giveReputation, increaseLevel };
}

function createPlayer (name, level) {
    const user = createUser(name);
    const increaseLevel = () => level++;
    return Object.assign({}, user, { increaseLevel });
}

const rehan = createPlayer('rehan', 90);
console.log(rehan);     // {name: 'rehan', discordName: '@rehan', getReputation: ƒ, giveReputation: ƒ, increaseLevel: ƒ}


// *************************************************** Immediately Invoked Function Expression 'IIFE'
// wrapping a factory function inside an IIFE is called the module pattern
const calculator = (function () {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return { add, sub, mul, div };
})();
  
calculator.add(3,5); // 8
calculator.sub(6,2); // 4
calculator.mul(14,5534); // 77476

let a = 1;
a.toString();   // returns "1"
1.toString();   // uncaught SyntaxError: Invalid or unexpected token

// when 1 is assigned to a, then 1 is evaluated as a number and assigned to a.
// whereas when in case of 1.toString() 1 is never evaluated and hence the error.
// however, in case of (1).toString(), it works, bcoz () evaluate what's inside first.
// same goes with the calculator function, expression inside () evaluated,
// & then only returned variables / functions like add, sub, mul, div maybe used outside the factory


// data attributes HTML
<article
  id="electric-cars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars">
  …
</article>

article.dataset.columns         // "3"
article.dataset.indexNumber     // "12314"
article.dataset.parent          // "cars"






