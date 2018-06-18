var gameOfLife = {
    init: function(artClass){

        var canvas = document.getElementById('gameOfLifeCanvas');
        var context = canvas.getContext('2d');
        var animationFrame = 0;

        let resolution = 10;
        let fadingEffect = false;
        var cols = Math.floor(canvas.width / resolution);
        var rows = Math.floor(canvas.height / resolution);
        
        // Creates grid
        let grid = new Array(rows);
        for (let i = 0; i < grid.length; i++){
            grid[i] = new Array(cols);
            for (let j = 0; j < grid[i].length; j++){
                let r = Math.random();
                let alive = r < 0.11;
                grid[i][j] = new gameOfLife.Cell(alive);
            }
        }

        artClass.gameOfLife = {};
        artClass.gameOfLife.data = { canvas, context, animationFrame, resolution, fadingEffect, cols, rows, grid };

        gameOfLife.run(artClass);
    },

    run: function(artClass){
        function loop() {
            gameOfLife.update(artClass);
            gameOfLife.render(artClass);
            window.requestAnimationFrame(loop);
        }

        loop();
    },

    update: function(artClass){
        let { grid, rows, cols } = artClass.gameOfLife.data;

        // Update which cells are alive/dead based on game of life rules
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                // Keep track of 'alive' history for color mapping
                grid[i][j].history.push(grid[i][j].alive);
                while (grid[i][j].history.length > 13){
                    grid[i][j].history.shift();
                }

                let numNeighborsAlive = 0;
                if (grid[i-1] && grid[i-1][j-1] && grid[i-1][j-1].alive) numNeighborsAlive++;
                if (grid[i-1] && grid[i-1][j] && grid[i-1][j].alive) numNeighborsAlive++;
                if (grid[i-1] && grid[i-1][j+1] && grid[i-1][j+1].alive) numNeighborsAlive++;
                if (grid[i] && grid[i][j-1] && grid[i][j-1].alive) numNeighborsAlive++;
                if (grid[i] && grid[i][j+1] && grid[i][j+1].alive) numNeighborsAlive++;
                if (grid[i+1] && grid[i+1][j-1] && grid[i+1][j-1].alive) numNeighborsAlive++;
                if (grid[i+1] && grid[i+1][j] && grid[i+1][j].alive) numNeighborsAlive++;
                if (grid[i+1] && grid[i+1][j+1] && grid[i+1][j+1].alive) numNeighborsAlive++;
                
                if (!grid[i][j].alive && numNeighborsAlive === 3) grid[i][j].alive = true;
                if (grid[i][j].alive && (numNeighborsAlive < 2 || numNeighborsAlive> 3)) grid[i][j].alive = false;
            }
        }
    },

    render: function(artClass){
        let { canvas, context, resolution, fadingEffect, rows, cols, grid } = artClass.gameOfLife.data;

        // Black background
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        let colorMapping = ['#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999', '#aaa', '#bbb', '#ccc', '#ddd', '#eee'];

        // Draw the grid
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){

                context.fillStyle = '#111';

                if (grid[i][j].alive) { 
                    context.fillStyle = '#fff'; 
                }else if (fadingEffect){
                    for (let k = grid[i][j].history.length-1; k >= 0; k--){
                        if (grid[i][j].history[k]){
                            context.fillStyle = colorMapping[k];
                            break;
                        }
                    }
                }

                context.fillRect(i*resolution, j*resolution, resolution-1, resolution-1);
            }
        }
    },

    Cell: function(alive){
        this.alive = alive;
        this.history = [false];
    },
}

module.exports = gameOfLife;