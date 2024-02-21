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

    // play round
    let activePlayer = getPlayers.activePlayerName();
    let activePlayerMark;
    const insertPlayerMark = (row, col) => {
        let currentBoard = board.getBoard();
        activePlayerMark = getPlayers.activePlayerMark();
        board.insertPlayerMark(row, col, activePlayerMark);
        // figure out about how to get cellReference ?
        
        // check for winner
        const checkForWinner = () => {
            // check all winning conditions
                // get array(row) of currentBoard having all values equal to 1
                if (currentBoard.filter(row => row.filter(item => item === activePlayerMark).length === 3).length > 0) {
                    return console.log(activePlayer);
                }
                // get column of currentBoard having all values equal to 1
                let winCondition = 0;
                for (let i = 0; i < 2; i++) {
                    if (currentBoard.filter(row => row[i] === activePlayerMark).length === 3) {
                        // winCondition++;
                        // console.log(winCondition);
                        return console.log(activePlayer);
                    }
                };
                // get diagonals of currentBoard having all values equal to 1
                let diagonal1 = 0, diagonal2 = 0;
                for (let i = 2; i > -1; i--) {
                    if (currentBoard[i][i] === activePlayerMark) {
                        diagonal1++;
                    }
                };
                for (let i = 0; i < 2; i++) {
                    if (currentBoard[i][i] === activePlayerMark) {
                        diagonal2++;
                    }
                };
                
                if (diagonal1 === 3 || diagonal2 === 3) {
                    return console.log(activePlayer);
                };
        };

        checkForWinner();

        // if no winner, prepare for next round
        getPlayers.changeActivePlayer();
    };
    
    // make available the insertPlayerMark()
    return { insertPlayerMark };
    
}

