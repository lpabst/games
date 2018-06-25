var barnsleyFern = {
    init: function(artClass){

        var canvas = document.getElementById('fernCanvas');
        var context = canvas.getContext('2d');
        var animationFrame = 0;

        artClass.fern = {};
        artClass.fern.data = { canvas, context, animationFrame };

        barnsleyFern.run(artClass);
    },

    run: function(artClass){
        function loop() {
            barnsleyFern.update(artClass);
            barnsleyFern.render(artClass);
            window.requestAnimationFrame(loop);
        }

        loop();
    },

    update: function(artClass){
       
    },

    render: function(artClass){
        // let { canvas, context, resolution, fadingEffect, rows, cols, grid } = artClass.barnsleyFern.data;

        // // Black background
        // context.fillStyle = '#000000';
        // context.fillRect(0, 0, canvas.width, canvas.height);

        // let colorMapping = ['#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999', '#aaa', '#bbb', '#ccc', '#ddd', '#eee'];

        // // Draw the grid
        // for (let i = 0; i < rows; i++){
        //     for (let j = 0; j < cols; j++){

        //         context.fillStyle = '#111';

        //         if (grid[i][j].alive) { 
        //             context.fillStyle = '#fff'; 
        //         }else if (fadingEffect){
        //             for (let k = grid[i][j].history.length-1; k >= 0; k--){
        //                 if (grid[i][j].history[k]){
        //                     context.fillStyle = colorMapping[k];
        //                     break;
        //                 }
        //             }
        //         }

        //         context.fillRect(i*resolution, j*resolution, resolution-1, resolution-1);
        //     }
        // }
    },
}

module.exports = barnsleyFern;