// In this project, think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects. Take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!
// If you’re having trouble, Building a house from the inside out is a great article that lays out a highly applicable example both of how you might approach tackling this project as well as how you might organize and structure your code.
// Focus on getting a working game in the console first. Make sure you include logic that checks for when the game is over! You should be checking for all winning 3-in-a-rows and ties. Try to avoid thinking about the DOM and your HTML/CSS until your game is working.
// Once you have a working console game, create an object that will handle the display/DOM logic. Write a function that will render the contents of the gameboard array to the webpage (for now, you can always just fill the gameboard array with "X"s and "O"s just to see what’s going on).
// Write the functions that allow players to add marks to a specific spot on the board by interacting with the appropriate DOM elements (e.g. letting players click on a board square to place their marker). Don’t forget the logic that keeps players from playing in spots that are already taken!
// Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that shows the results upon game end!


// You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.


// STEP 1: -----------------------------------------------------------------------------
// 1. Make a 2D array which represents a board
    // 1.i. Each cell will have an x & y coordinate
    // 1.ii. Each cell will have a value
// Solution:
    // One row of board will be represented by a row
    // values separated by commas inside a row will represent columns

let array = [];
for (let i = 0; i < 5; i++) {
    array[i] = [];  // create an array which represents a row at index i
    for (let j = 0; j < 5; j++) {
        console.log(array[i].push(0));  // populate array at index i with value of 0
    }
}

// Placing above inside a factory function
function gameBoard(size = 6) {
    // first parameter is size of grid, 2nd parameter is default cell value

    // create array & populate all cells with '0'
    let board = [];
    for (let i = 0; i < size; i++) {
        board[i] = [];  // create an array which represents a row at index i
        for (let j = 0; j < size; j++) {
            board[i].push(Cell());  // populate array at index i with object Cell
        }
    } 

    // create a render method which will be accessible by other apps outside of gameBoard factory function
    // it only renders a board containing Cell-object in every cell
    const getBoard = () => board;

    // print board with cell values
    const printBoard = () => {
        const boardWithCellValues = board.map( row => row.map( cell => cell.getValue() ));
        console.log(boardWithCellValues);
    };

    // assign Value to cell upon token drop by player
    

    // provide interface for the rest of apps to interact with board
    return { getBoard, printBoard };
}


// STEP 2: -----------------------------------------------------------------------------
// 2. Cell factory function which:
    // 2.i. has getValue to retrieve current value of a specified cell
    // 2.ii. has giveValue to give desired value to a specified cell (player)
function Cell() {
    let value = 0;    // default cell value

    const getValue = () => value;

    const assignValue = (player) => {
        value = player;
    };

    return { getValue, assignValue };
}









