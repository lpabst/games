import entities from './entities.js';

var minesweeper = {
    init: function (minesweeperClass) {
        document.getElementById('messageDiv').innerText = '';
        document.querySelectorAll('.btn').forEach(btn => btn.style.visibility = 'hidden');

        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');
        let animationFrame = 0;
        let gameOver = false;
        let minesLeft = 10;
        let cellWidth = 60;
        let rows = canvas.height / cellWidth;
        let cols = canvas.width / cellWidth;
        let board = minesweeper.generateBoard(minesLeft, rows, cols);

        minesweeperClass.data = { canvas, context, animationFrame, gameOver, minesLeft, cellWidth, rows, cols, board };

        minesweeper.run(minesweeperClass);
    },

    generateBoard: function (minesLeft, rows, cols) {
        // generate board of cells
        let board = [];
        let values = [];
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            values[i] = [];
            for (let j = 0; j < cols; j++) {
                board[i][j] = new entities.Cell();
            }
        }

        // pick random spots for the mines
        while (minesLeft > 0) {
            let randI = Math.floor(Math.random() * rows);
            let randJ = Math.floor(Math.random() * cols);
            if (!board[randI][randJ].isBomb) {
                board[randI][randJ].isBomb = true;
                minesLeft--;
            }
        }

        // Figure out how many neighboring bombs all remaining cells have
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let neighboringBombs = 0;
                if (board[i - 1] && board[i - 1][j - 1] && board[i - 1][j - 1].isBomb) neighboringBombs++;
                if (board[i - 1] && board[i - 1][j] && board[i - 1][j].isBomb) neighboringBombs++;
                if (board[i - 1] && board[i - 1][j + 1] && board[i - 1][j + 1].isBomb) neighboringBombs++;
                if (board[i] && board[i][j - 1] && board[i][j - 1].isBomb) neighboringBombs++;
                if (board[i] && board[i][j + 1] && board[i][j + 1].isBomb) neighboringBombs++;
                if (board[i + 1] && board[i + 1][j - 1] && board[i + 1][j - 1].isBomb) neighboringBombs++;
                if (board[i + 1] && board[i + 1][j] && board[i + 1][j].isBomb) neighboringBombs++;
                if (board[i + 1] && board[i + 1][j + 1] && board[i + 1][j + 1].isBomb) neighboringBombs++;
                board[i][j].neighboringBombs = neighboringBombs
                values[i][j] = neighboringBombs;
            }
        }

        console.table(values);

        return board;
    },

    handleClick: function (minesweeperClass, e) {
        let { cellWidth, board } = minesweeperClass.data;
        let bounds = e.target.getBoundingClientRect();
        let x = e.clientX - bounds.left;
        let y = e.clientY - bounds.top;
        let i = Math.floor(y / cellWidth);
        let j = Math.floor(x / cellWidth);
        let cell = board[i][j];

        // if it's already visible, or marked with a flag, do nothing
        if (cell.isVisible || cell.isSuspect) return;

        // if it's a bomb, end the game
        if (cell.isBomb) {
            minesweeper.endGame(minesweeperClass, true);
        } else {
            // otherwise, open the cell
            minesweeperClass.data.board = openCell(board, i, j)
        }

    },

    run: function (minesweeperClass) {
        function loop() {
            minesweeper.update(minesweeperClass);
            minesweeper.render(minesweeperClass);
            minesweeperClass.data.animationFrame++;

            window.requestAnimationFrame(loop);
        }

        loop();
    },

    update: function (minesweeperClass) {

    },

    render: function (minesweeperClass) {
        let { canvas, context, board, cols, rows, cellWidth } = minesweeperClass.data;

        let colorMapping = {
            1: '#2c2',
            2: '#55a',
            3: '#5a5',
            4: '#77f',
            5: '#7f7',
            6: '#99e',
            7: '#9e9',
            8: '#22c',
        }

        // Black background
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // draw board
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let cell = board[i][j];
                let numBombs = cell.neighboringBombs;

                if (cell.isVisible) {
                    context.fillStyle = '#999';
                    context.fillRect(j * cellWidth, i * cellWidth, cellWidth - 1, cellWidth - 1);

                    context.font = '20px Arial';
                    let textX = (j * cellWidth) + (cellWidth - 10) / 2;
                    let textY = (i * cellWidth) + (cellWidth + 10) / 2;
                    if (cell.isBomb) {
                        context.fillStyle = 'red';
                        context.fillText('B', textX, textY);
                    } else if (numBombs !== 0) {
                        context.fillStyle = colorMapping[numBombs];
                        context.fillText(numBombs, textX, textY);
                    }
                } else {
                    context.fillStyle = '#666';
                    context.fillRect(j * cellWidth, i * cellWidth, cellWidth - 1, cellWidth - 1);
                }
            }
        }
    },

    endGame: function (minesweeperClass, userClickedABomb) {
        let { board } = minesweeperClass.data;

        document.querySelectorAll('.btn').forEach(btn => btn.style.visibility = 'visible');
        minesweeperClass.data.gameOver = true;

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                minesweeperClass.data.board[i][j].isVisible = true;
            }
        }

        if (userClickedABomb) {
            document.getElementById('messageDiv').innerText = 'GAME OVER (You clicked a bomb)';
        }
    },
}

