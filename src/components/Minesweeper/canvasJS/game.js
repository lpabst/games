import entities from './entities.js';

var minesweeper = {
    init: function(minesweeperClass){
        document.getElementById('messageDiv').innerText = '';
        document.querySelectorAll('.btn').forEach( btn => btn.style.visibility = 'hidden');

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

    generateBoard: function(minesLeft, rows, cols){
        // generate board of cells
        let board = [];
        for (let i = 0; i < rows; i++){
            board[i] = [];
            for (let j = 0; j < cols; j++){
                board[i][j] = new entities.Cell();
            }
        }

        // pick random spots for the mines
        while (minesLeft > 0){
            let randI = Math.floor(Math.random() * rows);
            let randJ = Math.floor(Math.random() * cols);
            if (!board[randI][randJ].isBomb){
                board[randI][randJ].isBomb = true;
                minesLeft--;
            }
        }

        // Figure out how many neighboring bombs all remaining cells have
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                let neighboringBombs = 0;
                if (board[i-1] && board[i-1][j-1] && board[i-1][j-1].isBomb) neighboringBombs++;
                if (board[i-1] && board[i-1][j]   && board[i-1][j].isBomb) neighboringBombs++;
                if (board[i-1] && board[i-1][j+1] && board[i-1][j+1].isBomb) neighboringBombs++;
                if (board[i]   && board[i][j-1]   && board[i][j-1].isBomb) neighboringBombs++;
                if (board[i]   && board[i][j+1]   && board[i][j+1].isBomb) neighboringBombs++;
                if (board[i+1] && board[i+1][j-1] && board[i+1][j-1].isBomb) neighboringBombs++;
                if (board[i+1] && board[i+1][j]   && board[i+1][j].isBomb) neighboringBombs++;
                if (board[i+1] && board[i+1][j+1] && board[i+1][j+1].isBomb) neighboringBombs++;
                board[i][j].neighboringBombs = neighboringBombs
            }
        }

        return board;
    },

    run: function(minesweeperClass){
        function loop() {
            minesweeper.update(minesweeperClass);
            minesweeper.render(minesweeperClass);
            minesweeperClass.data.animationFrame++;

            window.requestAnimationFrame(loop);
        }

        loop();
    },

    update: function(minesweeperClass){

    },

    render: function(minesweeperClass){
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
        context.fillStyle = 'gray';
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                let cell = board[i][j];
                let numBombs = cell.neighboringBombs;

                context.fillRect(j*cellWidth, i*cellWidth, cellWidth-1, cellWidth-1);
                if (cell.isVisible){
                    if (cell.isBomb){
                        context.fillStyle = 'red';
                        context.fillText('B', j*cellWidth, i*cellWidth);
                    }else if (numBombs !== 0){
                        context.fillStyle = colorMapping[numBombs];
                        context.fillText(numBombs, j*cellWidth, i*cellWidth);
                    }
                }
            }
        }
    },
}

export default minesweeper;