function player() {
    const players = [
        { name: "player-01", mark: 1}, { name: "player-02", mark: 2 }
    ]

    let activePlayer = players[0];
    const changeActivePlayer = () =>  activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    let activePlayerMark = () => activePlayer.mark;
    let activePlayerName = () => activePlayer.name;

    return { activePlayerMark, activePlayerName, changeActivePlayer };
}

function gameBoard() {
    const board = [];
    // draw a 3x3 board with all cells equal to '0'
    for (let i = 0; i < 3; i++) {
        board.push([]);
        for (let j = 0; j < 3; j++) {
            board[i].push(0);
        }
    }

    const getBoard = () => board;

    const printBoard = () => console.log(board);
    // displayGameBoard = function to display board with updated values, not yet incorporated, check if it's really needed
    // use updateGameBoard function instead to update the value of cells that have been changed

    // const player = player();     // this moved to game()

    const insertPlayerMark = (row, col, activePlayerMark) => {
        // change the reference-cell value to playerMark if reference-cell value is already null/'0'
        if (board[row][col] === 0) {
            board[row][col] = activePlayerMark;
        } else {
            // do nothing
        }
        // change activePlayer
        // player.changeActivePlayer();     // this moved to game()
        // displayGameBoard again (as cell values updated)
        // printBoard();        // this moved to game()
        printBoard();
    }

    return { printBoard, getBoard, insertPlayerMark };
}

function game() {
    const board = gameBoard();
    const getPlayers = player();
    // const playerMark = player.activePlayerMark();
    // const playerName = player.activePlayerName();
    // const changePlayer = player.changeActivePlayer();
    // let cellReference = ??
    // const getBoard = board.getBoard();
    // const printBoard = () => board.printBoard();
    
    // play round
    let activePlayer = getPlayers.activePlayerName();
    let activePlayerMark;
    const insertPlayerMark = (row, col) => {
        let currentBoard = board.getBoard();
        activePlayerMark = getPlayers.activePlayerMark();
        board.insertPlayerMark(row, col, activePlayerMark);
        // figure out about how to get cellReference ?
        getPlayers.changeActivePlayer();

        // check for winner
        const checkForWinner = () => {
            
            // check all consecutive 3 rows & columns, check for 2 diagonals
            // for rows:
                // Row.filter( item => item == Mark).length
                    // for each row in the board
                        // check if all items of the row are equal to Mark
                        // check if all items at any specified index (say index[0]) of each row are equal to Mark
                        // check if all items at first index of first row, 2nd index of 2nd row, & 3rd index of 3rd row are equal to Mark
                        // check if all items at -1 index of first row (row[0]), -2 index of 2nd row, & -3 index of 3rd row are equal to Mark
            // for (row in (currentBoard)) {
            //     checkRowWin(currentBoard[row], activePlayerMark);
            //     // checkColWin(row, activePlayerMark);
            //     // checkDiagonalWin(row, activePlayerMark);
            // };

            // function checkRowWin(subArray, mark) {
            //     let index = 0, winCount = 0;
            //     while (subArray[index] && subArray[index] === mark) {
            //         winCount++;
            //         index++;
            //         if (winCount === 3) {
            //             declareWinner();
            //         } else {
            //             // do nothing
            //         }
            //     }
            // };
            
            // function checkRowWin(currentBoard, activePlayerMark, activePlayer) {
            //     for (row in currentBoard) {
            //         let index = 0, winCount = 0;
            //         while (currentBoard[row][index] && currentBoard[row][index] === activePlayerMark) {
            //             winCount++;
            //             index++;
            //         }
            //         checkWinner(winCount, activePlayer);
            //     }
            // };

            // can we refractor above function into compact & elaborate form


            // function checkColWin(currentBoard, activePlayerMark, activePlayer) {
            //     let colIndex = 0;
            //     while (colIndex < 3) {
            //         let rowIndex = 0, winCount = 0;
            //         while (currentBoard[rowIndex][colIndex] && currentBoard[rowIndex][colIndex] === activePlayerMark) {
            //             winCount++;
            //             rowIndex++;
            //             checkWinner(winCount, activePlayer);
            //         }
            //         col++;
            //     }
            // };

            // function checkDiagonalWin(currentBoard, activePlayerMark, activePlayer) {
            //     let colIndex = 0, rowIndex = 0, winCount = 0;
            //     while (col < 3 && currentBoard[rowIndex][colIndex] && currentBoard[rowIndex][colIndex] === activePlayerMark) {
            //         winCount++;
            //         colIndex++;
            //         rowIndex++;
            //         checkWinner(winCount, activePlayer);
            //     };
            //     colIndex = 0, rowIndex = 0, winCount = 0;
            //     while (col > 0 && currentBoard[rowIndex][colIndex] && currentBoard[rowIndex][colIndex] === activePlayerMark) {
            //         winCount++;
            //         colIndex--;
            //         rowIndex++;
            //         checkWinner(winCount, activePlayer);
            //     };
            // };

            // checkRowWin(currentBoard, activePlayerMark, activePlayer);
            // // checkColWin(currentBoard, activePlayerMark, activePlayer);
            // // checkDiagonalWin(currentBoard, activePlayerMark, activePlayer);

            // function checkWinner(counter, playerName) {
            //     if (counter === 3) {
            //         console.log(`Winner is: ${playerName}.`);
            //         // declareWinner();
            //     } else {
            //         // do nothing
            //     }
            // };
        };

        checkForWinner();

        // if no winner, prepare for next round
        // getPlayers.changeActivePlayer();
    };
    
    // make available the insertPlayerMark()
    return { insertPlayerMark };
    
}








// function checkWinner(board) {
//     for (row in (board)) {
//         checkRowWin(row, activePlayerMark);
//         checkColWin(row, activePlayerMark);
//         checkDiagonalWin(row, activePlayerMark);
//     }
// }

// // subArray will be rowItem, mark will be currentPlayerMark
// function checkRowWin(subArray, mark) {
//     let index = 0, winCount = 0;
//     while (subArray[index] && subArray[index] === mark) {
//         winCount++;
//         index++;
//         if (winCount === 3) {
//             declareWinner();
//         } else {
//             // do nothing
//         }
//     }
// }

// function checkColWin(subArray, mark) {
//     let col = 0, rowIndex = 0, winCount = 0;
//     while (col < 3) {
//         winCount = 0;
//         while (subArray[rowIndex][col] && subArray[rowIndex][col] === mark) {
//             winCount++;
//             rowIndex++;
//             if (winCount === 3) {
//                 declareWinner();
//             } else {
//                 // do nothing
//             }
//         }
//         col++;
//     }
// }

// function checkDiagonalWin(subArray, mark) {
//     let col = 0, row = 0, winCount = 0;
//     while (col < 3 && subArray[row][col] && subArray[row][col] === mark) {
//         winCount++;
//         col++;
//         row++;
//         if (winCount === 3) {
//             declareWinner();
//         } else {
//             // do nothing
//         }
//     }
//     col = 0;
//     row = 0;
//     winCount = 0;
//     while (col > 0 && subArray[row][col] && subArray[row][col] === mark) {
//         winCount++;
//         col--;
//         row++;
//         if (winCount === 3) {
//             declareWinner();
//         } else {
//             // do nothing
//         }
//     }
// }

// function declareWinner() {
//     console.log('Winner');
// }