export default minesweeper;

// helper functions
function openCell(board, i, j) {
    let cell = board[i][j];

    board[i][j].isVisible = true;

    // if the cell has no neighboring bombs, open all neighbors
    if (cell.neighboringBombs === 0) {
        // any neighbor that isn't visible yet, and has no bomb neighbors receives the same treatment
        if (board[i - 1] && board[i - 1][j - 1] && !board[i - 1][j - 1].isVisible) {
            board[i - 1][j - 1].isVisible = true;
            if (board[i - 1][j - 1].neighboringBombs === 0) {
                openCell(board, i - 1, j - 1);
            }
        }
        if (board[i - 1] && board[i - 1][j] && !board[i - 1][j].isVisible) {
            board[i - 1][j].isVisible = true;
            if (board[i - 1][j].neighboringBombs === 0) {
                openCell(board, i - 1, j);
            }
        }
        if (board[i - 1] && board[i - 1][j + 1] && !board[i - 1][j + 1].isVisible) {
            board[i - 1][j + 1].isVisible = true;
            if (board[i - 1][j + 1].neighboringBombs === 0) {
                openCell(board, i - 1, j + 1);
            }
        }
        if (board[i] && board[i][j - 1] && !board[i][j - 1].isVisible) {
            board[i][j - 1].isVisible = true;
            if (board[i][j - 1].neighboringBombs === 0) {
                openCell(board, i, j - 1);
            }
        }
        if (board[i] && board[i][j + 1] && !board[i][j + 1].isVisible) {
            board[i][j + 1].isVisible = true;
            if (board[i][j + 1].neighboringBombs === 0) {
                openCell(board, i, j + 1);
            }
        }
        if (board[i + 1] && board[i + 1][j - 1] && !board[i + 1][j - 1].isVisible) {
            board[i + 1][j - 1].isVisible = true;
            if (board[i + 1][j - 1].neighboringBombs === 0) {
                openCell(board, i + 1, j - 1);
            }
        }
        if (board[i + 1] && board[i + 1][j] && !board[i + 1][j].isVisible) {
            board[i + 1][j].isVisible = true;
            if (board[i + 1][j].neighboringBombs === 0) {
                openCell(board, i + 1, j);
            }
        }
        if (board[i + 1] && board[i + 1][j + 1] && !board[i + 1][j + 1].isVisible) {
            board[i + 1][j + 1].isVisible = true;
            if (board[i + 1][j +1].neighboringBombs === 0) {
                openCell(board, i + 1, j + 1);
            }
        }
    }

    return board;
}