// STEP 1: -----------------------------------------------------------------------------
// 1. Make a 2D array which represents a board
    // 1.i. Each cell will have an x & y coordinate
    // 1.ii. Each cell will have a value
// Solution:
    // One row of board will be represented by a row
    // values separated by commas inside a row will represent columns

// let array = [];
// for (let i = 0; i < 5; i++) {
//     array[i] = [];  // create an array which represents a row at index i
//     for (let j = 0; j < 5; j++) {
//         console.log(array[i].push(0));  // populate array at index i with value of 0
//     }
// }

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
    // 1st: find the lowest point of selected column that is still equal to '0'
    const dropToken = (column, player) => {
        // get all the rows wherein the sepcified column value is still 0
        const availableRows = board.filter(i => i[column].getValue() === 0);
        
        // if no such rows available, return
        if (!availableRows.length) return;

        // array index starts from 0, so subtract 1 from availableRows.length
        const row = availableRows.length - 1;

        // add token in the cell
        board[row][column].addToken(player);
        console.log(board[row][column].addToken(player));

    }

    // provide interface for the rest of apps to interact with board
    return { getBoard, printBoard, dropToken };
}


// STEP 2: -----------------------------------------------------------------------------
// 2. Cell factory function which:
    // 2.i. has getValue to retrieve current value of a specified cell
    // 2.ii. has giveValue to give desired value to a specified cell (player)
function Cell() {
    let value = 0;    // default cell value

    const getValue = () => value;

    const addToken = (player) => {
        value = player;
    };

    return { getValue, addToken };
}

// STEP 3: -----------------------------------------------------------------------------
// 3. Setup game controller responsible for:
    // 3.i. Game flow (start, player turns, round, winner, end, restart)
    // 3.ii. Game state (current player-turn, score)
function GameController(player1 = 'one', player2 = 'two') {
    // draw the board
    const board = gameBoard();

    // define player tokens
    const players = [
        {
            name: player1,
            token: 1
        },
        {
            name: player2,
            token: 2
        }
    ];

    // define current/active player, get active player method for exposing
    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;

    // Switch active player
    const switchActivePlayer = () => {activePlayer = (activePlayer === players[0]) ? players[1] : players[0]};

    // print new round
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    // play a single round
    const playRound = (column) => {
        // add token
        board.dropToken(column, getActivePlayer().token);
        console.log(`${getActivePlayer().name}'s token dropped in column ${column}.`);
        
        // switchPlayer
        switchActivePlayer();

        // print new round
        printNewRound();
    }
    return { playRound, getActivePlayer, getBoard: board.getBoard };
}

// const game = GameController();
// above no longer required in web version

function ScreenController() {
    const game = GameController();
    const turnDisplay = document.querySelector('.turn');
    const boardDisplay = document.querySelector('.board');

    // function for updating screen with the existing gameBoard
    const updateScreen = () => {
        // clear any existing content in the boardDisplay
        boardDisplay.textContent = "";

        // get the gameBoard
        const board = game.getBoard();

        // get the activePlayer
        const activePlayer = game.getActivePlayer();

        // Display player's turn
        turnDisplay.textContent = `${activePlayer}'s turn...`;
        
        // render the board squares
        board.forEach(row => {
            row.forEach( (cell, index) => {
                // anything clickable should be a button
                const cellButton = document.createElement('button');
                cellButton.classList.add("cell");
                // Create a data attribute to identify the column
                // This makes it easier to pass into our `playRound` function 
                cellButton.dataset.column = index;
                cellButton.textContent = cell.getValue();
                boardDisplay.appendChild(cellButton);
            })
        })
    }

    // add event listener for the board
    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        // Make sure I've clicked a column and not the gaps in between
        if (!selectedColumn) return;
        
        game.playRound(selectedColumn);
        updateScreen();
    }
    boardDisplay.addEventListener("click", clickHandlerBoard);

    // Initial render
    updateScreen();

    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
}
