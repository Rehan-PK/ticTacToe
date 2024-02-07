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














